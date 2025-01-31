<?php

use App\Models\CarCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('make');                  // Car manufacturer
            $table->string('model');                 // Car model
            $table->integer('year');   // Year of manufacture    
            $table->string('condition');  // required condition        
            $table->decimal('price', 10, 2);         // Price of the car
            $table->integer('mileage');              // Mileage in kilometers
            $table->string('slug')->unique();        // URL slug
            $table->string('category')->nullable();         // suv, hatchback, sedan, luxury
            $table->string('location')->default('Nairobi, Kenya'); // Current location
            $table->string('availability')->default('Available');  // Available or Sold
            $table->string('drive')->nullable();     // 4WD or 2WD
            $table->integer('engine_size')->nullable(); // Engine size in CC
            $table->string('fuel_type')->nullable(); // Petrol or Diesel
            $table->integer('horse_power')->nullable(); // Horsepower
            $table->string('transmission')->nullable(); // Automatic or Manual
            $table->integer('torque')->nullable();   // Torque in Nm
            $table->decimal('acceleration', 4, 2)->nullable(); // Acceleration (0-100 kph) in seconds
            $table->text('description')->nullable(); // Additional description
            $table->json('images')->nullable();      // Array of image URLs
            $table->boolean('is_sell_on_behalf')->nullable()->default(false); // True if the car is a sell-on-behalf listing
            $table->string('owner_name')->nullable(); // Owner name (if sell-on-behalf)
            $table->string('owner_email')->nullable(); // Owner email (if sell-on-behalf)
            $table->string('owner_phone')->nullable(); // Owner phone (if sell-on-behalf)
            $table->timestamps();                   // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
