<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
        'cars'        => (new \App\Services\CarService)->allCars(),
    ]);
})->name('home');

Route::get('/about', fn() => Inertia::render('About'))->name('about');
Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact');
Route::get('/faq', fn() => Inertia::render('FAQ'))->name('faq');

// Vehicles Routes
Route::prefix('vehicles')->name('vehicles.')->group(function () {
    Route::get('/', [VehicleController::class, 'index'])->name('index');
    Route::get('/search', [VehicleController::class, 'search'])->name('search');
    Route::get('/{slug}', [VehicleController::class, 'show'])->name('show');

    Route::middleware(['auth'])->group(function () {
        Route::get('/create', [VehicleController::class, 'create'])->name('create');
        Route::post('/', [VehicleController::class, 'store'])->name('store');
        Route::get('/{slug}/edit', [VehicleController::class, 'edit'])->name('edit');
        Route::put('/{slug}', [VehicleController::class, 'update'])->name('update');
        Route::delete('/{slug}', [VehicleController::class, 'destroy'])->name('destroy');
    });
});

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // Profile Routes
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });
});

// Category-based Vehicles Index Route
Route::get('/{category}', [VehicleController::class, 'index'])
    ->where('category', 'cars|trucks|bikes')
    ->name('cars.index');

// Include Authentication Routes
require __DIR__ . '/auth.php';
