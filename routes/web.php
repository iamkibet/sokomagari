<?php

use App\Http\Controllers\{
    DashboardController,
    HomeController,
    ProfileController,
    VehicleController,
    NewsController,
    PublicController
};
use Illuminate\Support\Facades\Route;

// Public Routes
Route::name('public.')->group(function () {
    // Home
    Route::get('/', [PublicController::class, 'home'])->name('home');

    // Static Pages
    Route::get('/about', [PublicController::class, 'about'])->name('about');
    Route::get('/contact', [PublicController::class, 'contact'])->name('contact');
    Route::get('/faq', [PublicController::class, 'faq'])->name('faq');
    Route::inertia('/terms', 'Public/Terms')->name('terms.show');
    Route::inertia('/privacy-policy', 'Public/Privacy')->name('policy.show');

    // Vehicle Catalog
    Route::prefix('vehicles')->name('vehicles.')->group(function () {
        Route::get('/', [VehicleController::class, 'index'])->name('index');
        Route::get('/search', [VehicleController::class, 'search'])->name('search');
        Route::get('/{car}', [VehicleController::class, 'show'])
            ->name('show')
            ->where('car', '[0-9]+|[a-z0-9-]+');
    });

    // News
    Route::prefix('news')->name('news.')->group(function () {
        Route::get('/', [NewsController::class, 'index'])->name('index');
        Route::get('/{news:slug}', [NewsController::class, 'show'])->name('show');
    });
});

// Authentication Routes
require __DIR__ . '/auth.php';

// Authenticated User Routes
Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        // Dashboard Overview
        Route::get('/', [DashboardController::class, 'index'])->name('index');

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

        // News Management
        Route::prefix('news')->name('news.')->group(function () {
            Route::get('/create', [NewsController::class, 'create'])->name('create');
            Route::post('/', [NewsController::class, 'store'])->name('store');
            Route::get('/{news}/edit', [NewsController::class, 'edit'])->name('edit');
            Route::put('/{news}', [NewsController::class, 'update'])->name('update');
            Route::delete('/{news}', [NewsController::class, 'destroy'])->name('destroy');
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

// Development Routes
if (app()->environment('local')) {
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
}
