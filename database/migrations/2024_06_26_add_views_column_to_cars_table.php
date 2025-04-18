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
            if (!Schema::hasColumn('cars', 'views')) {
                $table->unsignedInteger('views')->default(0)->after('owner_phone');
            }

            if (!Schema::hasColumn('cars', 'contact_requests')) {
                $table->unsignedInteger('contact_requests')->default(0)->after('views');
            }

            if (!Schema::hasColumn('cars', 'status')) {
                $table->string('status')->default('available')->after('availability');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn(['views', 'contact_requests', 'status']);
        });
    }
};
