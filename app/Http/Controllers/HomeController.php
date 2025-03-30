<?php

namespace App\Http\Controllers;


use App\Services\CarService;
use Illuminate\Routing\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(CarService $carService)
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'cars' => $carService->allCars(),
        ]);
    }
}
