<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVehicleRequest;
use App\Http\Requests\UpdateVehicleRequest;
use App\Http\Resources\CarResource;
use App\Http\Resources\ShowCarResource;
use App\Models\Car;
use App\Services\CarService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;


class VehicleController extends Controller
{


    /**
     * Display a listing of vehicles.
     */
    public function index(Request $request, CarService $carService): Response
    {
        $validated = $request->validate([
            'make' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'year_min' => 'nullable|integer',
            'year_max' => 'nullable|integer',
            'price_min' => 'nullable|numeric|min:0',
            'price_max' => 'nullable|numeric|min:0',
            'mileage_max' => 'nullable|numeric|min:0',
            'condition' => 'nullable|string|in:new,used',
            'location' => 'nullable|string|max:255',
            'search' => 'nullable|string|max:255',
            'page' => 'nullable|integer|min:1',
        ]);

        // Remove empty values from filters
        $filters = array_filter($validated, function ($value) {
            return $value !== null && $value !== '';
        });

        $results = $carService->allCars($filters);

        return Inertia::render('Vehicles/Index', [
            'results' => $results,
            'filters' => $validated,
        ]);
    }

    /**
     * Show the form for creating a new vehicle.
     */
    public function create(): Response
    {
        return Inertia::render('Vehicles/Create', []);
    }

    public function store(StoreVehicleRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Add the user_id to the validated data
        $validated['user_id'] = auth()->id();

        // Handle optional array fields
        $validated['comfort_features'] = $request->has('comfort_features') ? $request->input('comfort_features') : [];
        $validated['safety_features'] = $request->has('safety_features') ? $request->input('safety_features') : [];

        // Ensure numeric fields are set to null if empty
        $validated['annual_insurance_cost'] = $request->filled('annual_insurance_cost') ? $request->input('annual_insurance_cost') : null;
        $validated['highway_fuel_efficiency'] = $request->filled('highway_fuel_efficiency') ? $request->input('highway_fuel_efficiency') : null;
        $validated['urban_fuel_efficiency'] = $request->filled('urban_fuel_efficiency') ? $request->input('urban_fuel_efficiency') : null;

        // Handle image uploads
        if ($request->hasFile('images')) {
            $validated['images'] = $this->storeImages($request->file('images'));
        }

        // Create the vehicle record
        $vehicle = Car::create($validated);

        return redirect()->route('dashboard.vehicles.show', $vehicle->slug)
            ->with('success', __('Vehicle created successfully'));
    }


    /**
     * Display the specified vehicle.
     */
    public function show($identifier): Response
    {
        $vehicle = is_numeric($identifier)
            ? Car::findOrFail($identifier)
            : Car::where('slug', $identifier)->firstOrFail();

        return Inertia::render('Vehicles/Show', [
            'vehicle' => new ShowCarResource($vehicle),
            'similarVehicles' => CarResource::collection(
                Car::where('make', $vehicle->make)
                    ->where('id', '!=', $vehicle->id)
                    ->limit(4)
                    ->inRandomOrder()
                    ->get()
            )
        ]);
    }

    /**
     * Show the form for editing the specified vehicle.
     */
    public function edit(Car $vehicle): Response
    {
        return Inertia::render('Vehicles/Edit', [
            'vehicle' => $vehicle->load('owner'),
            'features' => config('vehicles.features')
        ]);
    }

    /**
     * Display the analytics for the specified vehicle.
     */
    public function analytics(Car $vehicle): Response
    {
        // Gather analytics data
        $viewsData = $vehicle->views()
            ->selectRaw('DATE(viewed_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->map(fn($item) => [
                'date' => $item->date,
                'count' => $item->count
            ]);

        return Inertia::render('Dashboard/Vehicles/Analytics', [
            'vehicle' => [
                'id' => $vehicle->id,
                'slug' => $vehicle->slug,
                'make' => $vehicle->make,
                'model' => $vehicle->model,
                'year' => $vehicle->year,
                'views' => $vehicle->views,
                'contact_requests' => $vehicle->contact_requests,
                'created_at' => $vehicle->created_at->format('M j, Y'),
            ],
            'analytics' => [
                'views_by_date' => $viewsData,
                'days_on_market' => $vehicle->created_at->diffInDays(now()),
                'total_views' => $vehicle->views,
                'conversion_rate' => $vehicle->views > 0
                    ? round(($vehicle->contact_requests / $vehicle->views) * 100, 2)
                    : 0,
            ]
        ]);
    }

    /**
     * Update the specified vehicle in storage.
     */
    public function update(UpdateVehicleRequest $request, Car $vehicle): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('images')) {
            $this->deleteImages($vehicle->images);
            $validated['images'] = $this->storeImages($request->file('images'));
        }

        $vehicle->update($validated);

        return redirect()->route('vehicles.show', $vehicle->slug)
            ->with('success', __('Vehicle updated successfully'));
    }

    /**
     * Remove the specified vehicle from storage.
     */
    public function destroy(Car $vehicle): RedirectResponse
    {
        $this->deleteImages($vehicle->images);
        $vehicle->delete();

        return redirect()->route('vehicles.index')
            ->with('success', __('Vehicle deleted successfully'));
    }

    /**
     * Handle image storage
     */
    protected function storeImages(array $images): array
    {
        return collect($images)->map(function ($image) {
            $name = time() . '_' . uniqid() . '.' . $image->extension();
            return Storage::disk('public')->putFileAs('vehicles', $image, $name);
        })->all();
    }

    /**
     * Handle image deletion
     */
    protected function deleteImages(array $images): void
    {
        Storage::disk('public')->delete($images);
    }
}
