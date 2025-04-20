import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import { ChevronDown, ChevronUp, AlertCircle } from "react-feather";
import StepProgress from "@/Components/StepProgress";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

// Edit component receives vehicle data from props
const Edit = ({ vehicle }) => {
    // Initialize form with vehicle data
    // Note: Ensure nested objects like comfort_features and safety_features are properly handled
    // If they might be null, provide default empty structures.
    const { data, setData, put, errors, processing } = useForm({
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
        images: [], // Images are handled separately; don't load existing image paths here directly for the input
        is_sell_on_behalf: vehicle.is_sell_on_behalf || false,
        owner_name: vehicle.owner_name || "",
        owner_email: vehicle.owner_email || "",
        owner_phone: vehicle.owner_phone || "",
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
        annual_insurance_cost: vehicle.annual_insurance_cost || "",
        highway_fuel_efficiency: vehicle.highway_fuel_efficiency || "",
        urban_fuel_efficiency: vehicle.urban_fuel_efficiency || "",
        _method: "put", // Method spoofing for Laravel PUT requests with FormData
    });

    // No localStorage logic needed for edit

    const [activeStep, setActiveStep] = useState(1);
    const [expandedSection, setExpandedSection] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);
    // Initialize preview for existing images (optional, but helpful UX)
    useEffect(() => {
        if (vehicle.image_urls && vehicle.image_urls.length > 0) {
            setPreviewImages(vehicle.image_urls);
        }
    }, [vehicle.image_urls]);

    const steps = [
        { id: 1, title: "Basic Details" },
        { id: 2, title: "Specifications" },
        { id: 3, title: "Running Costs" },
        { id: 4, title: "Media & Finalize" },
    ];

    // Handle image input changes and set preview URLs
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        setData("images", files); // Store the File objects
        setPreviewImages(files.map((file) => URL.createObjectURL(file))); // Create temporary URLs for preview
    };

    // Submit the form data to the server using PUT method
    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Append all data fields
        Object.keys(data).forEach((key) => {
            if (key === "images") {
                // Only append if new images were selected
                if (data.images.length > 0) {
                    data.images.forEach((image, index) => {
                        // Check if it's a File object before appending
                        if (image instanceof File) {
                            formData.append(`images[${index}]`, image);
                        }
                    });
                }
            } else if (
                key === "comfort_features" ||
                key === "safety_features"
            ) {
                // Handle nested objects
                Object.keys(data[key]).forEach((nestedKey) => {
                    formData.append(
                        `${key}[${nestedKey}]`,
                        data[key][nestedKey] === true
                            ? 1
                            : data[key][nestedKey] === false
                            ? 0
                            : data[key][nestedKey]
                    );
                });
            } else if (key !== "_method") {
                // Don't append _method manually if using FormData with Inertia put/post
                formData.append(
                    key,
                    data[key] === true ? 1 : data[key] === false ? 0 : data[key]
                );
            }
        });

        // Use 'put' for update, targeting the vehicle's update route
        put(route("dashboard.vehicles.update", { vehicle: vehicle.slug }), {
            data: formData, // Send FormData directly
            preserveScroll: true,
            forceFormData: true, // Ensure Inertia uses FormData
            onSuccess: () => {
                // Optionally reset form or redirect, maybe show success message
                console.log("Vehicle updated successfully!");
            },
            onError: (errors) => {
                console.error("Form submission errors:", errors);
                // Scroll to error section
                if (Object.keys(errors).length > 0) {
                    document.querySelector(".bg-red-50")?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            },
        });
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const SectionHeader = ({ title, section }) => (
        <div
            className="flex justify-between items-center p-5 bg-white cursor-pointer border-b border-gray-200"
            onClick={() => toggleSection(section)}
        >
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <div
                className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors ${
                    expandedSection === section
                        ? "bg-primary bg-opacity-10"
                        : ""
                }`}
            >
                {expandedSection === section ? (
                    <ChevronUp size={18} className="text-primary" />
                ) : (
                    <ChevronDown size={18} className="text-gray-500" />
                )}
            </div>
        </div>
    );

    // Reusable input renderer with inline error display
    const renderInput = (label, name, type = "text", options = {}) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                <input
                    type={type}
                    value={data[name] ?? ""} // Use nullish coalescing for safety
                    onChange={(e) =>
                        setData(
                            name,
                            type === "number" && e.target.value !== ""
                                ? Number(e.target.value)
                                : e.target.value
                        )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:ring-primary focus:border-primary"
                    {...options} // Spread additional options like 'required'
                />
            </label>
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={16} className="mr-1" /> {errors[name]}
                </p>
            )}
        </div>
    );

    const SelectField = ({
        label,
        name,
        value,
        onChange,
        options = [],
        error,
        required = false,
        containerClass = "",
        selectClass = "",
        ...rest
    }) => {
        return (
            <div className={`mb-4 ${containerClass}`}>
                <label
                    htmlFor={name}
                    className="block text-sm font-medium mb-1"
                >
                    {label}
                    <select
                        id={name}
                        name={name}
                        value={value ?? ""} // Use nullish coalescing
                        onChange={onChange}
                        required={required}
                        className={`w-full p-2 border rounded-md mt-1 ${selectClass} focus:ring-primary focus:border-primary`}
                        {...rest}
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                {error && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {error}
                    </p>
                )}
            </div>
        );
    };

    // Helper to get nested value from object
    const getNestedValue = (obj, path) => {
        // Check if obj is null or undefined before reducing
        if (!obj) return undefined;
        return path.split(".").reduce((o, p) => o?.[p], obj);
    };

    // Helper to set nested value in object state
    const setNestedValue = (path, value) => {
        setData((prev) => {
            const parts = path.split(".");
            // Deep clone the previous state to avoid mutation issues, especially with nested objects
            const newData = JSON.parse(JSON.stringify(prev));
            let current = newData;
            for (let i = 0; i < parts.length - 1; i++) {
                // Ensure parent objects exist
                if (!current[parts[i]]) {
                    current[parts[i]] = {};
                } else {
                    // Ensure we are working with a copy if it's already an object
                    current[parts[i]] = { ...current[parts[i]] };
                }
                current = current[parts[i]];
            }
            // Handle boolean conversion for checkboxes specifically
            if (typeof value === "boolean") {
                current[parts[parts.length - 1]] = value;
            } else {
                // Handle potential number conversion for numeric inputs if needed, or keep as string
                current[parts[parts.length - 1]] = value;
            }

            console.log(
                "Setting nested value:",
                path,
                value,
                "Result:",
                newData
            ); // Debug log
            return newData;
        });
    };

    // Reusable checkbox renderer
    const renderCheckbox = (label, path) => {
        const pathParts = path.split(".");
        // Construct the name attribute for form submission if needed, especially without FormData adjustments
        const fieldName = `${pathParts[0]}[${pathParts.slice(1).join("][")}]`;
        const isChecked = Boolean(getNestedValue(data, path)); // Ensure boolean conversion

        // Debugging check
        // console.log(`Rendering checkbox: ${label}, Path: ${path}, Checked: ${isChecked}, Value from data:`, getNestedValue(data, path));

        return (
            <label className="flex items-center space-x-3 p-2 hover:bg-white rounded cursor-pointer">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => setNestedValue(path, e.target.checked)} // Pass boolean directly
                    className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                    name={fieldName} // Optional if using FormData correctly
                />
                <span className="text-gray-700">{label}</span>
                {/* Display error for this specific checkbox if available */}
                {errors[path] && (
                    <p className="text-red-500 text-sm ml-2 flex items-center">
                        <AlertCircle size={16} className="mr-1" />{" "}
                        {errors[path]}
                    </p>
                )}
            </label>
        );
    };

    return (
        // Container and StepProgress remain similar
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
            <StepProgress activeStep={activeStep} steps={steps} />

            <form onSubmit={submit} className="space-y-6">
                {/* Step 1: Basic Details */}
                {activeStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Edit Basic Vehicle Information
                        </h2>
                        {/* Use renderInput and SelectField with data from useForm */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {renderInput("Make", "make", "text", {
                                required: true,
                            })}
                            {renderInput("Model", "model", "text", {
                                required: true,
                            })}
                            {renderInput("Year", "year", "number", {
                                required: true,
                            })}
                            {renderInput("Price (KES)", "price", "number", {
                                required: true,
                            })}
                            {renderInput("Mileage", "mileage", "number", {
                                required: true,
                            })}
                            {renderInput("Engine size", "engine_size", "text", {
                                required: true,
                            })}
                            {renderInput("torque", "torque", "text", {
                                required: true,
                            })}
                            {renderInput(
                                "acceleration",
                                "acceleration",
                                "text",
                                { required: true }
                            )}
                            {renderInput("Horse Power", "horse_power", "text", {
                                required: true,
                            })}

                            {/* Select fields - Ensure options match Create.jsx or adjust as needed */}
                            <SelectField
                                label="Type"
                                name="type"
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Select type" },
                                    { value: "Hatchback", label: "Hatchback" },
                                    {
                                        value: "Convertible",
                                        label: "Convertible",
                                    },
                                    { value: "Coupe", label: "Coupe" },
                                    { value: "Sedan", label: "Sedan" },
                                    { value: "SUV", label: "SUV" },
                                    { value: "Truck", label: "Truck" },
                                    { value: "Van", label: "Van" }, // Corrected value
                                ]}
                                error={errors.type}
                                required
                            />
                            <SelectField
                                label="Drive"
                                name="drive"
                                value={data.drive}
                                onChange={(e) =>
                                    setData("drive", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Select Drive" },
                                    { value: "2WD", label: "2WD" },
                                    { value: "4WD", label: "4WD" },
                                    { value: "AWD", label: "AWD" },
                                ]}
                                error={errors.drive}
                                required
                            />
                            <SelectField
                                label="Transmission"
                                name="transmission"
                                value={data.transmission}
                                onChange={(e) =>
                                    setData("transmission", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Select transmission" },
                                    { value: "Automatic", label: "Automatic" }, // Corrected value/label pair
                                    { value: "Manual", label: "Manual" }, // Corrected value/label pair
                                ]}
                                error={errors.transmission}
                                required
                            />
                            <SelectField
                                label="Fuel type"
                                name="fuel_type"
                                value={data.fuel_type}
                                onChange={(e) =>
                                    setData("fuel_type", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Select fuel type" },
                                    { value: "Diesel", label: "Diesel" }, // Corrected value/label pairs
                                    { value: "Petrol", label: "Petrol" },
                                    { value: "Electric", label: "Electric" },
                                    { value: "Hybrid", label: "Hybrid" }, // Added Hybrid
                                ]}
                                error={errors.fuel_type}
                                required
                            />
                            <SelectField
                                label="Condition"
                                name="condition"
                                value={data.condition}
                                onChange={(e) =>
                                    setData("condition", e.target.value)
                                }
                                options={[
                                    { value: "", label: "Select Condition" },
                                    { value: "new", label: "New" },
                                    { value: "used", label: "Used" },
                                ]}
                                error={errors.condition}
                                required
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Specifications */}
                {activeStep === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Edit Vehicle Specifications
                        </h2>
                        <div className="space-y-4">
                            {/* Comfort Features Section */}
                            <SectionHeader
                                title="Comfort Features"
                                section="comfort"
                            />
                            {expandedSection === "comfort" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                                    {/* Checkboxes */}
                                    {renderCheckbox(
                                        "Heated Seats",
                                        "comfort_features.heated_seats"
                                    )}
                                    {renderCheckbox(
                                        "Power Windows",
                                        "comfort_features.power_windows"
                                    )}
                                    {renderCheckbox(
                                        "Powered Tailgate",
                                        "comfort_features.powered_tailgate"
                                    )}
                                    {renderCheckbox(
                                        "Steering Controls",
                                        "comfort_features.steering_controls"
                                    )}
                                    {renderCheckbox(
                                        "Phone Connectivity",
                                        "comfort_features.phone_connectivity"
                                    )}
                                    {renderCheckbox(
                                        "Auto Start/Stop",
                                        "comfort_features.auto_start_stop"
                                    )}
                                    {renderCheckbox(
                                        "Keyless Entry",
                                        "comfort_features.keyless_entry"
                                    )}
                                    {renderCheckbox(
                                        "ISOFIX Anchors",
                                        "comfort_features.isofix_anchors"
                                    )}
                                    {renderCheckbox(
                                        "Paddle Shifts",
                                        "comfort_features.paddle_shifts"
                                    )}
                                    {renderCheckbox(
                                        "Apple CarPlay",
                                        "comfort_features.apple_carplay"
                                    )}
                                    {renderCheckbox(
                                        "FM Radio",
                                        "comfort_features.fm_radio"
                                    )}

                                    {/* Text Inputs/Selects for Comfort Features */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Trimming
                                        </label>
                                        <input
                                            type="text"
                                            value={
                                                data.comfort_features
                                                    ?.trimming ?? ""
                                            }
                                            onChange={(e) =>
                                                setNestedValue(
                                                    "comfort_features.trimming",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                            placeholder="e.g. Wood grain, Carbon fiber"
                                        />
                                        {errors[
                                            "comfort_features.trimming"
                                        ] && (
                                            <p className="text-red-500 text-sm mt-1 flex items-center">
                                                <AlertCircle
                                                    size={16}
                                                    className="mr-1"
                                                />
                                                {
                                                    errors[
                                                        "comfort_features.trimming"
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>

                                    <SelectField
                                        label="Seat Material"
                                        name="comfort_features.seat_material" // Use nested name for potential validation message matching
                                        value={
                                            data.comfort_features?.seat_material
                                        }
                                        onChange={(e) =>
                                            setNestedValue(
                                                "comfort_features.seat_material",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            {
                                                value: "",
                                                label: "Select Material",
                                            },
                                            {
                                                value: "Leather",
                                                label: "Leather",
                                            },
                                            {
                                                value: "Semi Leather",
                                                label: "Semi Leather",
                                            },
                                            {
                                                value: "Fabric",
                                                label: "Fabric",
                                            },
                                            // Add other materials if applicable
                                        ]}
                                        error={
                                            errors[
                                                "comfort_features.seat_material"
                                            ]
                                        }
                                        selectClass="focus:ring-primary focus:border-primary" // Ensure focus styles apply
                                    />

                                    {/* Add other text/select inputs for comfort features as needed */}
                                    <SelectField
                                        label="Air Conditioning"
                                        name="comfort_features.air_conditioning"
                                        value={
                                            data.comfort_features
                                                ?.air_conditioning
                                        }
                                        onChange={(e) =>
                                            setNestedValue(
                                                "comfort_features.air_conditioning",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            {
                                                value: "",
                                                label: "Select AC Type",
                                            },
                                            {
                                                value: "Manual",
                                                label: "Manual",
                                            },
                                            {
                                                value: "Automatic",
                                                label: "Automatic",
                                            },
                                            {
                                                value: "Climate Control",
                                                label: "Climate Control",
                                            },
                                        ]}
                                        error={
                                            errors[
                                                "comfort_features.air_conditioning"
                                            ]
                                        }
                                    />
                                    <SelectField
                                        label="Sound System"
                                        name="comfort_features.sound_system"
                                        value={
                                            data.comfort_features?.sound_system
                                        }
                                        onChange={(e) =>
                                            setNestedValue(
                                                "comfort_features.sound_system",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            {
                                                value: "",
                                                label: "Select Sound System",
                                            },
                                            {
                                                value: "Standard",
                                                label: "Standard",
                                            },
                                            {
                                                value: "Premium",
                                                label: "Premium",
                                            },
                                            {
                                                value: "Branded",
                                                label: "Branded (e.g., Bose)",
                                            },
                                        ]}
                                        error={
                                            errors[
                                                "comfort_features.sound_system"
                                            ]
                                        }
                                    />
                                    <SelectField
                                        label="Infotainment System"
                                        name="comfort_features.infotainment_system"
                                        value={
                                            data.comfort_features
                                                ?.infotainment_system
                                        }
                                        onChange={(e) =>
                                            setNestedValue(
                                                "comfort_features.infotainment_system",
                                                e.target.value
                                            )
                                        }
                                        options={[
                                            {
                                                value: "",
                                                label: "Select Infotainment",
                                            },
                                            { value: "Basic", label: "Basic" },
                                            {
                                                value: "Touchscreen",
                                                label: "Touchscreen",
                                            },
                                            {
                                                value: "Navigation",
                                                label: "Touchscreen with Navigation",
                                            },
                                        ]}
                                        error={
                                            errors[
                                                "comfort_features.infotainment_system"
                                            ]
                                        }
                                    />
                                </div>
                            )}

                            {/* Safety Features Section */}
                            <SectionHeader
                                title="Safety Features"
                                section="safety"
                            />
                            {expandedSection === "safety" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                                    {/* Checkboxes */}
                                    {renderCheckbox(
                                        "GPS Tracker",
                                        "safety_features.gps_tracker"
                                    )}
                                    {renderCheckbox(
                                        "SRS Airbags",
                                        "safety_features.srs_airbags"
                                    )}
                                    {renderCheckbox(
                                        "Reverse Camera",
                                        "safety_features.reverse_camera"
                                    )}
                                    {renderCheckbox(
                                        "Lane Assistance",
                                        "safety_features.lane_assistance"
                                    )}
                                    {renderCheckbox(
                                        "Parking Sensors",
                                        "safety_features.parking_sensors"
                                    )}
                                    {renderCheckbox(
                                        "Cruise Control",
                                        "safety_features.cruise_control"
                                    )}
                                    {renderCheckbox(
                                        "ABS",
                                        "safety_features.abs"
                                    )}
                                    {renderCheckbox(
                                        "Emergency Braking",
                                        "safety_features.emergency_braking"
                                    )}
                                    {renderCheckbox(
                                        "Immobilizer",
                                        "safety_features.immobilizer"
                                    )}
                                    {renderCheckbox(
                                        "Stability Control",
                                        "safety_features.stability_control"
                                    )}
                                    {renderCheckbox(
                                        "Tyre Pressure Monitor",
                                        "safety_features.tyre_pressure_monitor"
                                    )}
                                    {renderCheckbox(
                                        "Brake Force Distribution",
                                        "safety_features.brake_force_distribution"
                                    )}

                                    {/* Add other safety feature inputs if any */}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 3: Running Costs */}
                {activeStep === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Edit Running Costs
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Use renderInput for numeric cost fields */}
                            {renderInput(
                                "Annual Insurance (KES)",
                                "annual_insurance_cost",
                                "number"
                            )}
                            {renderInput(
                                "Highway Fuel Efficiency (km/l)",
                                "highway_fuel_efficiency",
                                "number",
                                { step: "0.1" }
                            )}
                            {renderInput(
                                "Urban Fuel Efficiency (km/l)",
                                "urban_fuel_efficiency",
                                "number",
                                { step: "0.1" }
                            )}
                        </div>
                    </div>
                )}

                {/* Step 4: Media & Finalize */}
                {activeStep === 4 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Edit Media & Final Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {/* Image Upload */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Upload New Vehicle Images (Replaces
                                        Existing)
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleImageChange}
                                            className="w-full p-2 border rounded-md mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
                                            accept="image/*"
                                            key={Date.now()} // Force re-render to clear selection
                                        />
                                    </label>
                                    {/* Image Previews */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {previewImages.map((src, index) => (
                                            <img
                                                key={index}
                                                src={src} // Can be existing URL or new Object URL
                                                alt={`Preview ${index + 1}`}
                                                className="w-24 h-24 object-cover rounded-md shadow-sm"
                                                onError={(e) =>
                                                    (e.target.style.display =
                                                        "none")
                                                } // Hide broken images
                                            />
                                        ))}
                                    </div>
                                    {errors.images && (
                                        <p className="text-red-500 text-sm mt-1">
                                            <AlertCircle
                                                size={16}
                                                className="mr-1 inline"
                                            />
                                            {errors.images}
                                        </p>
                                    )}
                                </div>
                                {/* Sell on Behalf */}
                                <div className="mb-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={Boolean(
                                                data.is_sell_on_behalf
                                            )}
                                            onChange={(e) =>
                                                setData(
                                                    "is_sell_on_behalf",
                                                    e.target.checked
                                                )
                                            }
                                            className="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                                        />
                                        <span>Sell on Behalf</span>
                                    </label>
                                </div>
                                {Boolean(data.is_sell_on_behalf) && (
                                    <div className="space-y-4 p-4 border rounded bg-gray-50">
                                        {renderInput(
                                            "Owner Name",
                                            "owner_name"
                                        )}
                                        {renderInput(
                                            "Owner Email",
                                            "owner_email",
                                            "email"
                                        )}
                                        {renderInput(
                                            "Owner Phone",
                                            "owner_phone"
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                {/* Description */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Description
                                        <textarea
                                            value={data.description ?? ""}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full p-2 border rounded-md mt-1 focus:ring-primary focus:border-primary"
                                            rows={6} // Increased rows for better editing
                                        />
                                    </label>
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            <AlertCircle
                                                size={16}
                                                className="mr-1 inline"
                                            />
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Controls */}
                <div className="flex justify-between mt-8">
                    {activeStep > 1 ? (
                        <button
                            type="button"
                            onClick={() => setActiveStep((prev) => prev - 1)}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition duration-150 ease-in-out"
                            disabled={processing}
                        >
                            Previous
                        </button>
                    ) : (
                        // Provide a placeholder or disable if needed on the first step
                        <div></div> // Keep layout consistent
                    )}

                    {activeStep < steps.length ? (
                        <button
                            type="button"
                            onClick={() => setActiveStep((prev) => prev + 1)}
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition duration-150 ease-in-out ml-auto"
                            disabled={processing}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className={`bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-150 ease-in-out ml-auto ${
                                processing
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={processing} // Disable button while processing
                        >
                            {processing ? "Updating..." : "Update Vehicle"}
                        </button>
                    )}
                </div>

                {/* Global Error Display */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-6 border border-red-200">
                        <h3 className="font-medium text-lg mb-2">
                            Please fix the following errors:
                        </h3>
                        <ul className="list-disc pl-6 space-y-1">
                            {Object.entries(errors).map(([field, error]) => (
                                // Make field names more readable if possible (e.g., 'comfort_features.trimming' -> 'Comfort Features Trimming')
                                <li key={field} className="text-sm">{`${field
                                    .replace(/_/g, " ")
                                    .replace(/\./g, " -> ")}: ${error}`}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
};

// Wrap the component with AuthenticatedLayout and pass vehicle data
export default function VehicleEditPage({ vehicle }) {
    const { props } = usePage(); // Access shared props if needed (like auth)
    const { user } = props.auth;

    return (
        <AuthenticatedLayout
            user={user} // Pass user to layout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {`Edit Vehicle: ${vehicle.make} ${vehicle.model} (${vehicle.year})`}
                </h2>
            }
        >
            {/* Pass the vehicle data down to the Edit component */}
            <Edit vehicle={vehicle} />
        </AuthenticatedLayout>
    );
}
