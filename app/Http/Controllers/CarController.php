<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::paginate(25);
        return Inertia::render('Vehicles/Index', ['cars' => $cars]);
    }

    /**
     * Filtered cars.
     */
    public function filteredCars(Request $request)
    {
        $query = Car::query();

        if ($request->has('make')) {
            $query->where('make', $request->input('make'));
        }

        if ($request->has('model')) {
            $query->where('model', $request->input('model'));
        }

        if ($request->has('year')) {
            $query->where('year', $request->input('year'));
        }

        if ($request->has('price_min')) {
            $query->where('price', '>=', $request->input('price_min'));
        }

        if ($request->has('price_max')) {
            $query->where('price', '<=', $request->input('price_max'));
        }

        if ($request->has('mileage_max')) {
            $query->where('mileage', '<=', $request->input('mileage_max'));
        }

        if ($request->has('condition')) {
            $query->where('condition', $request->input('condition'));
        }

        if ($request->has('location')) {
            $query->where('location', $request->input('location'));
        }

        $cars = $query->get();
        return Inertia::render('Cars/Filtered', ['cars' => $cars]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Cars/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
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
            'images' => 'array|nullable',
            'is_sell_on_behalf' => 'boolean',
            'owner_name' => 'string|nullable',
            'owner_email' => 'email|nullable',
            'owner_phone' => 'string|nullable',
        ]);

        $car = Car::create($validated);
        return redirect()->route('cars.show', $car->id);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $car = Car::findOrFail($id);
        return Inertia::render('Cars/Show', ['car' => $car]);
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
            'images' => 'array|nullable',
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
