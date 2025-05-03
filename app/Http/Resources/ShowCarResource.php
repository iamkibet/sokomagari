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
            'torque' => $this->torque,
            'acceleration' => $this->acceleration,
            'type' => $this->type,
            'engine_size' => $this->engine_size,
            'thumbnail' => $this->thumbnail,
            'location' => $this->location,
            'condition' => $this->condition,
            'fuel_type' => $this->fuel_type,
            'transmission' => $this->transmission,
            'mileage' => $this->mileage,
            'slug' => $this->slug,
            'thumbnail'  => $this->thumbnail,
            'annual_insurance_cost' => $this->annual_insurance_cost,
            'highway_fuel_efficiency' => $this->highway_fuel_efficiency,
            'urban_fuel_efficiency' => $this->urban_fuel_efficiency,
            'image_urls' => $this->image_urls,
            'comfort_features' => $this->comfort_features,
            'safety_features' => $this->safety_features,
            'description' => $this->description,
        ];
    }
}
