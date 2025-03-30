<?php

namespace App\Http\Requests;

use App\Models\Car;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request
     */
    public function rules(): array
    {
        return [
            'make'                   => 'required|string|max:255',
            'model'                  => 'required|string|max:255',
            'year'                   => 'required|integer|between:1900,' . date('Y'),
            'price'                  => 'required|numeric|min:0',
            'mileage'                => 'required|integer|min:0',
            'condition'              => 'required|string|in:new,used',
            'type'                   => 'nullable|string|max:255',
            'location'               => 'nullable|string|max:255',
            'availability'           => 'nullable|string|max:255',
            'drive'                  => 'nullable|string|max:255',
            'engine_size'            => 'nullable|integer|min:0',
            'fuel_type'              => 'nullable|string|max:255',
            'horse_power'            => 'nullable|integer|min:0',
            'transmission'           => 'nullable|string|max:255',
            'torque'                 => 'nullable|integer|min:0',
            'acceleration'           => 'nullable|numeric|min:0',
            'description'            => 'nullable|string',
            'images'                 => 'required|array|min:1|max:10',
            'images.*'               => 'image|mimes:jpeg,png,jpg,gif|max:5120',
            'is_sell_on_behalf'      => 'sometimes|boolean',
            'owner_name'             => 'nullable|string|max:255',
            'owner_email'            => 'nullable|email|max:255',
            'owner_phone'            => 'nullable|string|max:255',
            'comfort_features' => 'nullable|array',
            'comfort_features.trimming' => 'nullable|string|max:255',
            'comfort_features.heated_seats' => 'nullable|boolean',
            'comfort_features.sound_system' => 'nullable|string|max:255',
            'comfort_features.power_windows' => 'nullable|boolean',
            'comfort_features.seat_material' => 'nullable|string|max:255',
            'comfort_features.air_conditioning' => 'nullable|string|max:255',
            'comfort_features.powered_tailgate' => 'nullable|boolean',
            'comfort_features.steering_controls' => 'nullable|boolean',
            'comfort_features.phone_connectivity' => 'nullable|boolean',
            'comfort_features.auto_start_stop' => 'nullable|boolean',
            'comfort_features.infotainment_system' => 'nullable|string|max:255',
            'comfort_features.isofix_anchors' => 'nullable|boolean',
            'comfort_features.paddle_shifts' => 'nullable|boolean',
            'comfort_features.apple_carplay' => 'nullable|boolean',
            'comfort_features.fm_radio' => 'nullable|boolean',
            'comfort_features.keyless_entry' => 'nullable|boolean',
            'safety_features' => 'nullable|array',
            'safety_features.gps_tracker' => 'nullable|boolean',
            'safety_features.srs_airbags' => 'nullable|boolean',
            'safety_features.reverse_camera' => 'nullable|boolean',
            'safety_features.lane_assistance' => 'nullable|boolean',
            'safety_features.parking_sensors' => 'nullable|boolean',
            'safety_features.cruise_control' => 'nullable|boolean',
            'safety_features.abs' => 'nullable|boolean',
            'safety_features.emergency_braking' => 'nullable|boolean',
            'safety_features.immobilizer' => 'nullable|boolean',
            'safety_features.stability_control' => 'nullable|boolean',
            'safety_features.tyre_pressure_monitor' => 'nullable|boolean',
            'safety_features.brake_force_distribution' => 'nullable|boolean',
            'annual_insurance_cost'  => 'nullable|numeric|min:0',
            'highway_fuel_efficiency' => 'nullable|numeric|min:0',
            'urban_fuel_efficiency'  => 'nullable|numeric|min:0',
        ];
    }

    /**
     * Prepare the data for validation
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_sell_on_behalf' => $this->boolean('is_sell_on_behalf'),
        ]);
    }

    /**
     * Custom validation messages
     */
    public function messages(): array
    {
        return [
            'images.required' => 'At least one image is required',
            'images.*.max' => 'Each image must be less than 5MB',
        ];
    }
}
