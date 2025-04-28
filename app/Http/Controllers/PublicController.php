<?php

namespace App\Http\Controllers;

use App\Services\CarService;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function home(CarService $carService)
    {
        return Inertia::render('Public/Welcome', [
            'cars' => [
                'featured' => $carService->getFeaturedCars(),
                'suv' => $carService->getFeaturedCars('suv'),
                'sedan' => $carService->getFeaturedCars('sedan'),
                'van' => $carService->getFeaturedCars('van'),
                'Hatchback' => $carService->getFeaturedCars('hatchback'),
                'affordable' => $carService->getAffordableCars(),
                'latest' => $carService->getLatestCars(),
                'petrol' => $carService->getFuelTypeCars('petrol'),
                'diesel' => $carService->getFuelTypeCars('diesel'),
                'electric' => $carService->getFuelTypeCars('electric'),

            ],
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
