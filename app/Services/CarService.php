<?php

namespace App\Services;

use App\Models\Car;
use Illuminate\Http\Request;

class CarService
{
    public $request;
    /**
     * Create a new class instance.
     */
    public function __construct() {}

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

    public function similarcars($slug)
    {
        $vehicle = Car::where('slug', $slug)->firstOrFail();

        $similarCars = Car::where('id', '!=', $vehicle->id)
            ->where(function ($query) use ($vehicle) {
                $query->where('make', $vehicle->make)
                    ->orWhere('model', $vehicle->model);
            })
            ->orderBy('created_at', 'desc')
            ->take(20)
            ->get();
   

        return $similarCars;
       
    }
}
