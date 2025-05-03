<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create test user if they don't exist
        $testEmail = env('TEST_USER_EMAIL', 'test@example.com');
        if (!User::where('email', $testEmail)->exists()) {
            User::create([
                'name' => env('TEST_USER_NAME', 'Test User'),
                'email' => $testEmail,
                'password' => Hash::make(env('TEST_USER_PASSWORD', 'password')),
            ]);
        }
    }
}
