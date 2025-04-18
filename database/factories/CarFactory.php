<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Car>
 */
class CarFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Nissan'];
        $models = ['Camry', 'Civic', 'F-150', 'Silverado', '3 Series', 'C-Class', 'A4', 'Altima'];
        $conditions = ['excellent', 'good', 'fair', 'poor'];

        return [
            'user_id' => User::factory(),
            'make' => $this->faker->randomElement($makes),
            'model' => $this->faker->randomElement($models),
            'year' => $this->faker->numberBetween(2010, 2023),
            'price' => $this->faker->numberBetween(10000, 50000) * 1000,
            'mileage' => $this->faker->numberBetween(10000, 100000),
            'condition' => $this->faker->randomElement($conditions),
            'description' => $this->faker->paragraph(),
            'is_featured' => false,
            'status' => 'available',
        ];
    }
}
