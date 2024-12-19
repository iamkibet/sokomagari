<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $cars = [
            [
                'make' => 'Toyota',
                'model' => 'Land Cruiser',
                'year' => 2023,
                'price' => 7990000,
                'mileage' => 12000,
                'condition' => 'New',
                'location' => 'Nairobi, Kenya',
                'availability' => 'Available',
                'drive' => '4WD',
                'engine_size' => 2400,
                'fuel_type' => 'Petrol',
                'horse_power' => 148,
                'transmission' => 'Automatic',
                'torque' => 400,
                'acceleration' => 11.00,
                'description' => 'A reliable and luxurious SUV perfect for off-road and city driving.',
                'images' => ['land_cruiser_1.jpg', 'land_cruiser_2.jpg'],
                'is_sell_on_behalf' => false,
                'owner_name' => null,
                'owner_email' => null,
                'owner_phone' => null,
            ],
            [
                'make' => 'Honda',
                'model' => 'Civic',
                'year' => 2021,
                'price' => 2500000,
                'mileage' => 45000,
                'condition' => 'Used',
                'location' => 'Mombasa, Kenya',
                'availability' => 'Available',
                'drive' => 'FWD',
                'engine_size' => 1800,
                'fuel_type' => 'Petrol',
                'horse_power' => 140,
                'transmission' => 'Automatic',
                'torque' => 174,
                'acceleration' => 8.50,
                'description' => 'A compact sedan known for its fuel efficiency and reliability.',
                'images' => ['civic_1.jpg', 'civic_2.jpg'],
                'is_sell_on_behalf' => true,
                'owner_name' => 'John Doe',
                'owner_email' => 'johndoe@example.com',
                'owner_phone' => '+254700123456',
            ],
            [
                'make' => 'Mercedes-Benz',
                'model' => 'E-Class',
                'year' => 2022,
                'price' => 9500000,
                'mileage' => 15000,
                'condition' => 'New',
                'location' => 'Nairobi, Kenya',
                'availability' => 'Available',
                'drive' => 'RWD',
                'engine_size' => 3000,
                'fuel_type' => 'Diesel',
                'horse_power' => 255,
                'transmission' => 'Automatic',
                'torque' => 620,
                'acceleration' => 6.40,
                'description' => 'A luxury sedan offering unmatched comfort and performance.',
                'images' => ['e_class_1.jpg', 'e_class_2.jpg'],
                'is_sell_on_behalf' => false,
                'owner_name' => null,
                'owner_email' => null,
                'owner_phone' => null,
            ],
            // More cars
        ];

        for ($i = 4; $i <= 20; $i++) {
            $cars[] = [
                'make' => 'Make ' . $i,
                'model' => 'Model ' . $i,
                'year' => rand(2015, 2023),
                'price' => rand(1500000, 10000000),
                'mileage' => rand(10000, 90000),
                'condition' => ['New', 'Used'][rand(0, 1)],
                'location' => ['Nairobi, Kenya', 'Mombasa, Kenya', 'Kisumu, Kenya'][rand(0, 2)],
                'availability' => ['Available', 'Pending'][rand(0, 1)],
                'drive' => ['4WD', 'FWD', 'RWD'][rand(0, 2)],
                'engine_size' => rand(1500, 4000),
                'fuel_type' => ['Petrol', 'Diesel'][rand(0, 1)],
                'horse_power' => rand(100, 300),
                'transmission' => ['Automatic', 'Manual'][rand(0, 1)],
                'torque' => rand(150, 700),
                'acceleration' => rand(5, 12) + rand(0, 99) / 100,
                'description' => 'A great vehicle for everyday use.',
                'images' => ['car_' . $i . '_1.jpg', 'car_' . $i . '_2.jpg'],
                'is_sell_on_behalf' => rand(0, 1),
                'owner_name' => rand(0, 1) ? 'Owner ' . $i : null,
                'owner_email' => rand(0, 1) ? 'owner' . $i . '@example.com' : null,
                'owner_phone' => rand(0, 1) ? '+254700' . rand(100000, 999999) : null,
            ];
        }

        foreach ($cars as $car) {
            Car::create($car);
        }
    }
}
