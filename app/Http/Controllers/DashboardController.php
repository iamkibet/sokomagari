<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use App\Http\Resources\VehicleMetricResource;
use App\Http\Resources\VehicleListingResource;

class DashboardController extends Controller
{
    // Cache lifetime in minutes
    const CACHE_TTL = 15;

    // Pagination items per page
    const ITEMS_PER_PAGE = 25;

    /**
     * Display main dashboard with aggregated metrics
     */
    public function index(Request $request)
    {

     
        /** @var User $user */
        $user = $request->user();

        // Base query for all vehicle metrics
        $baseQuery = $user->cars()->getQuery();

        return Inertia::render('Dashboard/Index', [

            'recentListings' => VehicleListingResource::collection(
                $user->cars()
                    ->with(['latestView'])
                    ->latest()
                    ->take(8)
                    ->get()
            ),
            'financialMetrics' => $this->getFinancialMetrics($baseQuery),

        ]);
    }

    /**
     * Get paginated vehicle listings with filters
     */
    public function vehicleIndex(Request $request)
    {
        /** @var User $user */
        $user = $request->user();

        $vehicles = $user->cars()
            ->with(['thumbnail'])
            ->filter($request->only([
                'make',
                'model',
                'year',
                'price_min',
                'price_max',
                'status'
            ]))
            ->latest()
            ->paginate(self::ITEMS_PER_PAGE)
            ->withQueryString();

        return Inertia::render('Dashboard/Vehicles/Index', [
            'listings' => VehicleListingResource::collection($vehicles),
            'filters' => $request->all(),
        ]);
    }

    /**
     * Get detailed vehicle analytics
     */

    protected function getVehiclePerformance(Car $vehicle): array
    {
        return [
            'days_on_market' => $vehicle->created_at->diffInDays(now()),
            'price_changes' => $vehicle->priceHistory()->count(),


        ];
    }





    /**
     * Get financial performance metrics
     */
    protected function getFinancialMetrics($query): array
    {
        return [
            'total_value' => $query->sum('price'),
            'avg_days_to_sell' => $query->whereNotNull('sold_at')
                ->selectRaw('avg(datediff(sold_at, created_at)) as days')
                ->value('days'),
            'price_distribution' => $query->selectRaw(
                'FLOOR(price/1000)*1000 as price_range, COUNT(*) as count'
            )->groupBy('price_range')->get(),
        ];
    }

    /**
     * Get recent vehicle listings with eager loading
     */
    protected function getRecentVehicles(User $user)
    {
        return $user->cars()
            ->with(['thumbnail', 'latestView'])
            ->latest()
            ->take(10)
            ->get();
    }

    /**
     * Calculate vehicle engagement metrics
     */
    protected function calculateEngagement(Car $vehicle): array
    {
        return [
            'ctr' => $vehicle->views > 0
                ? ($vehicle->contact_requests / $vehicle->views) * 100
                : 0,
            'conversion' => $vehicle->views > 0
                ? ($vehicle->sold_at ? 1 / $vehicle->views * 100 : 0)
                : 0,
        ];
    }
}
