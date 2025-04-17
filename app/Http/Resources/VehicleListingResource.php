<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VehicleListingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'make' => $this->make,
            'model' => $this->model,
            'year' => $this->year,
            'price' => $this->formatPrice(),
            'thumbnail' => $this->thumbnail,
            'status' => $this->getStatusWithDates(),
            'location' => $this->location,
            'metrics' => [
                'views' => $this->views ?? 0,
                'engagement' => $this->engagementScore(),
                'last_viewed' => optional($this->latestView)->created_at?->diffForHumans(),
            ],
            'dates' => [
                'listed' => $this->created_at->format('M j, Y'),
                'updated' => $this->updated_at->format('M j, Y'),
                'sold' => optional($this->sold_at)->format('M j, Y'),
            ],
            'links' => [
                'edit' => route('dashboard.vehicles.edit', $this->slug),
                'public' => route('public.vehicles.show', $this->slug),
                'analytics' => route('dashboard.vehicles.analytics', $this->slug),
            ]
        ];
    }

    protected function formatPrice()
    {
        return [
            'raw' => $this->price,
            'formatted' => number_format($this->price, 2),
            'currency' => config('app.currency', 'KES'),
        ];
    }

    protected function getStatusWithDates()
    {
        return [
            'availability' => $this->availability,
            'days_on_market' => $this->created_at->diffInDays(now()),
            'status_label' => $this->getStatusLabel(),
        ];
    }

    protected function getStatusLabel()
    {
        return match ($this->availability) {
            'sold' => 'Sold (' . $this->sold_at->format('M Y') . ')',
            'available' => 'Active (' . $this->created_at->diffForHumans() . ')',
            default => ucfirst($this->availability),
        };
    }

    protected function engagementScore()
    {
        if (!$this->views) return 0;

        return min(
            ceil(($this->contact_requests / $this->views) * 100),
            100
        );
    }
}
