<?php

namespace App\Http\Middleware;

use App\Models\Car;
use App\Models\CarView;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response;

class TrackVehicleViews
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Check if this is a vehicle show route
        if ($request->route()->getName() === 'public.vehicles.show') {
            $vehicle = $request->route('car');

            if ($vehicle instanceof Car) {
                // Record a view
                CarView::create([
                    'car_id' => $vehicle->getKey(),
                    'user_id' => $request->user()?->getKey(),
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                    'viewed_at' => now(),
                ]);

                // Increment the views count on the car model if the column exists
                if (Schema::hasColumn('cars', 'views')) {
                    $vehicle->increment('views');
                }
            }
        }

        return $response;
    }
}
