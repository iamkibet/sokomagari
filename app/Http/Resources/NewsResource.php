<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'slug' => $this->slug,
            'is_published' => $this->is_published,
            'published_at' => $this->published_at,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'metrics' => [
                'views' => $this->views ?? 0,
                'engagement_rate' => $this->calculateEngagementRate(),
                'read_time' => $this->calculateReadTime(),
            ],
            'links' => [
                'edit' => route('dashboard.news.edit', $this->slug),
                'delete' => route('dashboard.news.destroy', $this->slug),
                'preview' => route('public.news.show', $this->slug),
            ],
        ];
    }

    /**
     * Calculate engagement rate based on views and content length
     */
    private function calculateEngagementRate(): float
    {
        $wordCount = str_word_count($this->content);
        $baseEngagement = $this->views ?? 0;

        // Adjust engagement rate based on content length
        if ($wordCount > 1000) {
            $baseEngagement *= 1.2; // Longer articles get a boost
        }

        return round($baseEngagement / max(1, $wordCount / 100), 2);
    }

    /**
     * Calculate estimated read time in minutes
     */
    private function calculateReadTime(): int
    {
        $wordCount = str_word_count($this->content);
        $wordsPerMinute = 200; // Average reading speed

        return max(1, ceil($wordCount / $wordsPerMinute));
    }
}
