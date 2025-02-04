<?php

namespace App\Services;

use App\Http\Resources\CarResource;
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
        $cacheKey = "allcars_page_" . request()->get('page', 1);
        $allcars = Cache::remember($cacheKey, now()->addMinutes(5), function () use ($perPage) {
            $cars = Car::latest()->paginate($perPage);

            return $cars;
        });
        return CarResource::collection($allcars);
    }

    public function similarcars($slug)
    {
        $cacheKey = "similarcars_" . $slug;
        $similarCars = Cache::remember($cacheKey, now()->addMinutes(10), function () use ($slug) {
            $vehicle = Car::where('slug', $slug)->firstOrFail();
            $cars = Car::where('id', '!=', $vehicle->id)
                ->where(function ($query) use ($vehicle) {
                    $query->where('make', $vehicle->make)
                        ->orWhere('model', $vehicle->model);
                })
                ->orderBy('created_at', 'desc')
                ->limit(20)
                ->get();

            return CarResource::collection($cars);
        });

        return $similarCars;
    }

    public function search($query, $limit = 5)
    {
        $results = Car::where('make', 'like', "%{$query}%")
            ->orWhere('model', 'like', "%{$query}%")
            ->limit($limit)
            ->get();
            dd($results);

        return CarResource::collection($results);
    }
}
