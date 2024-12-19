<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cars = Car::all();
        return response()->json($cars);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        return response()->json($car, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $car = Car::findOrFail($id);
        return response()->json($car);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
        return response()->json($car);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::findOrFail($id);
        $car->delete();
        return response()->json(['message' => 'Car deleted successfully']);
    }
}
