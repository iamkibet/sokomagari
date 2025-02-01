<?php

namespace App\Services;

use App\Models\Car;
use Illuminate\Http\Request;

class CarService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
    }

    public function allcars($perPage = 12)
    {
        $allcars = Car::latest()->paginate($perPage);
        $allcars->through(function ($car) {
            $car->thumbnail = $car->thumbnail;
            $car->images = $car->image_urls;
            return $car;
        });
        return $allcars;
    }
}
