<?php

namespace App\Http\Controllers;

use App\Models\Car;
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
            'make' => 'string|nullable',
            'model' => 'string|nullable',
            'year' => 'integer|nullable',
            'price_min' => 'numeric|nullable|min:0',
            'price_max' => 'numeric|nullable|min:0',
            'mileage_max' => 'numeric|nullable|min:0',
            'condition' => 'string|nullable|in:new,used',
            'location' => 'string|nullable',
            'search' => 'string|nullable',
        ]);

        $query = Car::query();

        // Apply filters dynamically
        $filters = [
            'make' => $validated['make'] ?? null,
            'model' => $validated['model'] ?? null,
            'year' => $validated['year'] ?? null,
            'condition' => $validated['condition'] ?? null,
            'location' => $validated['location'] ?? null,
        ];

        foreach ($filters as $key => $value) {
            if ($value) {
                $query->where($key, $value);
            }
        }

        // Apply search query
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('make', 'LIKE', '%' . $request->input('search') . '%')
                    ->orWhere('model', 'LIKE', '%' . $request->input('search') . '%');
            });
        }

        // Apply range filters
        if ($request->has(['price_min', 'price_max'])) {
            $query->whereBetween('price', [$request->input('price_min'), $request->input('price_max')]);
        }

        if ($request->has('price_min') && !$request->has('price_max')) {
            $query->where('price', '>=', $request->input('price_min'));
        }

        if ($request->has('price_max') && !$request->has('price_min')) {
            $query->where('price', '<=', $request->input('price_max'));
        }

        if ($request->has('mileage_max')) {
            $query->where('mileage', '<=', $request->input('mileage_max'));
        }

        // Get paginated results
        $cars = $query->orderBy('created_at', 'desc')->paginate(5);

        //get all vehicles
        $allcars = Car::all();

        // Return Inertia response
        return Inertia::render('Vehicles/Index', [
            'vehicles' => $cars,
            'filters' => $validated,
            'allcars' => $allcars
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
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
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
                //$image->storeAs('public/vehicles', $imageName);
                $images[] = Storage::disk('public')->putFileAs('vehicles/', $image, $imageName);
                //'storage/vehicles/' . $imageName;
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
        $car = Car::where('slug', $id)
            ->firstOrFail();
        $car->image_urls = collect($car->images)->map(function ($image) {
            return asset($image);
        });
        return Inertia::render('Vehicles/Show', ['vehicle' => $car]);
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
