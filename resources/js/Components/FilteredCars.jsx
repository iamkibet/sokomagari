import { router } from "@inertiajs/react";
import React from "react";
import DetailedVehicleCard from "@/Components/DetailedVehicleCard";
import Loader from "./Loader";

const FilteredCars = ({ cars }) => {
    
    const currentPage = cars?.current_page || 1;
    const lastPage = cars?.last_page || 1;
    const totalPages = cars?.last_page || 1;

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(lastPage, currentPage + 1);

    const links = [];

    // Previous Page Link
    if (currentPage > 1) {
        links.push({
            url: cars?.prev_page_url,
            label: "&laquo; Previous",
            active: false,
        });
    }

    // Page Number Links
    for (let i = startPage; i <= endPage; i++) {
        links.push({
            label: i.toString(),
            url: cars?.links?.find((link) => link.label === i.toString())?.url,
            active: i === currentPage,
        });
    }

    // Add next link if needed
    if (currentPage < totalPages) {
        links.push({
            label: "Next &raquo;",
            url: cars?.next_page_url,
        });
    }

    if (!cars) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    if (!cars || cars.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                <svg
                    className="w-12 h-12 dark:text-gray-400 text-gray-700"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="200px"
                    width="200px"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="File_Off">
                        <g>
                            <path d="M4,3.308a.5.5,0,0,0-.7.71l.76.76v14.67a2.5,2.5,0,0,0,2.5,2.5H17.44a2.476,2.476,0,0,0,2.28-1.51l.28.28c.45.45,1.16-.26.7-.71Zm14.92,16.33a1.492,1.492,0,0,1-1.48,1.31H6.56a1.5,1.5,0,0,1-1.5-1.5V5.778Z"></path>
                            <path d="M13.38,3.088v2.92a2.5,2.5,0,0,0,2.5,2.5h3.07l-.01,6.7a.5.5,0,0,0,1,0V8.538a2.057,2.057,0,0,0-.75-1.47c-1.3-1.26-2.59-2.53-3.89-3.8a3.924,3.924,0,0,0-1.41-1.13,6.523,6.523,0,0,0-1.71-.06H6.81a.5.5,0,0,0,0,1Zm4.83,4.42H15.88a1.5,1.5,0,0,1-1.5-1.5V3.768Z"></path>
                        </g>
                    </g>
                </svg>
                <h3 className="text-xl font-medium mt-4 text-gray-700 dark:text-gray-200">
                    Oops! No vehicles in this category
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    The items you are looking for could not be located.
                </p>
                <button
                    className="flex items-center my-3 bg-primary py-2 px-4 rounded-md text-white text-lg"
                    onClick={() => router.get("/vehicles")}
                >
                    Browse More Vehicles
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* Vehicle List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {cars.map((car) => (
                    <div key={car.id} className="flex">
                        <DetailedVehicleCard car={car} />
                    </div>
                ))}
            </div>

            {/* Pagination Links */}
            <div className="flex justify-center mt-4 space-x-2">
                {links.map((link, index) => (
                    <button
                        key={index}
                        disabled={!link.url}
                        onClick={() =>
                            router.get(link.url, {}, { preserveState: true })
                        }
                        className={`px-4 py-2 text-sm rounded-md ${
                            link.active
                                ? "bg-primary text-white hover:bg-primary-dark"
                                : !link.url
                                ? "bg-gray-200 text-gray-500"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                    >
                        {link.label === "Next &raquo;"
                            ? "Next"
                            : link.label === "&laquo; Previous"
                            ? "Previous"
                            : link.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilteredCars;
