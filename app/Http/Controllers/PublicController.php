<?php

namespace App\Http\Controllers;

use App\Services\CarService;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home(CarService $carService)
    {
        return Inertia::render('Public/Welcome', [
            'cars' => $carService->allCars(),
        ]);
    }

    public function about()
    {
        return Inertia::render('Public/About');
    }

    public function contact()
    {
        return Inertia::render('Public/Contact');
    }

    public function faq()
    {
        return Inertia::render('Public/FAQ');
    }
}
