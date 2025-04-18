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
        // Check if test user exists before creating
        $testEmail = env('TEST_USER_EMAIL', 'test@example.com');
        if (!User::where('email', $testEmail)->exists()) {
            User::create([
                'name' => 'Test User',
                'email' => $testEmail,
                'password' => Hash::make(env('TEST_USER_PASSWORD', 'TEST_PASSWORD')),
            ]);
        }

        // Create additional users if they don't exist
        if (User::count() < 11) { // 1 test user + 10 additional users
            User::factory(10)->create();
        }
    }
}
