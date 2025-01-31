import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = () => {
    const { data, setData, post, errors, transform } = useForm({
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
        acceleration: "",
        description: "",
        images: [],
        is_sell_on_behalf: false,
        owner_name: "",
        owner_email: "",
        owner_phone: "",
    });

    const [previewImages, setPreviewImages] = useState([]);

    // Handle form transformation for file uploads
    transform(() => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === "images") {
                value.forEach((file) => formData.append("images[]", file));
            } else {
                const formattedValue =
                    key === "is_sell_on_behalf" ? (value ? 1 : 0) : value;

                formData.append(key, formattedValue?.toString() || "");
            }
        });

        return formData;
    });

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []).filter((file) =>
            file.type.startsWith("image/")
        );

        setData("images", files);
        setPreviewImages(files.map((file) => URL.createObjectURL(file)));
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("vehicles.store"), {
            preserveScroll: true,
        });
    };

    const renderInput = (name, label, type = "text", additionalProps = {}) => (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
                {label}
                <input
                    type={type}
                    name={name}
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
                    {...additionalProps}
                />
            </label>
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {renderInput("make", "Make", "text", {
                                required: true,
                            })}
                            {renderInput("model", "Model", "text", {
                                required: true,
                            })}
                            {renderInput("year", "Year", "number", {
                                required: true,
                            })}
                            {renderInput("price", "Price", "number", {
                                required: true,
                            })}
                            {renderInput("mileage", "Mileage", "number", {
                                required: true,
                            })}

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Condition
                                    <select
                                        name="condition"
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

                        {/* Right Column */}
                        <div className="space-y-4">
                            {renderInput("location", "Location")}
                            {renderInput("availability", "Availability")}
                            {renderInput("drive", "Drive")}
                            {renderInput(
                                "engine_size",
                                "Engine Size",
                                "number"
                            )}
                            {renderInput("fuel_type", "Fuel Type")}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Specifications */}
                        <div className="space-y-4">
                            {renderInput(
                                "horse_power",
                                "Horse Power",
                                "number"
                            )}
                            {renderInput("transmission", "Transmission")}
                            {renderInput("torque", "Torque", "number")}
                            {renderInput(
                                "acceleration",
                                "Acceleration",
                                "number",
                                { step: "0.01" }
                            )}
                        </div>

                        {/* Description and Owner Info */}
                        <div className="space-y-4">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">
                                    Description
                                    <textarea
                                        name="description"
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
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.description}
                                    </p>
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
                                {errors.is_sell_on_behalf && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.is_sell_on_behalf}
                                    </p>
                                )}
                            </div>

                            {data.is_sell_on_behalf && (
                                <div className="space-y-4">
                                    {renderInput("owner_name", "Owner Name")}
                                    {renderInput(
                                        "owner_email",
                                        "Owner Email",
                                        "email"
                                    )}
                                    {renderInput("owner_phone", "Owner Phone")}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Images
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="w-full p-2 border rounded-md mt-1"
                                accept="image/*"
                            />
                        </label>
                        {errors.images && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.images}
                            </p>
                        )}

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

                    {/* Form Errors */}
                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                            <h3 className="font-medium">Validation Errors:</h3>
                            <ul className="list-disc pl-5 mt-1">
                                {Object.values(errors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Create Vehicle
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
