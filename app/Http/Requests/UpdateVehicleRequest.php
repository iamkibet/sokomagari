<?php

namespace App\Http\Requests;

use App\Models\Car;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\Vehicle;

class UpdateVehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Get the vehicle instance directly from route binding
        $vehicle = $this->route('vehicle');

        // Handle both model instances and raw IDs
        $vehicle = $vehicle instanceof Car
            ? $vehicle
            : Car::find($vehicle);

        return $vehicle && $vehicle->user_id === auth()->id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'make' => ['required', 'string', 'max:255'],
            'model' => ['required', 'string', 'max:255'],
            'year' => ['required', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'images' => ['nullable', 'array', 'max:5'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif', 'max:2048'],
            'price' => ['required', 'numeric', 'min:0'],
            'mileage' => ['required', 'integer', 'min:0'],
            'transmission' => ['required', 'string', 'in:automatic,manual'],
            'fuel_type' => ['required', 'string', 'in:petrol,diesel,electric,hybrid'],
            'body_type' => ['required', 'string', 'in:sedan,hatchback,suv,coupe,convertible,pickup'],
            'color' => ['required', 'string', 'max:50'],
            'engine_capacity' => ['required', 'numeric', 'min:0'],
            'power' => ['required', 'integer', 'min:0'],
            'seats' => ['required', 'integer', 'min:1', 'max:9'],
            'doors' => ['required', 'integer', 'min:2', 'max:5'],
            'description' => ['required', 'string', 'min:10'],
            'location' => ['required', 'string', 'max:255'],
            'status' => ['required', 'string', 'in:available,sold,reserved'],
            'comfort_features' => ['nullable', 'array'],
            'comfort_features.*' => ['string', 'max:255'],
            'safety_features' => ['nullable', 'array'],
            'safety_features.*' => ['string', 'max:255'],
            'annual_insurance_cost' => ['nullable', 'numeric', 'min:0'],
            'highway_fuel_efficiency' => ['nullable', 'numeric', 'min:0'],
            'urban_fuel_efficiency' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'images.max' => 'Maximum 10 images allowed',
            'images.*.image' => 'Each file must be an image',
            'images.*.mimes' => 'Only JPEG, PNG, JPG, and GIF images are allowed',
            'images.*.max' => 'Each image must be less than 2MB',
        ];
    }
}
