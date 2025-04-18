<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have users before creating cars
        if (User::count() === 0) {
            Log::warning('No users found. Please run UserSeeder first.');
            return;
        }

        // Get all users
        $users = User::all();

        foreach ($users as $user) {
            // Create 5 cars for each user
            for ($i = 0; $i < 5; $i++) {
                $isFeatured = $i === 0; // First car is featured

                try {
                    // Alternate between car1 and car4 folders since they're the only ones with images
                    $carFolder = ($i % 2 == 0) ? 'car1' : 'car4';

                    Car::create([
                        'user_id' => $user->id,
                        'make' => $this->getRandomMake(),
                        'model' => $this->getRandomModel(),
                        'year' => rand(2010, 2023),
                        'price' => rand(10000, 50000) * 1000,
                        'mileage' => rand(10000, 100000),
                        'condition' => $this->getRandomCondition(),
                        'description' => 'This is a sample car description.',
                        'is_featured' => $isFeatured,
                        'status' => 'available',
                        'type' => $this->getRandomType(),
                        'location' => 'Nairobi',
                        'availability' => 'Available',
                        'drive' => $this->getRandomDrive(),
                        'engine_size' => rand(1000, 5000),
                        'fuel_type' => $this->getRandomFuelType(),
                        'horse_power' => rand(100, 500),
                        'transmission' => $this->getRandomTransmission(),
                        'torque' => rand(200, 800),
                        'acceleration' => rand(5, 15) + (rand(0, 99) / 100),
                        'images' => json_encode($this->getLocalImagePaths($carFolder)),
                        'is_sell_on_behalf' => false,
                    ]);
                } catch (\Exception $e) {
                    Log::error('Failed to create car: ' . $e->getMessage());
                }
            }
        }

        // Create featured cars with specific attributes
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
                'images' => json_encode($this->getLocalImagePaths('car1')),
                'is_sell_on_behalf' => false,
                'is_featured' => true,
                'status' => 'available',
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
                'images' => json_encode($this->getLocalImagePaths('car4')),
                'is_sell_on_behalf' => false,
                'is_featured' => true,
                'status' => 'available',
            ],
        ];

        // Assign featured cars to random users
        foreach ($featuredCars as $carData) {
            try {
                $carData['user_id'] = $users->random()->id;
                Car::create($carData);
            } catch (\Exception $e) {
                Log::error('Failed to create featured car: ' . $e->getMessage());
            }
        }
    }

    /**
     * Get local image paths from the car folders, ensuring the first image is suitable for a thumbnail
     * 
     * @param string $carFolder The car folder to use (car1 or car4)
     * @return array Array of image paths
     */
    private function getLocalImagePaths(string $carFolder): array
    {
        $imagePaths = [];
        $folderPath = public_path('images/' . $carFolder);

        // Get all jpg files in the specified folder
        $imageFiles = glob($folderPath . '/*.jpg');

        if (empty($imageFiles)) {
            // Fallback to placeholder if no images found
            return ['images/placeholder.jpg'];
        }

        // Define the thumbnail based on car folder
        $thumbnailFile = null;

        if ($carFolder === 'car1') {
            // For car1, use carpic1.jpg as thumbnail
            foreach ($imageFiles as $file) {
                if (basename($file) === 'carpic1.jpg') {
                    $thumbnailFile = $file;
                    break;
                }
            }
        } else if ($carFolder === 'car4') {
            // For car4, use 1000747504.jpg as thumbnail (first image)
            foreach ($imageFiles as $file) {
                if (basename($file) === '1000747504.jpg') {
                    $thumbnailFile = $file;
                    break;
                }
            }
        }

        // If thumbnail is found, add it first and remove from array
        if ($thumbnailFile) {
            $imagePaths[] = 'images/' . $carFolder . '/' . basename($thumbnailFile);
            $imageFiles = array_diff($imageFiles, [$thumbnailFile]);
        }

        // Sort remaining files for consistent ordering
        sort($imageFiles);

        // Add remaining images (up to 4 more if we have a thumbnail, up to 5 if we don't)
        $remainingCount = $thumbnailFile ? 4 : 5;
        $count = min($remainingCount, count($imageFiles));

        for ($i = 0; $i < $count; $i++) {
            // Create web-accessible path
            $imagePaths[] = 'images/' . $carFolder . '/' . basename($imageFiles[$i]);
        }

        return $imagePaths;
    }

    private function getRandomMake(): string
    {
        $makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Nissan'];
        return $makes[array_rand($makes)];
    }

    private function getRandomModel(): string
    {
        $models = ['Camry', 'Civic', 'F-150', 'Silverado', '3 Series', 'C-Class', 'A4', 'Altima'];
        return $models[array_rand($models)];
    }

    private function getRandomCondition(): string
    {
        $conditions = ['New', 'Used', 'Certified Pre-Owned'];
        return $conditions[array_rand($conditions)];
    }

    private function getRandomType(): string
    {
        $types = ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Van'];
        return $types[array_rand($types)];
    }

    private function getRandomDrive(): string
    {
        $drives = ['FWD', 'RWD', 'AWD', '4WD'];
        return $drives[array_rand($drives)];
    }

    private function getRandomFuelType(): string
    {
        $fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
        return $fuelTypes[array_rand($fuelTypes)];
    }

    private function getRandomTransmission(): string
    {
        $transmissions = ['Automatic', 'Manual', 'CVT'];
        return $transmissions[array_rand($transmissions)];
    }
}
