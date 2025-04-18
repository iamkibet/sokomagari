<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CarService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(CarService $carService)
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::getRoutes()->hasNamedRoute('login'),
            'canRegister' => Route::getRoutes()->hasNamedRoute('register'),
            'cars' => $carService->allCars(),
        ]);
    }
}
