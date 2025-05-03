<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update the images column in the cars table
        DB::table('cars')->where('images', 'like', '%images/car%')->get()->each(function ($car) {
            $images = json_decode($car->images, true);
            $updatedImages = array_map(function ($path) {
                // Remove 'images/' prefix if it exists
                return str_replace('images/', '', $path);
            }, $images);

            DB::table('cars')
                ->where('id', $car->id)
                ->update(['images' => json_encode($updatedImages)]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert the changes if needed
        DB::table('cars')->where('images', 'not like', '%images/car%')->get()->each(function ($car) {
            $images = json_decode($car->images, true);
            $updatedImages = array_map(function ($path) {
                // Add 'images/' prefix if it doesn't exist
                return strpos($path, 'images/') === 0 ? $path : 'images/' . $path;
            }, $images);

            DB::table('cars')
                ->where('id', $car->id)
                ->update(['images' => json_encode($updatedImages)]);
        });
    }
};
