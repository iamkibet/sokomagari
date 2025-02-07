<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Car extends Model
{
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
        'urban_fuel_efficiency'
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
    ];



    protected $appends = ['thumbnail', 'image_urls'];

    public function getThumbnailAttribute()
    {
        if (is_array($this->images) && count($this->images) > 0) {
            $cleanPath = ltrim($this->images[0], '/');
            return asset("storage/{$cleanPath}");
        }
        return asset('https://github.com/iamkibet/assets/blob/main/thumbnail.png?raw=true');
    }

    public function getImageUrlsAttribute()
    {
        return collect($this->images)->map(function ($image) {
            $cleanPath = ltrim($image, '/');
            return asset("storage/{$cleanPath}");
        })->toArray();
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
