<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Models\Car;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $cars = Car::where('availability', 'Available')
        ->orderBy('created_at', 'desc')
        ->limit(10)
        ->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'cars' => $cars,

    ]);
})->name('home');


Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/{category?}', [VehicleController::class, 'index'])->name('cars.index');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');

Route::resource('vehicles', VehicleController::class, ['names' => ['index' => 'vehicles.index',]]);


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
