<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;
use Database\Factories\CarFactory;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 50 cars using the factory
        Car::factory()->count(50)->create();

        // Create some featured cars with specific attributes
        $featuredCars = [
            [
                'make' => 'Toyota',
                'model' => 'Land Cruiser',
                'year' => 2023,
                'price' => 7990000,
                'mileage' => 12000,
                'condition' => 'New',
                'location' => 'Nairobi',
                'type' => 'SUV',
                'availability' => 'Available',
                'drive' => '4WD',
                'engine_size' => 2400,
                'fuel_type' => 'Petrol',
                'horse_power' => 148,
                'transmission' => 'Automatic',
                'torque' => 400,
                'acceleration' => 11.00,
                'description' => 'A reliable and luxurious SUV perfect for off-road and city driving.',
                'images' => json_encode([
                    'https://source.unsplash.com/random/800x600/?toyota,landcruiser,1',
                    'https://source.unsplash.com/random/800x600/?toyota,landcruiser,2',
                    'https://source.unsplash.com/random/800x600/?toyota,landcruiser,3',
                    'https://source.unsplash.com/random/800x600/?toyota,landcruiser,4',
                    'https://source.unsplash.com/random/800x600/?toyota,landcruiser,5'
                ]),
                'is_sell_on_behalf' => false,
            ],
            [
                'make' => 'Mercedes-Benz',
                'model' => 'E-Class',
                'year' => 2022,
                'price' => 9500000,
                'mileage' => 15000,
                'condition' => 'New',
                'location' => 'Nairobi',
                'type' => 'Sedan',
                'availability' => 'Available',
                'drive' => 'RWD',
                'engine_size' => 3000,
                'fuel_type' => 'Diesel',
                'horse_power' => 255,
                'transmission' => 'Automatic',
                'torque' => 620,
                'acceleration' => 6.40,
                'description' => 'A luxury sedan offering unmatched comfort and performance.',
                'images' => json_encode([
                    'https://source.unsplash.com/random/800x600/?mercedes,eclass,1',
                    'https://source.unsplash.com/random/800x600/?mercedes,eclass,2',
                    'https://source.unsplash.com/random/800x600/?mercedes,eclass,3',
                    'https://source.unsplash.com/random/800x600/?mercedes,eclass,4',
                    'https://source.unsplash.com/random/800x600/?mercedes,eclass,5'
                ]),
                'is_sell_on_behalf' => false,
            ],
        ];

        foreach ($featuredCars as $car) {
            Car::create($car);
        }
    }
}
