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
            $car->slug = Str::slug($car->make . '-' . $car->model . '-' . $car->year);
        });

        static::updating(function ($car) {
            $car->slug = Str::slug($car->make . '-' . $car->model . '-' . $car->year);
        });
    }
}
