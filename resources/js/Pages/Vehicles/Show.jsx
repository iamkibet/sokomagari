import React from "react";
import { usePage } from "@inertiajs/react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";

const Show = () => {
    const { vehicle } = usePage().props;

    // Debug the images data
    console.log("Vehicle Images:", vehicle.images);

    

    const images = vehicle.image_urls
        ? vehicle.image_urls.map((image) => ({
              original: image,
              thumbnail: image,
          }))
        : [];


    // Format price with commas
    const formattedPrice = vehicle.price.toLocaleString();

    // Render vehicle details in a consistent way
    const renderDetail = (label, value) => (
        <div className="mb-3">
            <strong className="text-gray-700">{label}:</strong>{" "}
            <span className="text-gray-900">{value}</span>
        </div>
    );

    return (
        <GuestLayout>
            <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
                <div className="flex flex-wrap -mx-4">
                    {/* Image Gallery Section */}
                    <div className="w-full xl:w-8/12 p-4">
                        <div className="sticky top-4">
                            <ImageGallery
                                items={images}
                                showThumbnails={true}
                                showPlayButton={false}
                                showFullscreenButton={true}
                                showNav={true}
                                lazyLoad={true}
                                additionalClass="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>

                    {/* Vehicle Details Section */}
                    <div className="w-full xl:w-4/12 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h1 className="text-3xl font-bold mb-4">
                                {vehicle.make} {vehicle.model}
                            </h1>

                            {/* Basic Details */}
                            <div className="mb-6">
                                {renderDetail("Year", vehicle.year)}
                                {renderDetail("Price", `$${formattedPrice}`)}
                                {renderDetail(
                                    "Mileage",
                                    `${vehicle.mileage} miles`
                                )}
                                {renderDetail("Condition", vehicle.condition)}
                                {renderDetail("Location", vehicle.location)}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">
                                    Description
                                </h2>
                                <p className="text-gray-700">
                                    {vehicle.description}
                                </p>
                            </div>

                            {/* Additional Details */}
                            <div className="mb-6">
                                <h2 className="text-xl font-semibold mb-2">
                                    Specifications
                                </h2>
                                {renderDetail("Drive", vehicle.drive)}
                                {renderDetail(
                                    "Engine Size",
                                    `${vehicle.engine_size} CC`
                                )}
                                {renderDetail("Fuel Type", vehicle.fuel_type)}
                                {renderDetail(
                                    "Horse Power",
                                    vehicle.horse_power
                                )}
                                {renderDetail(
                                    "Transmission",
                                    vehicle.transmission
                                )}
                                {renderDetail("Torque", `${vehicle.torque} Nm`)}
                                {renderDetail(
                                    "Acceleration",
                                    `${vehicle.acceleration} sec (0-100 kph)`
                                )}
                            </div>

                            {/* Sell on Behalf Details */}
                            {vehicle.is_sell_on_behalf && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h2 className="text-xl font-semibold mb-2">
                                        Owner Information
                                    </h2>
                                    {renderDetail(
                                        "Owner Name",
                                        vehicle.owner_name
                                    )}
                                    {renderDetail(
                                        "Owner Email",
                                        vehicle.owner_email
                                    )}
                                    {renderDetail(
                                        "Owner Phone",
                                        vehicle.owner_phone
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Show;
