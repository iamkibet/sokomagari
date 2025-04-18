<?php

use App\Http\Controllers\{
    DashboardController,
    HomeController,
    ProfileController,
    VehicleController
};
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

// Public non-vehicle routes
Route::get('/', [HomeController::class, 'index'])
    ->name('home');

// Terms and Privacy Policy routes
Route::inertia('/terms', 'Terms')->name('terms.show');
Route::inertia('/privacy-policy', 'Privacy')->name('policy.show');

// Authentication Routes
require __DIR__ . '/auth.php';

// Authenticated & Verified User Routes
Route::middleware(['auth'])->group(function () {
    // Dashboard Group
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        // Dashboard Overview
        Route::get('/', [DashboardController::class, 'index'])
            ->name('index');

        // Vehicle Management
        Route::prefix('vehicles')->name('vehicles.')->group(function () {
            Route::get('/', [VehicleController::class, 'index'])
                ->name('index')
                ->middleware('can:viewAny,App\Models\Car');

            Route::get('/create', [VehicleController::class, 'create'])
                ->name('create');

            Route::post('/', [VehicleController::class, 'store'])
                ->name('store')
                ->middleware('can:create,App\Models\Car');

            Route::get('/{vehicle:slug}', [VehicleController::class, 'show'])
                ->name('show');

            Route::get('/{vehicle:slug}/edit', [VehicleController::class, 'edit'])
                ->name('edit')
                ->middleware('can:update,vehicle');

            Route::get('/{vehicle:slug}/analytics', [VehicleController::class, 'analytics'])
                ->name('analytics')
                ->middleware('can:update,vehicle');

            Route::put('/{vehicle:slug}', [VehicleController::class, 'update'])
                ->name('update')
                ->middleware('can:update,vehicle');

            Route::delete('/{vehicle:slug}', [VehicleController::class, 'destroy'])
                ->name('destroy')
                ->middleware('can:delete,vehicle');
        });

        // User Profile
        Route::resource('profile', ProfileController::class, [
            'only' => ['edit', 'update', 'destroy'],
            'names' => [
                'edit' => 'profile.edit',
                'update' => 'profile.update',
                'destroy' => 'profile.destroy'
            ]
        ]);
    });
});

// Public Routes
Route::name('public.')->group(function () {
    // Static Pages
    Route::inertia('/about', 'Public/About')->name('about');
    Route::inertia('/contact', 'Public/Contact')->name('contact');
    Route::inertia('/faq', 'Public/FAQ')->name('faq');

    // Vehicle Catalog
    Route::prefix('vehicles')->name('vehicles.')->group(function () {
        Route::get('/', [VehicleController::class, 'index'])
            ->name('index');

        Route::get('/{car}', [VehicleController::class, 'show'])
            ->name('show')
            ->where('car', '[0-9]+|[a-z0-9-]+');
    });
});

// Test route for image access
Route::get('/test-image', function () {
    $path = public_path('images/car1/carpic1.jpg');
    if (!file_exists($path)) {
        return response()->json([
            'error' => 'File not found',
            'path' => $path,
            'realpath' => realpath($path),
            'public_path' => public_path(),
            'base_path' => base_path(),
        ], 404);
    }

    return response()->file($path);
});
