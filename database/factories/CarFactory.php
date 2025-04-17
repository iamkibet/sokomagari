<?php

namespace Database\Factories;

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
        $makes = ['Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford', 'Nissan', 'Mazda', 'Subaru'];
        $models = [
            'Toyota' => ['Corolla', 'Camry', 'RAV4', 'Land Cruiser', 'Hilux', 'Prado'],
            'Honda' => ['Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot'],
            'Mercedes-Benz' => ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE'],
            'BMW' => ['3 Series', '5 Series', 'X3', 'X5', 'X7'],
            'Audi' => ['A4', 'A6', 'Q5', 'Q7', 'Q8'],
            'Volkswagen' => ['Golf', 'Passat', 'Tiguan', 'Touareg'],
            'Ford' => ['Focus', 'Fusion', 'Escape', 'Explorer'],
            'Nissan' => ['Altima', 'Maxima', 'Rogue', 'Pathfinder'],
            'Mazda' => ['Mazda3', 'Mazda6', 'CX-5', 'CX-9'],
            'Subaru' => ['Impreza', 'Legacy', 'Forester', 'Outback']
        ];

        $make = $this->faker->randomElement($makes);
        $model = $this->faker->randomElement($models[$make]);
        $year = $this->faker->numberBetween(2015, 2023);
        $price = $this->faker->numberBetween(1000000, 10000000);
        $mileage = $this->faker->numberBetween(0, 200000);
        $condition = $this->faker->randomElement(['New', 'Used']);
        $location = $this->faker->randomElement(['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret']);
        $type = $this->faker->randomElement(['sedan', 'suv', 'hatchback', 'truck', 'van']);
        $availability = $this->faker->randomElement(['Available', 'Sold', 'Reserved']);
        $drive = $this->faker->randomElement(['4WD', 'FWD', 'RWD']);
        $engine_size = $this->faker->numberBetween(1000, 5000);
        $fuel_type = $this->faker->randomElement(['Petrol', 'Diesel', 'Hybrid', 'Electric']);
        $horse_power = $this->faker->numberBetween(100, 500);
        $transmission = $this->faker->randomElement(['Automatic', 'Manual']);
        $torque = $this->faker->numberBetween(150, 700);
        $acceleration = $this->faker->randomFloat(2, 5, 12);

        // Generate images from local folders with actual file names
        $carFolders = [
            'car1' => [
                'carpic1.jpg',
                'pic2.jpg',
                'pic3.jpg',
                'pic4.jpg',
                'pic5.jpg',
                'pic6.jpg',
                'pic8.jpg',
                'pic9.jpg',
                'pic10.jpg'
            ],
            'car2' => [
                '1ea140be-5fb4-4186-9498-fb6277a769a8.jpeg',
                '29dd4496-f069-41a3-9201-dbef0d6260d0.jpeg',
                '40a2402a-fda6-4707-b32c-353a10da8dfa.jpeg',
                '5a18669a-2a6b-494d-9903-590251f8d55b.jpeg',
                '7293060c-6e04-4876-8401-a46f97c61893.jpeg'
            ],
            'car3' => [
                '11c370ee-3155-4190-8736-97de4afc1281.jpeg',
                '1271fc21-f843-4bd4-801f-520fa3c64c84.jpeg',
                '166e93e8-7ca4-4ac4-ac21-154a49c910e0.jpeg',
                '18a6da8c-0602-4652-abbb-d500d87869cd.jpeg',
                '1ea03255-8d9f-4450-9233-7ed188de401a.jpeg'
            ]
        ];

        $selectedFolder = $this->faker->randomElement(array_keys($carFolders));
        $images = [];

        // Select 5 random images from the selected folder
        $selectedImages = $this->faker->randomElements($carFolders[$selectedFolder], min(5, count($carFolders[$selectedFolder])));
        foreach ($selectedImages as $image) {
            $images[] = "images/{$selectedFolder}/{$image}";
        }

        return [
            'make' => $make,
            'model' => $model,
            'year' => $year,
            'price' => $price,
            'mileage' => $mileage,
            'condition' => $condition,
            'location' => $location,
            'type' => $type,
            'availability' => $availability,
            'drive' => $drive,
            'engine_size' => $engine_size,
            'fuel_type' => $fuel_type,
            'horse_power' => $horse_power,
            'transmission' => $transmission,
            'torque' => $torque,
            'acceleration' => $acceleration,
            'description' => $this->faker->paragraph(3),
            'images' => $images,
            'is_sell_on_behalf' => $this->faker->boolean(30),
            'owner_name' => $this->faker->optional(0.3)->name,
            'owner_email' => $this->faker->optional(0.3)->email,
            'owner_phone' => $this->faker->optional(0.3)->phoneNumber,
        ];
    }
}
