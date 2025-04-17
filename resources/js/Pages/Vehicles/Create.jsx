import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { ChevronDown, ChevronUp } from "react-feather";
import StepProgress from "@/Components/StepProgress";

const LOCAL_STORAGE_KEY = "vehicleCreateForm";

const Create = () => {
    const { data, setData, post, errors } = useForm({
        // Basic Details
        make: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        condition: "",
        location: "Nairobi, Kenya",
        availability: "Available",
        drive: "",
        engine_size: "",
        fuel_type: "",
        horse_power: "",
        transmission: "",
        torque: "",
        type: "",
        acceleration: "",
        description: "",
        images: [],
        is_sell_on_behalf: false,
        owner_name: "",
        owner_email: "",
        owner_phone: "",
        // Specifications (all stored in one nested object)
        comfort_features: {
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
        safety_features: {
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
        // Running Costs
        annual_insurance_cost: "",
        highway_fuel_efficiency: "",
        urban_fuel_efficiency: "",
    });

    // Load saved data from localStorage only once on mount
    useEffect(() => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);

                Object.keys(parsedData).forEach((key) => {
                    setData(key, parsedData[key]);
                });
            } catch (error) {
                console.error("Error parsing saved form data:", error);
            }
        }
    }, []);

    // Save form data on every change
    useEffect(() => {
        const { images, ...dataToSave } = data;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    }, [data]);

    const [activeStep, setActiveStep] = useState(1);
    const [expandedSection, setExpandedSection] = useState(null);
    const [previewImages, setPreviewImages] = useState([]);

    const steps = [
        { id: 1, title: "Basic Details" },
        { id: 2, title: "Specifications" },
        { id: 3, title: "Running Costs" },
        { id: 4, title: "Media & Finalize" },
    ];

    // Handle image input changes and set preview URLs
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        setData("images", files);
        setPreviewImages(files.map((file) => URL.createObjectURL(file)));
    };

    // Submit the form data to the server
    const submit = (e) => {
        e.preventDefault();
        post(route("vehicles.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setActiveStep(1);
                //clear local storage
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            },
        });
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const SectionHeader = ({ title, section }) => (
        <div
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => toggleSection(section)}
        >
            <h3 className="text-lg font-semibold">{title}</h3>
            {expandedSection === section ? <ChevronUp /> : <ChevronDown />}
        </div>
    );

    // Reusable input renderer with inline error display
    const renderInput = (label, name, type = "text", options = {}) => (
        <AuthenticatedLayout className="mb-4">
            <label className="block text-sm font-medium mb-1">
                {label}
                <input
                    type={type}
                    value={data[name]}
                    onChange={(e) =>
                        setData(
                            name,
                            type === "number"
                                ? Number(e.target.value)
                                : e.target.value
                        )
                    }
                    className="w-full p-2 border rounded-md mt-1"
                    {...options}
                />
            </label>
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
        </AuthenticatedLayout>
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
                        value={value}
                        onChange={onChange}
                        required={required}
                        className={`w-full p-2 border rounded-md mt-1 ${selectClass}`}
                        {...rest}
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        );
    };

    // Reusable checkbox renderer
    const renderCheckbox = (label, path) => {
        const pathParts = path.split(".");
        const fieldName = `${pathParts[0]}[${pathParts.slice(1).join("][")}]`;

        return (
            <label className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                <input
                    type="checkbox"
                    checked={getNestedValue(data, path)}
                    onChange={(e) => setNestedValue(path, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-primary"
                    name={fieldName}
                />
                <span>{label}</span>
            </label>
        );
    };

    // Helper to get nested value from object
    const getNestedValue = (obj, path) =>
        path.split(".").reduce((o, p) => o?.[p], obj);

    // Helper to set nested value in object state
    const setNestedValue = (path, value) => {
        setData((prev) => {
            const parts = path.split(".");
            const newData = { ...prev };
            let current = newData;
            for (let i = 0; i < parts.length - 1; i++) {
                current[parts[i]] = { ...current[parts[i]] };
                current = current[parts[i]];
            }
            current[parts[parts.length - 1]] = value;
            return newData;
        });
    };

    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
            <StepProgress activeStep={activeStep} steps={steps} />

            <form onSubmit={submit} className="space-y-6">
                {/* Step 1: Basic Details */}
                {activeStep === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Basic Vehicle Information
                        </h2>
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
                            {renderInput(
                                "Engine size",
                                "engine_size",
                                "number",
                                { required: true }
                            )}

                            {renderInput("torque", "torque", "number", {
                                required: true,
                            })}
                            {renderInput(
                                "acceleration",
                                "acceleration",
                                "number",
                                {
                                    required: true,
                                }
                            )}
                            {renderInput(
                                "Horse Power",
                                "horse_power",
                                "number",
                                {
                                    required: true,
                                }
                            )}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Type
                                    <select
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        className="w-full p-2 border rounded-md mt-1"
                                        required
                                    >
                                        <option value="">Select type</option>
                                        <option value="Hatchback">
                                            Hatchback
                                        </option>
                                        <option value="Convertible">
                                            Convertible
                                        </option>
                                        <option value="Coupe">Coupe</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Truck">Truck</option>
                                        <option value="Coupe">Coupe</option>
                                        <option
                                            value="
                                        van"
                                        >
                                            van
                                        </option>
                                    </select>
                                </label>
                                {errors.type && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.type}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Drive
                                    <select
                                        value={data.drive}
                                        onChange={(e) =>
                                            setData("drive", e.target.value)
                                        }
                                        className="w-full p-2 border rounded-md mt-1"
                                        required
                                    >
                                        <option value="">Select Drive</option>
                                        <option value="2WD">2WD</option>
                                        <option value="4WD">4WD</option>
                                        <option value="AWD">AWD</option>
                                    </select>
                                </label>
                                {errors.drive && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.drive}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Transmission
                                    <select
                                        value={data.transmission}
                                        onChange={(e) =>
                                            setData(
                                                "transmission",
                                                e.target.value
                                            )
                                        }
                                        className="w-full p-2 border rounded-md mt-1"
                                        required
                                    >
                                        <option value="">
                                            Select transmission
                                        </option>
                                        <option value="Petrol">
                                            Automatic
                                        </option>
                                        <option value="Electric">Manual</option>
                                    </select>
                                </label>
                                {errors.transmission && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.transmission}
                                    </p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Fuel type
                                    <select
                                        value={data.fuel_type}
                                        onChange={(e) =>
                                            setData("fuel_type", e.target.value)
                                        }
                                        className="w-full p-2 border rounded-md mt-1"
                                        required
                                    >
                                        <option value="">
                                            Select fuel type
                                        </option>
                                        <option value="Petrol">Diesel</option>
                                        <option value="Diesel">Petrol</option>
                                        <option value="Electric">
                                            Electric
                                        </option>
                                    </select>
                                </label>
                                {errors.fuel_type && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.fuel_type}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Condition
                                    <select
                                        value={data.condition}
                                        onChange={(e) =>
                                            setData("condition", e.target.value)
                                        }
                                        className="w-full p-2 border rounded-md mt-1"
                                        required
                                    >
                                        <option value="">
                                            Select Condition
                                        </option>
                                        <option value="new">New</option>
                                        <option value="used">Used</option>
                                    </select>
                                </label>
                                {errors.condition && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.condition}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Specifications */}
                {activeStep === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Vehicle Specifications
                        </h2>
                        <div className="space-y-4">
                            <SectionHeader
                                title="Comfort Features"
                                section="comfort"
                            />
                            {expandedSection === "comfort" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
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
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">
                                            Trimming
                                        </label>
                                        <input
                                            type="text"
                                            name="comfort_features.trimming"
                                            value={
                                                data.comfort_features.trimming
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "comfort_features.trimming",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full p-2 border rounded"
                                        />
                                        {errors[
                                            "comfort_features.trimming"
                                        ] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors[
                                                        "comfort_features.trimming"
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium">
                                            Seat Material
                                        </label>
                                        <select
                                            value={
                                                data.comfort_features
                                                    .seat_material
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "comfort_features.seat_material",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full p-2 border rounded"
                                        >
                                            <option>Select Material</option>
                                            <option value="Leather">
                                                Leather
                                            </option>
                                            <option value="Semi Leather">
                                                Semi Leather
                                            </option>
                                            <option value="Fabric">
                                                Fabric
                                            </option>
                                        </select>
                                        {errors[
                                            "comfort_features.seat_material"
                                        ] && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {
                                                    errors[
                                                        "comfort_features.seat_material"
                                                    ]
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <SectionHeader
                                title="Safety Features"
                                section="safety"
                            />
                            {expandedSection === "safety" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                                    {renderCheckbox(
                                        "GPS Tracker",
                                        "safety_features.gps_tracker"
                                    )}
                                    {renderCheckbox(
                                        "Airbags",
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
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 3: Running Costs */}
                {activeStep === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Running Costs
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <label className="block font-medium mb-2">
                                    Annual Insurance (KES)
                                </label>
                                <input
                                    type="number"
                                    name="annual_insurance_cost"
                                    value={data.annual_insurance_cost}
                                    onChange={(e) =>
                                        setData(
                                            "annual_insurance_cost",
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-2 border rounded"
                                />
                                {errors.annual_insurance_cost && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.annual_insurance_cost}
                                    </p>
                                )}
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <label className="block font-medium mb-2">
                                    Highway Fuel Efficiency (km/l)
                                </label>
                                <input
                                    type="number"
                                    name="highway_fuel_efficiency"
                                    step="0.1"
                                    value={data.highway_fuel_efficiency}
                                    onChange={(e) =>
                                        setData(
                                            "highway_fuel_efficiency",
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-2 border rounded"
                                />
                                {errors.highway_fuel_efficiency && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.highway_fuel_efficiency}
                                    </p>
                                )}
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <label className="block font-medium mb-2">
                                    Urban Fuel Efficiency (km/l)
                                </label>
                                <input
                                    type="number"
                                    name="urban_fuel_efficiency"
                                    step="0.1"
                                    value={data.urban_fuel_efficiency}
                                    onChange={(e) =>
                                        setData(
                                            "urban_fuel_efficiency",
                                            e.target.value
                                        )
                                    }
                                    className="w-full p-2 border rounded"
                                />
                                {errors.urban_fuel_efficiency && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.urban_fuel_efficiency}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Media & Finalize */}
                {activeStep === 4 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-4">
                            Media & Final Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Vehicle Images
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleImageChange}
                                            className="w-full p-2 border rounded-md mt-1"
                                            accept="image/*"
                                        />
                                    </label>
                                    {previewImages.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {previewImages.map((src, index) => (
                                                <img
                                                    key={index}
                                                    src={src}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-24 h-24 object-cover rounded-md shadow-sm"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={data.is_sell_on_behalf}
                                            onChange={(e) =>
                                                setData(
                                                    "is_sell_on_behalf",
                                                    e.target.checked
                                                )
                                            }
                                            className="form-checkbox h-5 w-5 text-primary"
                                        />
                                        <span>Sell on Behalf</span>
                                    </label>
                                </div>
                                {data.is_sell_on_behalf && (
                                    <div className="space-y-4">
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
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Description
                                        <textarea
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            className="w-full p-2 border rounded-md mt-1"
                                            rows={4}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Controls */}
                <div className="flex justify-between mt-8">
                    {activeStep > 1 && (
                        <button
                            type="button"
                            onClick={() => setActiveStep((prev) => prev - 1)}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
                        >
                            Previous
                        </button>
                    )}
                    {activeStep < steps.length ? (
                        <button
                            type="button"
                            onClick={() => setActiveStep((prev) => prev + 1)}
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark ml-auto"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 ml-auto"
                        >
                            Submit Vehicle
                        </button>
                    )}
                </div>

                {/* Global Error Display */}
                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-4">
                        <h3 className="font-medium">
                            Please fix the following errors:
                        </h3>
                        <ul className="list-disc pl-5 mt-1">
                            {Object.entries(errors).map(([field, error]) => (
                                <li key={field}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Create;
