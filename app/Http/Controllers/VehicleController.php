<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $cars = Car::where('availability', 'Available')
            ->orderBy('created_at', 'desc')
            ->get(); // Get all available cars

        $perPage = 100;
        $page = $request->input('page', 1);
        $totalCars = $cars->count();
        $totalPages = ceil($totalCars / $perPage);

        // Manually paginate the collection
        $paginatedCars = $cars->forPage($page, $perPage);

        return Inertia::render('Vehicles/Index', [
            'cars' => [
                'data' => $paginatedCars,
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $totalCars,
                'last_page' => $totalPages,
            ],
        ]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
