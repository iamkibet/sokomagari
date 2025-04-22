<?php

namespace App\Services;

use App\Http\Resources\CarResource;
use App\Http\Resources\ShowCarResource;
use App\Models\Car;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CarService
{
    protected const CACHE_TTL = 30;
    protected const SIMILAR_LIMIT = 4;
    protected const SEARCH_LIMIT = 5;
    protected const SLIDER_LIMIT = 15;

    /**
     * Get featured cars for the slider with optional type filter
     */
    public function getFeaturedCars(?string $type = null): Collection
    {
        $cacheKey = 'featured_cars_slider_' . ($type ?? 'all');

        return Car::when($type, fn($q) => $q->where('type', $type))
            ->latest()
            ->limit(self::SLIDER_LIMIT)
            ->get();
    }


    // Fuel Type

    public function getFuelTypeCars(?string $fuelType = null): Collection
    {
        $validFuelTypes = ['petrol', 'diesel', 'electric', 'hybrid'];

        return Cache::remember(
            "fuel_type_cars_{$fuelType}",
            now()->addMinutes(self::CACHE_TTL),
            function () use ($fuelType, $validFuelTypes) {
                $query = Car::query()
                    
                    ->whereNotNull('fuel_type');

                if ($fuelType && in_array($fuelType, $validFuelTypes)) {
                    $query->where('fuel_type', $fuelType);
                }

                return $query->latest()
                    ->limit(self::SLIDER_LIMIT)
                    ->get();
            }
        );
    }

    

    /**
     * Get affordable cars (under $20,000)
     */
    public function getAffordableCars(): Collection
    {


        return Car::where('price', '<', 3000000)

            ->latest()
            ->limit(self::SLIDER_LIMIT)
            ->get();
    }

    /**
     * Get latest cars (from current year)
     */
    public function getLatestCars(): Collection
    {
        return Car::where('year', '>=', 2016)
            ->latest()
            ->limit(self::SLIDER_LIMIT)
            ->get();
    }

    /**
     * Get paginated list of all cars
     */
    public function allCars(array $filters = [], int $perPage = 12): Paginator
    {
        $query = Car::query();

        // Apply filters
        if (!empty($filters['make'])) {
            $query->where('make', $filters['make']);
        }
        if (!empty($filters['model'])) {
            $query->where('model', $filters['model']);
        }
        if (!empty($filters['year_min'])) {
            $query->where('year', '>=', (int)$filters['year_min']);
        }
        if (!empty($filters['year_max'])) {
            $query->where('year', '<=', (int)$filters['year_max']);
        }
        if (!empty($filters['price_min'])) {
            $query->where('price', '>=', (float)$filters['price_min']);
        }
        if (!empty($filters['price_max'])) {
            $query->where('price', '<=', (float)$filters['price_max']);
        }
        if (!empty($filters['mileage_max'])) {
            $query->where('mileage', '<=', (float)$filters['mileage_max']);
        }
        if (!empty($filters['condition'])) {
            $query->where('condition', $filters['condition']);
        }
        if (!empty($filters['location'])) {
            $query->where('location', 'like', "%{$filters['location']}%");
        }
        if (!empty($filters['search'])) {
            $searchTerm = trim($filters['search']);
            $query->where(function ($q) use ($searchTerm) {
                $q->where('make', 'like', "%{$searchTerm}%")
                    ->orWhere('model', 'like', "%{$searchTerm}%")
                    ->orWhere('description', 'like', "%{$searchTerm}%");
            });
        }

        $results = $query->latest()->paginate($perPage);

        return $results;
    }

    /**
     * Get vehicle details with caching
     */
    public function getVehicleDetails(Car $vehicle): ShowCarResource
    {
        $cacheKey = "vehicle_{$vehicle->slug}";

        return Cache::remember(
            $cacheKey,
            now()->addMinutes(self::CACHE_TTL),
            fn() => new ShowCarResource($vehicle->loadMissing('features'))
        );
    }

    /**
     * Get similar vehicles
     */
    public function getSimilarVehicles(Car $vehicle, int $limit = self::SIMILAR_LIMIT): Collection
    {
        return Car::whereNot('id', $vehicle->id)
            ->where(function ($query) use ($vehicle) {
                $query->where('make', $vehicle->make)
                    ->orWhere('model', $vehicle->model);
            })
            // ->with(['thumbnail'])
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Search vehicles
     */
    public function searchVehicles(string $query, int $limit = self::SEARCH_LIMIT): Collection
    {
        return Car::whereFullText(['make', 'model'], $query)
            // ->with(['thumbnail'])
            ->limit($limit)
            ->get();
    }

    /**
     * Get API resource collection for cars
     */
    public function carResourceCollection(Paginator|Collection $cars): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
        return CarResource::collection($cars);
    }

    public function getContextualSimilarVehicles(
        array $searchFilters = [],
        int $limit = 4
    ): Collection {
        $query = Car::query()
            // ->with(['thumbnail'])
            ->inRandomOrder()
            ->limit($limit);

        if (!empty($searchFilters['make'])) {
            $query->where('make', $searchFilters['make']);
        }

        if (!empty($searchFilters['model'])) {
            $query->where('model', $searchFilters['model']);
        }

        return $query->get();
    }
}
