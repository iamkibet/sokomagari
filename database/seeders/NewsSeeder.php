<?php

namespace Database\Seeders;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure we have users before creating news
        if (User::count() === 0) {
            Log::warning('No users found. Please run UserSeeder first.');
            return;
        }

        // Get all users
        $users = User::all();

        // Create news articles
        $this->createNewsArticles($users);
    }

    /**
     * Create news articles for each user
     */
    private function createNewsArticles($users): void
    {
        $newsTypes = [
            'review' => [
                'titles' => [
                    'In-Depth Review: {make} {model} {year} - A Game Changer?',
                    'Test Drive: {make} {model} {year} - First Impressions',
                    'Expert Review: {make} {model} {year} - Worth the Hype?',
                ],
                'excerpts' => [
                    'Our comprehensive review of the {make} {model} {year} reveals what makes this vehicle stand out in its class.',
                    'We take the {make} {model} {year} for a spin to see if it lives up to expectations.',
                    'Is the {make} {model} {year} the right choice for you? Find out in our detailed review.',
                ],
            ],
            'news' => [
                'titles' => [
                    '{make} Announces New {model} for {year}',
                    'Breaking: {make} Reveals Latest {model} Updates',
                    'Industry News: {make} {model} Sets New Standards',
                ],
                'excerpts' => [
                    'The automotive world is buzzing with {make}\'s latest announcement about the {model}.',
                    'Get the latest updates on {make}\'s new {model} and what it means for the market.',
                    'Discover how {make}\'s new {model} is changing the game in the automotive industry.',
                ],
            ],
            'sales' => [
                'titles' => [
                    'Best-Selling {make} {model} Models of {year}',
                    'Market Analysis: {make} {model} Sales Performance',
                    'Why {make} {model} Sales Are Soaring in {year}',
                ],
                'excerpts' => [
                    'A look at the top-selling {make} {model} configurations and what makes them popular.',
                    'Analyzing the sales performance of {make} {model} in the current market.',
                    'Understanding the factors driving the success of {make} {model} sales.',
                ],
            ],
        ];

        $makes = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'BMW', 'Mercedes', 'Audi', 'Nissan'];
        $models = ['Camry', 'Civic', 'F-150', 'Silverado', '3 Series', 'C-Class', 'A4', 'Altima'];
        $years = range(2020, 2024);

        // Create 30 news articles
        for ($i = 0; $i < 30; $i++) {
            $user = $users->random();
            $type = array_rand($newsTypes);
            $make = $makes[array_rand($makes)];
            $model = $models[array_rand($models)];
            $year = $years[array_rand($years)];

            $titleTemplate = $newsTypes[$type]['titles'][array_rand($newsTypes[$type]['titles'])];
            $excerptTemplate = $newsTypes[$type]['excerpts'][array_rand($newsTypes[$type]['excerpts'])];

            $title = str_replace(['{make}', '{model}', '{year}'], [$make, $model, $year], $titleTemplate);
            $excerpt = str_replace(['{make}', '{model}', '{year}'], [$make, $model, $year], $excerptTemplate);

            $content = $this->generateContent($type, $make, $model, $year);

            try {
                News::create([
                    'title' => $title,
                    'excerpt' => $excerpt,
                    'content' => $content,
                    'is_published' => true,
                    'published_at' => now()->subDays(rand(0, 30)),
                    'user_id' => $user->id,
                ]);
            } catch (\Exception $e) {
                Log::error('Failed to create news article: ' . $e->getMessage());
            }
        }
    }

    /**
     * Generate content based on the news type
     */
    private function generateContent(string $type, string $make, string $model, int $year): string
    {
        $introductions = [
            "The automotive industry continues to evolve, and {make} is at the forefront of innovation.",
            "In a market filled with options, {make} stands out with its commitment to excellence.",
            "The {year} {make} {model} represents a significant step forward in automotive technology.",
        ];

        $features = [
            "Advanced safety features",
            "Cutting-edge infotainment system",
            "Efficient engine performance",
            "Comfortable interior design",
            "Superior handling and control",
            "Innovative driver assistance",
            "Premium sound system",
            "Spacious cargo capacity",
        ];

        $conclusions = [
            "The {make} {model} {year} sets a new standard in its class.",
            "With its impressive features and performance, the {make} {model} {year} is a strong contender.",
            "The {make} {model} {year} proves that innovation and quality can go hand in hand.",
        ];

        $introduction = str_replace(['{make}', '{model}', '{year}'], [$make, $model, $year], $introductions[array_rand($introductions)]);

        $content = "# {$introduction}\n\n";

        // Add 3-5 random features
        shuffle($features);
        $selectedFeatures = array_slice($features, 0, rand(3, 5));

        foreach ($selectedFeatures as $feature) {
            $content .= "## {$feature}\n\n";
            $content .= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n";
        }

        $conclusion = str_replace(['{make}', '{model}', '{year}'], [$make, $model, $year], $conclusions[array_rand($conclusions)]);
        $content .= "# {$conclusion}\n\n";

        return $content;
    }
}
