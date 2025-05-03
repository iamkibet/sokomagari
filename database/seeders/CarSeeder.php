<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Car;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

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

        // Create regular cars for each user
        $this->createRegularCars($users);

        // Create featured cars
        $this->createFeaturedCars($users);
    }

    /**
     * Create regular cars for each user
     * 
     * @param \Illuminate\Database\Eloquent\Collection $users
     * @return void
     */
    private function createRegularCars($users): void
    {
        foreach ($users as $user) {
            // Create 5 cars for each user
            for ($i = 0; $i < 5; $i++) {
                $isFeatured = $i === 0; // First car is featured
                $carFolder = ($i % 2 == 0) ? 'car1' : 'car4';

                try {
                    $description = $this->getRandomDescription();
                    Log::info('Generated description: ' . $description);

                    $carData = [
                        'user_id' => $user->id,
                        'make' => $this->getRandomMake(),
                        'model' => $this->getRandomModel(),
                        'year' => rand(2010, 2023),
                        'price' => rand(300000, 1500000),
                        'mileage' => rand(1000, 300000),
                        'condition' => $this->getRandomCondition(),
                        'description' => $description,
                        'is_featured' => $isFeatured,
                        'status' => 'available',
                        'type' => $this->getRandomType(),
                        'location' => $this->getRandomLocation(),
                        'availability' => 'Available',
                        'drive' => $this->getRandomDrive(),
                        'engine_size' => rand(1000, 5000),
                        'fuel_type' => $this->getRandomFuelType(),
                        'horse_power' => rand(100, 500),
                        'transmission' => $this->getRandomTransmission(),
                        'torque' => rand(200, 800),
                        'acceleration' => rand(5, 15) + (rand(0, 99) / 100),
                        'images' => $this->getLocalImagePaths($carFolder),
                        'is_sell_on_behalf' => false,
                        'comfort_features' => $this->getComfortFeatures(),
                        'safety_features' => $this->getSafetyFeatures(),
                        'annual_insurance_cost' => rand(50000, 200000),
                        'highway_fuel_efficiency' => rand(10, 25) + (rand(0, 99) / 100),
                        'urban_fuel_efficiency' => rand(8, 20) + (rand(0, 99) / 100),
                    ];

                    $car = Car::create($carData);
                    Log::info('Created car with description: ' . $car->description);
                } catch (\Exception $e) {
                    Log::error('Failed to create car: ' . $e->getMessage());
                    Log::error('Stack trace: ' . $e->getTraceAsString());
                }
            }
        }
    }

    /**
     * Create featured cars with specific attributes
     * 
     * @param \Illuminate\Database\Eloquent\Collection $users
     * @return void
     */
    private function createFeaturedCars($users): void
    {
        $featuredCars = [
            [
                'make' => 'Toyota',
                'model' => 'Land Cruiser',
                'year' => 2023,
                'price' => 790000,
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
                'images' => $this->getLocalImagePaths('car1'),
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
                'images' => $this->getLocalImagePaths('car4'),
                'is_sell_on_behalf' => false,
                'is_featured' => true,
                'status' => 'available',
            ],
        ];

        foreach ($featuredCars as $carData) {
            try {
                $carData['user_id'] = $users->random()->id;
                $carData['comfort_features'] = $this->getComfortFeatures();
                $carData['safety_features'] = $this->getSafetyFeatures();
                $carData['annual_insurance_cost'] = rand(50000, 200000);
                $carData['highway_fuel_efficiency'] = rand(10, 25) + (rand(0, 99) / 100);
                $carData['urban_fuel_efficiency'] = rand(8, 20) + (rand(0, 99) / 100);
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
            return ['placeholder.jpg'];
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
            $imagePaths[] = $carFolder . '/' . basename($thumbnailFile);
            $imageFiles = array_diff($imageFiles, [$thumbnailFile]);
        }

        // Sort remaining files for consistent ordering
        sort($imageFiles);

        // Add remaining images (up to 4 more if we have a thumbnail, up to 5 if we don't)
        $remainingCount = $thumbnailFile ? 4 : 5;
        $count = min($remainingCount, count($imageFiles));

        for ($i = 0; $i < $count; $i++) {
            // Create web-accessible path
            $imagePaths[] = $carFolder . '/' . basename($imageFiles[$i]);
        }

        return $imagePaths;
    }

    /**
     * Get random car make
     * 
     * @return string
     */
    private function getRandomMake(): string
    {
        $makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Nissan'];
        return $makes[array_rand($makes)];
    }

    /**
     * Get random car model
     * 
     * @return string
     */
    private function getRandomModel(): string
    {
        $models = ['Camry', 'Civic', 'F-150', 'Silverado', '3 Series', 'C-Class', 'A4', 'Altima'];
        return $models[array_rand($models)];
    }

    /**
     * Get random car condition
     * 
     * @return string
     */
    private function getRandomCondition(): string
    {
        $conditions = ['New', 'Used', 'Certified Pre-Owned'];
        return $conditions[array_rand($conditions)];
    }

    /**
     * Get random car type
     * 
     * @return string
     */
    private function getRandomType(): string
    {
        $types = ['Sedan', 'SUV', 'Hatchback', 'Truck', 'Van'];
        return $types[array_rand($types)];
    }

    /**
     * Get random drive type
     * 
     * @return string
     */
    private function getRandomDrive(): string
    {
        $drives = ['FWD', 'RWD', 'AWD', '4WD'];
        return $drives[array_rand($drives)];
    }

    /**
     * Get random fuel type
     * 
     * @return string
     */
    private function getRandomFuelType(): string
    {
        $fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
        return $fuelTypes[array_rand($fuelTypes)];
    }

    /**
     * Get random transmission type
     * 
     * @return string
     */
    private function getRandomTransmission(): string
    {
        $transmissions = ['Automatic', 'Manual', 'CVT'];
        return $transmissions[array_rand($transmissions)];
    }

    /**
     * Get random location
     * 
     * @return string
     */
    private function getRandomLocation(): string
    {
        $locations = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];
        return $locations[array_rand($locations)];
    }

    /**
     * Get random description
     * 
     * @return string
     */
    private function getRandomDescription(): string
    {
        $descriptions = [
            'Well-maintained vehicle with regular service history.',
            'Excellent condition, perfect for family use.',
            'Low mileage, single owner, meticulously maintained.',
            'Premium features and modern technology included.',
            'Great fuel efficiency and comfortable ride.',
        ];
        return $descriptions[array_rand($descriptions)];
    }

    /**
     * Get comfort features with standardized boolean values
     * 
     * @return array
     */
    private function getComfortFeatures(): array
    {
        return [
            'fm_radio' => (string)rand(0, 1),
            'trimming' => $this->getRandomTrim(),
            'heated_seats' => (string)rand(0, 1),
            'sound_system' => $this->getRandomSoundSystem(),
            'apple_carplay' => (string)rand(0, 1),
            'keyless_entry' => (string)rand(0, 1),
            'paddle_shifts' => (string)rand(0, 1),
            'power_windows' => (string)rand(0, 1),
            'seat_material' => $this->getRandomSeatMaterial(),
            'isofix_anchors' => (string)rand(0, 1),
            'auto_start_stop' => (string)rand(0, 1),
            'air_conditioning' => $this->getRandomAirConditioningType(),
            'powered_tailgate' => (string)rand(0, 1),
            'steering_controls' => (string)rand(0, 1),
            'phone_connectivity' => (string)rand(0, 1),
            'infotainment_system' => $this->getRandomInfotainmentSystem()
        ];
    }

    /**
     * Get safety features with standardized boolean values
     * 
     * @return array
     */
    private function getSafetyFeatures(): array
    {
        return [
            'abs' => (string)rand(0, 1),
            'gps_tracker' => (string)rand(0, 1),
            'immobilizer' => (string)rand(0, 1),
            'srs_airbags' => (string)rand(0, 1),
            'cruise_control' => (string)rand(0, 1),
            'reverse_camera' => (string)rand(0, 1),
            'lane_assistance' => (string)rand(0, 1),
            'parking_sensors' => (string)rand(0, 1),
            'emergency_braking' => (string)rand(0, 1),
            'stability_control' => (string)rand(0, 1),
            'tyre_pressure_monitor' => (string)rand(0, 1),
            'brake_force_distribution' => (string)rand(0, 1)
        ];
    }

    /**
     * Get random trim type
     * 
     * @return string
     */
    private function getRandomTrim(): string
    {
        $trims = ['wood', 'carbon fiber', 'aluminum', 'plastic'];
        return $trims[array_rand($trims)];
    }

    /**
     * Get random seat material
     * 
     * @return string
     */
    private function getRandomSeatMaterial(): string
    {
        $materials = ['Leather', 'Semi Leather', 'Fabric'];
        return $materials[array_rand($materials)];
    }

    /**
     * Get random sound system or null
     * 
     * @return string|null
     */
    private function getRandomSoundSystem(): ?string
    {
        $systems = [null, 'Bose', 'Harman Kardon', 'Sony', 'JBL'];
        return $systems[array_rand($systems)];
    }

    /**
     * Get random air conditioning type or null
     * 
     * @return string|null
     */
    private function getRandomAirConditioningType(): ?string
    {
        $types = [null, 'Manual', 'Automatic Climate Control', 'Dual-zone Climate Control', 'Multi-zone Climate Control'];
        return $types[array_rand($types)];
    }

    /**
     * Get random infotainment system or null
     * 
     * @return string|null
     */
    private function getRandomInfotainmentSystem(): ?string
    {
        $systems = [null, 'Basic', 'Touchscreen', 'Navigation System', 'Premium Entertainment System'];
        return $systems[array_rand($systems)];
    }
}
