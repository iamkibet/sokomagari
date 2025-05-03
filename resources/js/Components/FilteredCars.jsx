import { router } from "@inertiajs/react";
import React, { useEffect } from "react";
import DetailedVehicleCard from "@/Components/DetailedVehicleCard";
import Loader from "./Loader";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FilteredCars = ({ cars, filters, onPageChange, onApplyFilters }) => {
   
    if (!cars) {
        
        return (
            <div className="flex justify-center items-center h-64">
                <Loader />
            </div>
        );
    }

    // Show empty state if no cars
    if (!cars.data || cars.data.length === 0) {
        
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <svg
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    No vehicles found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Try adjusting your search filters
                </p>
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
    const handlePageChange = (page) => {
        // Create a clean filters object with only non-empty values
        const cleanFilters = Object.entries(filters).reduce(
            (acc, [key, value]) => {
                if (value !== null && value !== undefined && value !== "") {
                    acc[key] = value;
                }
                return acc;
            },
            {}
        );

        // Always include the page parameter
        cleanFilters.page = page;

        // Use router to navigate with the new filters
        router.get(route("vehicles.index"), cleanFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const renderPagination = () => {
        if (lastPage <= 1) return null;

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

        // First page button
        if (startPage > 1) {
            pages.push(
                <button
                    key="first"
                    onClick={() => handlePageChange(1)}
                    className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                pages.push(
                    <span
                        key="ellipsis1"
                        className="px-3 py-1 text-sm text-gray-500"
                    >
                        ...
                    </span>
                );
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                        i === currentPage
                            ? "bg-primary text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                >
                    {i}
                </button>
            );
        }

        // Last page button
        if (endPage < lastPage) {
            if (endPage < lastPage - 1) {
                pages.push(
                    <span
                        key="ellipsis2"
                        className="px-3 py-1 text-sm text-gray-500"
                    >
                        ...
                    </span>
                );
            }
            pages.push(
                <button
                    key="last"
                    onClick={() => handlePageChange(lastPage)}
                    className="px-3 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    {lastPage}
                </button>
            );
        }

        return (
            <div className="flex items-center justify-between mt-8">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    Showing {startItem} to {endItem} of {total} results
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-md ${
                            currentPage === 1
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    {pages}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                        className={`p-2 rounded-md ${
                            currentPage === lastPage
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
