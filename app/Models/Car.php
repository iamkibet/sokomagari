<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'make',
        'model',
        'year',
        'price',
        'mileage',
        'condition',
        'type',
        'location',
        'availability',
        'drive',
        'slug',
        'engine_size',
        'fuel_type',
        'horse_power',
        'transmission',
        'torque',
        'acceleration',
        'description',
        'images',
        'is_sell_on_behalf',
        'owner_name',
        'owner_email',
        'owner_phone',
        'comfort_features',
        'safety_features',
        'annual_insurance_cost',
        'highway_fuel_efficiency',
        'urban_fuel_efficiency',
        'user_id',
        'is_featured',
        'status'
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'price' => 'decimal:2',
        'mileage' => 'integer',
        'engine_size' => 'integer',
        'horse_power' => 'integer',
        'torque' => 'integer',
        'acceleration' => 'decimal:2',
        'images' => 'array',
        'is_sell_on_behalf' => 'boolean',
        'comfort_features' => 'array',
        'safety_features' => 'array',
        'annual_insurance_cost'   => 'decimal:2',
        'highway_fuel_efficiency' => 'decimal:2',
        'urban_fuel_efficiency'   => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'is_featured' => 'boolean',
    ];

    // Add this to use slugs for route binding
    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $appends = ['thumbnail', 'image_urls'];

    // // Update your accessors to handle empty images
    // public function getThumbnailAttribute()
    // {
    //     $images = $this->getImagesArray();

    //     if (!empty($images)) {
    //         $firstImage = $images[0];

    //         // Check if the path is a storage path or a public path
    //         if (strpos($firstImage, 'public/') === 0) {
    //             // It's a storage path
    //             return Storage::url($firstImage);
    //         } else {
    //             // It's a public path
    //             return asset($firstImage);
    //         }
    //     }
    //     return asset('defaults/vehicle-thumbnail.png');
    // }
    public function getThumbnailAttribute()
    {
        $images = $this->getImagesArray();

        if (!empty($images)) {
            return Storage::url($images[0]);
        }

        return asset('defaults/vehicle-thumbnail.png');
    }

    public function getImageUrlsAttribute()
    {
        $images = $this->getImagesArray();

        return collect($images)->map(
            function ($image) {
                return Storage::url($image);
            }
        )->toArray();
    }

    /**
     * Helper method to ensure images are always an array
     * 
     * @return array
     */
    private function getImagesArray(): array
    {
        $images = $this->images;

        // Handle different types of image data
        if (is_string($images)) {
            // If it's a JSON string, decode it
            $decoded = json_decode($images, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                return $decoded;
            }
            // If it's a single image path as string
            return [$images];
        } elseif (is_array($images)) {
            return $images;
        }

        return [];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($car) {
            $car->slug = static::generateUniqueSlug($car);
        });

        static::updating(function ($car) {
            $car->slug = static::generateUniqueSlug($car);
        });
    }
    /**
     * Generate a unique slug for the car.
     *
     * @param  \App\Models\Car  $car
     * @return string
     */

    public function scopeFilter($query, array $filters)
    {
        return $query
            ->when($filters['make'] ?? false, fn($q, $make) =>
            $q->where('make', 'like', "%$make%"))
            ->when($filters['model'] ?? false, fn($q, $model) =>
            $q->where('model', 'like', "%$model%"))
            ->when($filters['year'] ?? false, fn($q, $year) =>
            $q->where('year', $year))
            ->when($filters['price_min'] ?? false, fn($q, $price) =>
            $q->where('price', '>=', $price))
            ->when($filters['price_max'] ?? false, fn($q, $price) =>
            $q->where('price', '<=', $price))
            ->when($filters['mileage_max'] ?? false, fn($q, $mileage) =>
            $q->where('mileage', '<=', $mileage))
            ->when($filters['condition'] ?? false, fn($q, $condition) =>
            $q->where('condition', $condition))
            ->when($filters['year_min'] ?? false, fn($q, $year) =>
            $q->where('year', '>=', $year))
            ->when($filters['year_max'] ?? false, fn($q, $year) =>
            $q->where('year', '<=', $year))
            ->when($filters['location'] ?? false, fn($q, $location) =>
            $q->where('location', 'like', "%$location%"))
            ->when($filters['search'] ?? false, fn($q, $search) =>
            $q->where(function ($query) use ($search) {
                $query->where('make', 'like', "%$search%")
                    ->orWhere('model', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%");
            }));
    }

    /**
     * Get the user that owns the car.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the views for this car.
     */
    public function views()
    {
        return $this->hasMany(CarView::class);
    }

    /**
     * Get the latest view for this car.
     */
    public function latestView()
    {
        return $this->hasOne(CarView::class)->latest('viewed_at');
    }

    protected static function generateUniqueSlug($car)
    {
        $baseSlug = Str::slug($car->make . '-' . $car->model . '-' . $car->year);
        $slug = $baseSlug;
        $counter = 1;

        // When updating, exclude the current record from the check
        while (static::where('slug', $slug)
            ->when($car->id, function ($query, $id) use ($car) {
                return $query->where('id', '!=', $car->id);
            })
            ->exists()
        ) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}
