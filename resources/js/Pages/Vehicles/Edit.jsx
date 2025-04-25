// edit page make professionally

import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { ChevronDown, ChevronUp, Check, AlertCircle } from "react-feather";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

const Edit = ({ vehicle, features }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        // Basic Details
        make: vehicle.make || "",
        model: vehicle.model || "",
        year: vehicle.year || "",
        price: vehicle.price || "",
        mileage: vehicle.mileage || "",
        condition: vehicle.condition || "",
        location: vehicle.location || "Nairobi, Kenya",
        availability: vehicle.availability || "Available",
        drive: vehicle.drive || "",
        engine_size: vehicle.engine_size || "",
        fuel_type: vehicle.fuel_type || "",
        horse_power: vehicle.horse_power || "",
        transmission: vehicle.transmission || "",
        torque: vehicle.torque || "",
        type: vehicle.type || "",
        acceleration: vehicle.acceleration || "",
        description: vehicle.description || "",
        images: vehicle.images || [],
        is_sell_on_behalf: vehicle.is_sell_on_behalf || false,
        owner_name: vehicle.owner_name || "",
        owner_email: vehicle.owner_email || "",
        owner_phone: vehicle.owner_phone || "",
        // Comfort Features
        comfort_features: vehicle.comfort_features || {
            trimming: "",
            heated_seats: false,
            sound_system: "",
            power_windows: false,
            seat_material: "",
            air_conditioning: "",
            powered_tailgate: false,
            steering_controls: false,
            phone_connectivity: false,
            auto_start_stop: false,
            infotainment_system: "",
            isofix_anchors: false,
            paddle_shifts: false,
            apple_carplay: false,
            fm_radio: false,
            keyless_entry: false,
        },
        // Safety Features
        safety_features: vehicle.safety_features || {
            gps_tracker: false,
            srs_airbags: false,
            reverse_camera: false,
            lane_assistance: false,
            parking_sensors: false,
            cruise_control: false,
            abs: false,
            emergency_braking: false,
            immobilizer: false,
            stability_control: false,
            tyre_pressure_monitor: false,
            brake_force_distribution: false,
        },
        // Additional Details
        annual_insurance_cost: vehicle.annual_insurance_cost || "",
        highway_fuel_efficiency: vehicle.highway_fuel_efficiency || "",
        urban_fuel_efficiency: vehicle.urban_fuel_efficiency || "",
    });

    const [expandedSection, setExpandedSection] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        if (vehicle.images) {
            setImagePreviews(
                vehicle.images.map((img) => ({
                    url: img,
                    file: null,
                }))
            );
        }
    }, [vehicle.images]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }));
        setImagePreviews([...imagePreviews, ...newPreviews]);
        setData("images", [...data.images, ...files]);
    };

    const removeImage = (index) => {
        const newPreviews = [...imagePreviews];
        newPreviews.splice(index, 1);
        setImagePreviews(newPreviews);
        setData(
            "images",
            newPreviews.map((p) => p.file)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = new FormData();

        // Add all the basic fields
        Object.keys(data).forEach((key) => {
            if (
                key !== "images" &&
                key !== "comfort_features" &&
                key !== "safety_features"
            ) {
                if (
                    data[key] !== null &&
                    data[key] !== undefined &&
                    data[key] !== ""
                ) {
                    formData.append(key, data[key]);
                }
            }
        });

        // Add comfort features
        if (data.comfort_features) {
            Object.keys(data.comfort_features).forEach((key) => {
                if (
                    data.comfort_features[key] !== null &&
                    data.comfort_features[key] !== undefined
                ) {
                    formData.append(
                        `comfort_features[${key}]`,
                        data.comfort_features[key]
                    );
                }
            });
        }

        // Add safety features
        if (data.safety_features) {
            Object.keys(data.safety_features).forEach((key) => {
                if (
                    data.safety_features[key] !== null &&
                    data.safety_features[key] !== undefined
                ) {
                    formData.append(
                        `safety_features[${key}]`,
                        data.safety_features[key]
                    );
                }
            });
        }

        // Add images
        if (data.images && data.images.length > 0) {
            data.images.forEach((image, index) => {
                if (image instanceof File) {
                    formData.append(`images[${index}]`, image);
                }
            });
        }

        // Add _method for Laravel to recognize it as a PUT request
        formData.append("_method", "PUT");

        console.log("Form data being submitted:", Object.fromEntries(formData));

        put(route("dashboard.vehicles.update", vehicle.slug), {
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
            preserveScroll: true,
            onSuccess: () => {
                console.log("Update successful");
                router.visit(route("dashboard.index"));
            },
            onError: (errors) => {
                console.error("Update failed:", errors);
                // Show validation errors to user
                Object.keys(errors).forEach((key) => {
                    const errorMessage = errors[key];
                    // You can add your own error handling UI here
                    console.error(`${key}: ${errorMessage}`);
                });
            },
        });
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const renderInput = (label, name, type = "text", options = {}) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
                {options.required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                name={name}
                value={data[name]}
                onChange={(e) => setData(name, e.target.value)}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${
                    errors[name] ? "border-red-500" : ""
                }`}
                {...options}
            />
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
            )}
        </div>
    );

    const renderCheckbox = (label, name, parent = null) => (
        <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                name={name}
                checked={parent ? data[parent][name] : data[name]}
                onChange={(e) => {
                    if (parent) {
                        setData(parent, {
                            ...data[parent],
                            [name]: e.target.checked,
                        });
                    } else {
                        setData(name, e.target.checked);
                    }
                }}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label className="text-sm font-medium text-gray-700">{label}</label>
        </div>
    );

    const renderSelect = (label, name, options, parent = null) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                name={name}
                value={parent ? data[parent][name] : data[name]}
                onChange={(e) => {
                    if (parent) {
                        setData(parent, {
                            ...data[parent],
                            [name]: e.target.value,
                        });
                    } else {
                        setData(name, e.target.value);
                    }
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">
                                Edit Vehicle
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Information Section */}
                                <div className="border rounded-lg p-4">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleSection("basic")}
                                    >
                                        <h3 className="text-lg font-semibold">
                                            Basic Information
                                        </h3>
                                        {expandedSection === "basic" ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </div>
                                    {expandedSection === "basic" && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {renderInput(
                                                "Make",
                                                "make",
                                                "text",
                                                { required: true }
                                            )}
                                            {renderInput(
                                                "Model",
                                                "model",
                                                "text",
                                                { required: true }
                                            )}
                                            {renderInput(
                                                "Year",
                                                "year",
                                                "number",
                                                { required: true }
                                            )}
                                            {renderInput(
                                                "Price (KES)",
                                                "price",
                                                "number",
                                                { required: true }
                                            )}
                                            {renderInput(
                                                "Mileage",
                                                "mileage",
                                                "number",
                                                { required: true }
                                            )}
                                            {renderSelect(
                                                "Condition",
                                                "condition",
                                                ["new", "used"],
                                                null
                                            )}
                                            {renderSelect(
                                                "Type",
                                                "type",
                                                [
                                                    "sedan",
                                                    "suv",
                                                    "hatchback",
                                                    "van",
                                                ],
                                                null
                                            )}
                                            {renderSelect(
                                                "Drive",
                                                "drive",
                                                ["FWD", "RWD", "AWD", "4WD"],
                                                null
                                            )}
                                            {renderSelect(
                                                "Fuel Type",
                                                "fuel_type",
                                                [
                                                    "petrol",
                                                    "diesel",
                                                    "hybrid",
                                                    "electric",
                                                ],
                                                null
                                            )}
                                            {renderSelect(
                                                "Transmission",
                                                "transmission",
                                                ["automatic", "manual", "cvt"],
                                                null
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Technical Specifications Section */}
                                <div className="border rounded-lg p-4">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() =>
                                            toggleSection("technical")
                                        }
                                    >
                                        <h3 className="text-lg font-semibold">
                                            Technical Specifications
                                        </h3>
                                        {expandedSection === "technical" ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </div>
                                    {expandedSection === "technical" && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {renderInput(
                                                "Engine Size (cc)",
                                                "engine_size",
                                                "number"
                                            )}
                                            {renderInput(
                                                "Horse Power",
                                                "horse_power",
                                                "number"
                                            )}
                                            {renderInput(
                                                "Torque (Nm)",
                                                "torque",
                                                "number"
                                            )}
                                            {renderInput(
                                                "Acceleration (0-100 km/h)",
                                                "acceleration",
                                                "number"
                                            )}
                                            {renderInput(
                                                "Highway Fuel Efficiency",
                                                "highway_fuel_efficiency",
                                                "number"
                                            )}
                                            {renderInput(
                                                "Urban Fuel Efficiency",
                                                "urban_fuel_efficiency",
                                                "number"
                                            )}
                                            {renderInput(
                                                "Annual Insurance Cost",
                                                "annual_insurance_cost",
                                                "number"
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Comfort Features Section */}
                                <div className="border rounded-lg p-4">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleSection("comfort")}
                                    >
                                        <h3 className="text-lg font-semibold">
                                            Comfort Features
                                        </h3>
                                        {expandedSection === "comfort" ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </div>
                                    {expandedSection === "comfort" && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {renderInput(
                                                "Trimming",
                                                "trimming",
                                                "text",
                                                { parent: "comfort_features" }
                                            )}
                                            {renderInput(
                                                "Sound System",
                                                "sound_system",
                                                "text",
                                                { parent: "comfort_features" }
                                            )}
                                            {renderInput(
                                                "Seat Material",
                                                "seat_material",
                                                "text",
                                                { parent: "comfort_features" }
                                            )}
                                            {renderInput(
                                                "Air Conditioning",
                                                "air_conditioning",
                                                "text",
                                                { parent: "comfort_features" }
                                            )}
                                            {renderInput(
                                                "Infotainment System",
                                                "infotainment_system",
                                                "text",
                                                { parent: "comfort_features" }
                                            )}
                                            {renderCheckbox(
                                                "Heated Seats",
                                                "heated_seats",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "Power Windows",
                                                "power_windows",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "Powered Tailgate",
                                                "powered_tailgate",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "Steering Controls",
                                                "steering_controls",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "Phone Connectivity",
                                                "phone_connectivity",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "Auto Start/Stop",
                                                "auto_start_stop",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "Isofix Anchors",
                                                "isofix_anchors",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "Paddle Shifts",
                                                "paddle_shifts",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "Apple CarPlay",
                                                "apple_carplay",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "FM Radio",
                                                "fm_radio",
                                                "comfort_features"
                                            )}
                                            {renderCheckbox(
                                                "Keyless Entry",
                                                "keyless_entry",
                                                "comfort_features"
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Safety Features Section */}
                                <div className="border rounded-lg p-4">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleSection("safety")}
                                    >
                                        <h3 className="text-lg font-semibold">
                                            Safety Features
                                        </h3>
                                        {expandedSection === "safety" ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </div>
                                    {expandedSection === "safety" && (
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {renderCheckbox(
                                                "GPS Tracker",
                                                "gps_tracker",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "SRS Airbags",
                                                "srs_airbags",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "Reverse Camera",
                                                "reverse_camera",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "Lane Assistance",
                                                "lane_assistance",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "Parking Sensors",
                                                "parking_sensors",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "Cruise Control",
                                                "cruise_control",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "ABS",
                                                "abs",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "Emergency Braking",
                                                "emergency_braking",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "Immobilizer",
                                                "immobilizer",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "Stability Control",
                                                "stability_control",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "Tyre Pressure Monitor",
                                                "tyre_pressure_monitor",
                                                "safety_features"
                                            )}
                                            {renderCheckbox(
                                                "Brake Force Distribution",
                                                "brake_force_distribution",
                                                "safety_features"
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Images Section */}
                                <div className="border rounded-lg p-4">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleSection("images")}
                                    >
                                        <h3 className="text-lg font-semibold">
                                            Images
                                        </h3>
                                        {expandedSection === "images" ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </div>
                                    {expandedSection === "images" && (
                                        <div className="mt-4">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {imagePreviews.map(
                                                    (preview, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative"
                                                        >
                                                            <img
                                                                src={
                                                                    preview.url
                                                                }
                                                                alt={`Preview ${
                                                                    index + 1
                                                                }`}
                                                                className="w-full h-32 object-cover rounded-lg"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeImage(
                                                                        index
                                                                    )
                                                                }
                                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <div className="mt-4">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageChange}
                                                    className="block w-full text-sm text-gray-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-full file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-primary file:text-white
                                                        hover:file:bg-primary-dark"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Description Section */}
                                <div className="border rounded-lg p-4">
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() =>
                                            toggleSection("description")
                                        }
                                    >
                                        <h3 className="text-lg font-semibold">
                                            Description
                                        </h3>
                                        {expandedSection === "description" ? (
                                            <ChevronUp className="h-5 w-5" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5" />
                                        )}
                                    </div>
                                    {expandedSection === "description" && (
                                        <div className="mt-4">
                                            <textarea
                                                name="description"
                                                value={data.description}
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                rows={4}
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                placeholder="Enter vehicle description..."
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        {processing
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
