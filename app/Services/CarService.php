<?php

namespace App\Services;

use App\Http\Resources\CarResource;
use App\Http\Resources\ShowCarResource;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

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
        // With the model's $appends in place, thumbnail and image_urls are included.
        return \App\Http\Resources\CarResource::collection($allcars);
    }

    public function showcar($slug)
    {
        $cacheKey = "showcar_{$slug}";


        $car = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($slug) {
            return Car::where('slug', $slug)->firstOrFail();
        });


        return new ShowCarResource($car);
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
            ->limit(20)
            ->get()
            ->map(function ($car) {

                return $car;
            });


        return \App\Http\Resources\CarResource::collection($similarCars);
    }

    public function search($query, $limit = 5)
    {
        $results = Car::where('make', 'like', "%{$query}%")
            ->orWhere('model', 'like', "%{$query}%")
            ->limit($limit)
            ->get();

        return \App\Http\Resources\CarResource::collection($results);
    }
}
