<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowCarResource extends JsonResource
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
            'make' => $this->make,
            'model' => $this->model,
            'year' => $this->year,
            'price' => $this->price,
            'thumbnail' => $this->thumbnail,
            'location' => $this->location,
            'condition' => $this->condition,
            'fuel_type' => $this->fuel_type,
            'transmission' => $this->transmission,
            'mileage' => $this->mileage,
            'slug' => $this->slug,
            'thumbnail'  => $this->thumbnail,
            'image_urls' => $this->image_urls,
        ];

     
    }
}
