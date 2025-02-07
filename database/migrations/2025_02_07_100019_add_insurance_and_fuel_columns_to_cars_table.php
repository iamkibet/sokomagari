<?php

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
        Schema::table('cars', function (Blueprint $table) {

            // Specifications (JSON columns for flexibility)
            $table->json('comfort_features')->nullable();
            $table->json('safety_features')->nullable();

            // Running Costs
            $table->decimal('annual_insurance_cost', 10, 2)->nullable()->after('safety_features');
            $table->decimal('highway_fuel_efficiency', 5, 1)->comment('km/l')->nullable()->after('annual_insurance_cost');
            $table->decimal('urban_fuel_efficiency', 5, 1)->comment('km/l')->nullable()->after('highway_fuel_efficiency');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn([
                'comfort_features',
                'safety_features',
                'annual_insurance_cost',
                'highway_fuel_efficiency',
                'urban_fuel_efficiency'
            ]);
        });
    }
};
