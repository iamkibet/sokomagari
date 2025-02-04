<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Models\Car;
use App\Services\CarService;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $cars = (new CarService)->allCars();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'cars' => $cars,

    ]);
})->name('home');



Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');



Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');

Route::resource('vehicles', VehicleController::class, ['names' => ['index' => 'vehicles.index']]);
Route::get('/vehicles/search', [VehicleController::class, 'search'])->name('vehicles.search');
Route::get('/vehicles/{slug}', [VehicleController::class, 'show'])->name('vehicles.show');
Route::middleware(['auth'])->group(function () {
    Route::get('/vehicles/create', [VehicleController::class, 'create'])->name('vehicles.create');
    Route::post('/vehicles', [VehicleController::class, 'store'])->name('vehicles.store');
    Route::get('/vehicles/{slug}/edit', [VehicleController::class, 'edit'])->name('vehicles.edit');
    Route::put('/vehicles/{slug}', [VehicleController::class, 'update'])->name('vehicles.update');
    Route::delete('/vehicles/{slug}', [VehicleController::class, 'destroy'])->name('vehicles.destroy');
});





Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



// Dynamic Route with Constraint
Route::get('/{category}', [VehicleController::class, 'index'])
    ->where('category', 'cars|trucks|bikes') // Matches only specific categories
    ->name('cars.index');
require __DIR__ . '/auth.php';
