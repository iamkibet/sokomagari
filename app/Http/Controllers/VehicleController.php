<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Services\CarService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VehicleController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'make'         => 'string|nullable',
            'model'        => 'string|nullable',
            'year'         => 'integer|nullable',
            'price_min'    => 'numeric|nullable|min:0',
            'price_max'    => 'numeric|nullable|min:0',
            'mileage_max'  => 'numeric|nullable|min:0',
            'condition'    => 'string|nullable|in:new,used',
            'location'     => 'string|nullable',
            'search'       => 'string|nullable',
        ]);

        // Start building the query
        $query = Car::query();

        // Apply simple filters using an array of keys
        foreach (['make', 'model', 'year', 'condition', 'location'] as $filter) {
            if (!empty($validated[$filter])) {
                $query->where($filter, $validated[$filter]);
            }
        }

        // Apply search filter if present
        if (!empty($validated['search'])) {
            $query->where(function ($q) use ($validated) {
                $q->where('make', 'LIKE', '%' . $validated['search'] . '%')
                    ->orWhere('model', 'LIKE', '%' . $validated['search'] . '%');
            });
        }

        // Apply price range filters
        if (!empty($validated['price_min']) && !empty($validated['price_max'])) {
            $query->whereBetween('price', [$validated['price_min'], $validated['price_max']]);
        } elseif (!empty($validated['price_min'])) {
            $query->where('price', '>=', $validated['price_min']);
        } elseif (!empty($validated['price_max'])) {
            $query->where('price', '<=', $validated['price_max']);
        }

        // Apply mileage filter
        if (!empty($validated['mileage_max'])) {
            $query->where('mileage', '<=', $validated['mileage_max']);
        }

        // Set how many records per page you want to show
        $perPage = 12;
        $allcars = $query->latest()->paginate($perPage);

        // Use an API Resource to transform the cars.
        // Assuming you have created a CarResource that returns only the needed fields (like thumbnail and image_urls)
        return Inertia::render('Vehicles/Index', [
            'filters' => $validated,
            'allcars' => \App\Http\Resources\CarResource::collection($allcars),
        ]);
    }






    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Vehicles/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation and creation logic here
        $validated = $request->validate([
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer',
            'price' => 'required|numeric',
            'mileage' => 'required|integer',
            'condition' => 'required|string',
            'location' => 'string',
            'availability' => 'string',
            'drive' => 'string|nullable',
            'engine_size' => 'integer',
            'fuel_type' => 'string|nullable',
            'horse_power' => 'integer|nullable',
            'transmission' => 'string|nullable',
            'torque' => 'integer|nullable',
            'acceleration' => 'numeric|nullable',
            'description' => 'string|nullable',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif',
            'is_sell_on_behalf' => 'nullable|boolean',
            'owner_name' => 'string|nullable',
            'owner_email' => 'email|nullable',
            'owner_phone' => 'string|nullable',
        ]);

        // Handle image uploads
        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {

                $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();

                // Store the file in the 'vehicles' folder on the 'public' disk
                $storedPath = Storage::disk('public')->putFileAs('vehicles', $image, $imageName);

                $images[] = $storedPath;
            }
            $validated['images'] = $images;
        }

        Car::create($validated);
        return redirect()->route('vehicles.index')->with('success', 'Vehicle created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $vehicle = (new CarService)->showcar($id);


        $similarcars = (new CarService)->similarcars($vehicle->slug);

        return Inertia::render('Vehicles/Show', [
            'vehicle' => $vehicle,
            'similarcars' => $similarcars,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $results = (new CarService)->search($query);

        return response()->json($results);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $car = Car::findOrFail($id);
        return Inertia::render('Cars/Edit', ['car' => $car]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $car = Car::findOrFail($id);

        $validated = $request->validate([
            'make' => 'string|max:255|nullable',
            'model' => 'string|max:255|nullable',
            'year' => 'integer|nullable',
            'price' => 'numeric|nullable',
            'mileage' => 'integer|nullable',
            'condition' => 'string|nullable',
            'location' => 'string|nullable',
            'availability' => 'string|nullable',
            'drive' => 'string|nullable',
            'engine_size' => 'integer|nullable',
            'fuel_type' => 'string|nullable',
            'horse_power' => 'integer|nullable',
            'transmission' => 'string|nullable',
            'torque' => 'integer|nullable',
            'acceleration' => 'numeric|nullable',
            'description' => 'string|nullable',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:4048',
            'is_sell_on_behalf' => 'boolean|nullable',
            'owner_name' => 'string|nullable',
            'owner_email' => 'email|nullable',
            'owner_phone' => 'string|nullable',
        ]);

        $car->update($validated);
        return redirect()->route('cars.show', $car->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::findOrFail($id);
        $car->delete();
        return redirect()->route('cars.index');
    }
}
