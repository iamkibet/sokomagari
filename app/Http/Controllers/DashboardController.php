<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\News;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use App\Http\Resources\VehicleMetricResource;
use App\Http\Resources\VehicleListingResource;
use App\Http\Resources\NewsResource;

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

        // Get recent listings
        $recentCars = $user->cars()
            ->latest()
            ->take(8)
            ->get();

        // Get news metrics and recent articles
        $newsMetrics = $this->getNewsMetrics($user);
        $recentNews = $user->news()
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard/Index', [
            'recentListings' => VehicleListingResource::collection($recentCars)->toArray($request),
            'financialMetrics' => $this->getFinancialMetrics($baseQuery),
            'newsMetrics' => $newsMetrics,
            'recentNews' => NewsResource::collection($recentNews)->toArray($request),
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
                ->value('days') ?? 0,
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
                ? (($vehicle->status === 'sold' || $vehicle->sold_at) ? 1 / $vehicle->views * 100 : 0)
                : 0,
        ];
    }

    /**
     * Get news metrics for the dashboard
     */
    protected function getNewsMetrics(User $user): array
    {
        $newsQuery = $user->news();

        return [
            'total_articles' => $newsQuery->count(),
            'published_articles' => $newsQuery->where('is_published', true)->count(),
            'draft_articles' => $newsQuery->where('is_published', false)->count(),
            'total_views' => $newsQuery->sum('views'),
            'avg_views' => $newsQuery->where('is_published', true)->avg('views') ?? 0,
            'top_performing' => $newsQuery->where('is_published', true)
                ->orderByDesc('views')
                ->take(3)
                ->get()
                ->map(fn($article) => [
                    'title' => $article->title,
                    'views' => $article->views,
                    'published_at' => $article->published_at,
                ]),
            'engagement_metrics' => [
                'avg_read_time' => $newsQuery->where('is_published', true)
                    ->get()
                    ->avg(fn($article) => str_word_count($article->content) / 200) ?? 0,
                'total_comments' => $newsQuery->sum('comments_count') ?? 0,
            ],
        ];
    }
}
