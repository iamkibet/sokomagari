<?php

namespace App\Http\Requests;

use App\Models\Vehicle;

class UpdateVehicleRequest extends StoreVehicleRequest
{
    /**
     * Determine if the user is authorized to update the vehicle
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('vehicle'));
    }

    /**
     * Get the validation rules that apply to the request
     */
    public function rules(): array
    {
        return array_merge(parent::rules(), [
            'images' => 'sometimes|array|min:1|max:10',
            // Add update-specific rules
        ]);
    }
}
