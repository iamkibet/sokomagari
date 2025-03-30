<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VehicleController;
use App\Models\Car;
use App\Services\CarService;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index']);

// Public Routes
Route::name('public.')->group(function () {


    // Static Pages
    Route::inertia('/about', 'About')->name('about');
    Route::inertia('/contact', 'Contact')->name('contact');
    Route::inertia('/faq', 'FAQ')->name('faq');

    // Vehicle Catalog
    Route::prefix('vehicles')->name('vehicles.')->group(function () {
        Route::get('/', [VehicleController::class, 'index'])->name('index');
        Route::get('/{car:slug}', [VehicleController::class, 'show'])->name('show');
    });
});


// Authenticated & Verified User Routes
Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    // User Profile
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('destroy');
    });

    // Vehicle Management
    Route::prefix('vehicles')->name('vehicles.')->group(function () {
        Route::get('/create', [VehicleController::class, 'create'])->name('create');
        Route::post('/', [VehicleController::class, 'store'])->name('store');
        Route::get('/{vehicle:slug}/edit', [VehicleController::class, 'edit'])->name('edit');
        Route::put('/{vehicle:slug}', [VehicleController::class, 'update'])->name('update');
        Route::delete('/{vehicle:slug}', [VehicleController::class, 'destroy'])->name('destroy');
    });
});

// Authentication Routes
require __DIR__ . '/auth.php';
