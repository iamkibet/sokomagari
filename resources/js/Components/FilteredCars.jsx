import { router } from "@inertiajs/react";
import React, { useEffect } from "react";
import DetailedVehicleCard from "@/Components/DetailedVehicleCard";
import Loader from "./Loader";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FilteredCars = ({ cars, filters, onPageChange, onApplyFilters }) => {
    // Debug logging
    useEffect(() => {
        console.log("FilteredCars received data:", {
            cars,
            filters,
            hasData: cars?.data?.length > 0,
            pagination: {
                current_page: cars?.meta?.current_page,
                last_page: cars?.meta?.last_page,
                total: cars?.meta?.total,
                per_page: cars?.meta?.per_page,
            },
        });
    }, [cars, filters]);

    // Show loading state if cars is null or undefined
    if (!cars) {
        console.log("No cars data available");
        return (
            <div className="flex justify-center items-center h-64">
                <Loader />
            </div>
        );
    }

    // Show empty state if no cars
    if (!cars.data || cars.data.length === 0) {
        console.log("No cars found in data:", cars);
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
                    No vehicles found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Try adjusting your search filters
                </p>
                <button
                    onClick={() => onApplyFilters({ ...filters, page: 1 })}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
                >
                    Clear Filters
                </button>
            </div>
        );
    }

    const currentPage = cars.meta?.current_page || 1;
    const lastPage = cars.meta?.last_page || 1;
    const total = cars.meta?.total || 0;
    const perPage = cars.meta?.per_page || 12;

    // Calculate the range of items being shown
    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, total);

    // Generate pagination items
    const renderPagination = () => {
        if (lastPage <= 1) {
            console.log("Not rendering pagination because lastPage <= 1:", {
                lastPage,
            });
            return null;
        }

        console.log("Rendering pagination:", {
            currentPage,
            lastPage,
            total,
            perPage,
            startItem,
            endItem,
        });

        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        let endPage = Math.min(lastPage, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Always show first page
        if (startPage > 1) {
            pages.push(
                <button
                    key="first"
                    onClick={() => onPageChange(1)}
                    className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="start-ellipsis" className="px-2">
                        ...
                    </span>
                );
            }
        }

        // Add middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 rounded-md ${
                        currentPage === i
                            ? "bg-primary text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Always show last page
        if (endPage < lastPage) {
            if (endPage < lastPage - 1) {
                pages.push(
                    <span key="end-ellipsis" className="px-2">
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key="last"
                    onClick={() => onPageChange(lastPage)}
                    className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
                >
                    {lastPage}
                </button>
            );
        }

        return (
            <div className="flex items-center justify-between mt-8">
                <div className="text-sm text-gray-600">
                    Showing {startItem} to {endItem} of {total} results
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${
                            currentPage === 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    {pages}
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className={`p-2 rounded-md ${
                            currentPage === lastPage
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* Vehicle List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {cars.data.map((car) => (
                    <div key={car.id} className="flex">
                        <DetailedVehicleCard car={car} />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {renderPagination()}
        </div>
    );
};

export default FilteredCars;
