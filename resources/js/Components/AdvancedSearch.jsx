import React, { useState } from "react";
import { Search, Car, Truck, Filter, X } from "lucide-react";
import { router } from "@inertiajs/react";
import { Button } from "./ui/button";

export const AdvancedSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        make: "",
        model: "",
        year_min: "",
        year_max: "",
        price_min: "",
        price_max: "",
        mileage_max: "",
        condition: "",
        location: "",
        search: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Remove empty filters
        const activeFilters = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "")
        );
        router.get(route("public.showroom.index"), activeFilters);
    };

    const clearFilters = () => {
        setFilters({
            make: "",
            model: "",
            year_min: "",
            year_max: "",
            price_min: "",
            price_max: "",
            mileage_max: "",
            condition: "",
            location: "",
            search: "",
        });
        router.get(route("public.showroom.index"));
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Advanced Search
                </h2>
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2"
                >
                    {isOpen ? (
                        <>
                            <X className="w-4 h-4" />
                            Hide Filters
                        </>
                    ) : (
                        <>
                            <Filter className="w-4 h-4" />
                            Show Filters
                        </>
                    )}
                </Button>
            </div>

            <div
                className={`transition-all duration-300 ease-in-out ${
                    isOpen
                        ? "max-h-screen opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                }`}
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Make and Model */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Make
                            </label>
                            <input
                                type="text"
                                name="make"
                                value={filters.make}
                                onChange={handleFilterChange}
                                placeholder="e.g., Toyota"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Model
                            </label>
                            <input
                                type="text"
                                name="model"
                                value={filters.model}
                                onChange={handleFilterChange}
                                placeholder="e.g., Corolla"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        {/* Year Range */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Year Range
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="year_min"
                                    value={filters.year_min}
                                    onChange={handleFilterChange}
                                    placeholder="Min"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                />
                                <input
                                    type="number"
                                    name="year_max"
                                    value={filters.year_max}
                                    onChange={handleFilterChange}
                                    placeholder="Max"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Price Range (KES)
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="price_min"
                                    value={filters.price_min}
                                    onChange={handleFilterChange}
                                    placeholder="Min"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                />
                                <input
                                    type="number"
                                    name="price_max"
                                    value={filters.price_max}
                                    onChange={handleFilterChange}
                                    placeholder="Max"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Mileage */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Maximum Mileage
                            </label>
                            <input
                                type="number"
                                name="mileage_max"
                                value={filters.mileage_max}
                                onChange={handleFilterChange}
                                placeholder="e.g., 50000"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        {/* Condition */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Condition
                            </label>
                            <select
                                name="condition"
                                value={filters.condition}
                                onChange={handleFilterChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                            >
                                <option value="">Select Condition</option>
                                <option value="new">New</option>
                                <option value="used">Used</option>
                                <option value="reconditioned">
                                    Reconditioned
                                </option>
                            </select>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                placeholder="e.g., Nairobi"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        {/* Search */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Keyword Search
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="search"
                                    value={filters.search}
                                    onChange={handleFilterChange}
                                    placeholder="Search by keyword"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-transparent dark:bg-gray-800 dark:text-white"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={clearFilters}
                            className="flex items-center gap-2"
                        >
                            <X className="w-4 h-4" />
                            Clear Filters
                        </Button>
                        <Button
                            type="submit"
                            className="flex items-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Search Vehicles
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
