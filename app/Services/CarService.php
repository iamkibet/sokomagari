<?php

namespace App\Services;

use App\Http\Resources\CarResource;
use App\Http\Resources\ShowCarResource;
use App\Models\Car;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Cache;

class CarService
{
    protected const CACHE_TTL = 30;
    protected const SIMILAR_LIMIT = 4;
    protected const SEARCH_LIMIT = 5;




    /**
     * Get paginated list of all cars
     */
    public function allCars(array $filters = [], int $perPage = 12): Paginator
    {
        $query = Car::query();

        // Debug the incoming filters
        \Log::info('CarService Filters:', $filters);

        // Apply filters
        if (!empty($filters['make'])) {
            $query->where('make', 'like', "%{$filters['make']}%");
        }
        if (!empty($filters['model'])) {
            $query->where('model', 'like', "%{$filters['model']}%");
        }
        if (!empty($filters['year_min'])) {
            $query->where('year', '>=', $filters['year_min']);
        }
        if (!empty($filters['year_max'])) {
            $query->where('year', '<=', $filters['year_max']);
        }
        if (!empty($filters['price_min'])) {
            $query->where('price', '>=', $filters['price_min']);
        }
        if (!empty($filters['price_max'])) {
            $query->where('price', '<=', $filters['price_max']);
        }
        if (!empty($filters['mileage_max'])) {
            $query->where('mileage', '<=', $filters['mileage_max']);
        }
        if (!empty($filters['condition'])) {
            $query->where('condition', $filters['condition']);
        }
        if (!empty($filters['location'])) {
            $query->where('location', 'like', "%{$filters['location']}%");
        }
        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('make', 'like', "%{$filters['search']}%")
                    ->orWhere('model', 'like', "%{$filters['search']}%")
                    ->orWhere('description', 'like', "%{$filters['search']}%");
            });
        }

        $results = $query->latest()->paginate($perPage);

        // Debug the SQL query and results
        \Log::info('CarService Query:', [
            'sql' => $query->toSql(),
            'bindings' => $query->getBindings(),
            'total' => $results->total(),
            'count' => $results->count()
        ]);

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
