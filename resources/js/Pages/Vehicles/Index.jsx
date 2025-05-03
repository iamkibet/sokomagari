import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import SecondaryButton from "@/Components/SecondaryButton";
import { Filter } from "@/Components/svgs/Filter";
import GuestLayout from "@/Layouts/GuestLayout";
import VehicleList from "@/Components/VehicleList";
import { Head, router, usePage } from "@inertiajs/react";
import VehicleSlider from "@/Components/VehicleSlider";
import { Transition } from "@headlessui/react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";

const Index = () => {
    const { allCars,cars, results, filters = {} } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);
 
    useEffect(() => {
    }, [results, filters]);

   
    const [filterData, setFilterData] = useState({
        make: filters.make || "",
        model: filters.model || "",
        year_min: filters.year_min || "",
        year_max: filters.year_max || "",
        price_min: filters.price_min || "",
        price_max: filters.price_max || "",
        mileage_max: filters.mileage_max || "",
        condition: filters.condition || "",
        location: filters.location || "",
        search: filters.search || "",
        page: filters.page || 1,
    });

    // Handle all filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterData((prev) => ({ ...prev, [name]: value, page: 1 }));
    };

    // Handle budget filter buttons
    const handleBudgetFilter = (min, max, label) => {
        setFilterData((prev) => ({
            ...prev,
            price_min: min,
            price_max: max,
            page: 1,
        }));
        setActiveFilter(label);
    };

    // Clear all filters
    const ClearFilters = () => {
        setFilterData({
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
            page: 1,
        });
        setActiveFilter(null);
        router.get(route("public.vehicles.index"));
    };

    // Submit filters to backend
    const applyFilters = () => {
        setIsLoading(true);
        console.log("Applying filters:", filterData);
        router.get(route("public.vehicles.index"), filterData, {
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };

    // Handle page change
    const handlePageChange = (page) => {
        setFilterData((prev) => ({ ...prev, page }));
        router.get(
            route("public.vehicles.index"),
            { ...filterData, page },
            {
                preserveState: true,
            }
        );
    };

    // Breadcrumb arrow component
    const arrowRight = (
        <svg
            className="w-3 h-3 flex-shrink-0 mx-2.5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
            />
        </svg>
    );

    return (
        <GuestLayout>
            <Head>
                <title>Vehicles</title>
                <meta
                    name="description"
                    content="Kenya's premier automotive marketplace for quality cars and bikes"
                />
            </Head>

            <MaxWidthWrapper className="py-8 md:py-12 ">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24 transition-all duration-300">
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                                {/* Breadcrumbs */}
                                <nav className="mb-6 overflow-x-auto">
                                    <ol className="flex items-center text-sm">
                                        <li className="flex items-center">
                                            <a
                                                href="/"
                                                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                                            >
                                                Home
                                            </a>
                                            <ChevronRight className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" />
                                        </li>
                                        <li className="flex items-center">
                                            <a
                                                href="/vehicles"
                                                className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                                            >
                                                Vehicles
                                            </a>
                                            <ChevronRight className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" />
                                        </li>
                                        <li className="text-primary font-medium truncate">
                                            Available
                                        </li>
                                    </ol>
                                </nav>

                                {/* Search Input */}
                                <div className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="Search vehicles..."
                                        name="search"
                                        value={filterData.search}
                                        onChange={handleFilterChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                    />
                                    <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400 dark:text-gray-500" />
                                </div>

                                {/* Budget Filters */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                                        Price Range
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            {
                                                label: "0-500K",
                                                min: 0,
                                                max: 500000,
                                            },
                                            {
                                                label: "500K-1M",
                                                min: 500000,
                                                max: 1000000,
                                            },
                                            {
                                                label: "1M-2M",
                                                min: 1000000,
                                                max: 2000000,
                                            },
                                            {
                                                label: "2M-3M",
                                                min: 2000000,
                                                max: 3000000,
                                            },
                                            {
                                                label: "3M-4M",
                                                min: 3000000,
                                                max: 4000000,
                                            },
                                            {
                                                label: "4M-5M",
                                                min: 4000000,
                                                max: 5000000,
                                            },
                                            {
                                                label: "5M-10M",
                                                min: 5000000,
                                                max: 10000000,
                                            },
                                            {
                                                label: "10M+",
                                                min: 10000000,
                                                max: null,
                                            },
                                        ].map((b) => (
                                            <button
                                                key={b.label}
                                                onClick={() =>
                                                    handleBudgetFilter(
                                                        b.min,
                                                        b.max,
                                                        b.label
                                                    )
                                                }
                                                className={`text-sm px-4 py-2 rounded-md transition-colors ${
                                                    b.label === activeFilter
                                                        ? "bg-primary text-white"
                                                        : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200"
                                                }`}
                                            >
                                                {b.label}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={ClearFilters}
                                        className="w-full text-primary hover:text-primary-dark dark:text-primary-400 dark:hover:text-primary-300 font-medium text-sm pt-5"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>

                                {/* Advanced Filters */}
                                <div className="space-y-6">
                                    <div className="border-t dark:border-gray-700 pt-6">
                                        <button
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="w-full flex items-center justify-between text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-400"
                                        >
                                            <span className="font-medium">
                                                Advanced Filters
                                            </span>
                                            <ChevronDown
                                                className={`w-5 h-5 transition-transform ${
                                                    isOpen ? "rotate-180" : ""
                                                }`}
                                            />
                                        </button>

                                        <Transition
                                            show={isOpen}
                                            enter="transition-opacity duration-200"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="transition-opacity duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="mt-4 space-y-4">
                                                <select
                                                    name="make"
                                                    value={filterData.make}
                                                    onChange={handleFilterChange}
                                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                                >
                                                    <option value="">
                                                        Select Brand
                                                    </option>
                                                    <option value="Toyota">
                                                        Toyota
                                                    </option>
                                                    <option value="Honda">
                                                        Honda
                                                    </option>
                                                </select>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <input
                                                        type="number"
                                                        name="year_min"
                                                        placeholder="Min Year"
                                                        value={filterData.year_min}
                                                        onChange={handleFilterChange}
                                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="year_max"
                                                        placeholder="Max Year"
                                                        value={filterData.year_max}
                                                        onChange={handleFilterChange}
                                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                                    />
                                                </div>

                                                <div className="space-y-4">
                                                    <input
                                                        type="number"
                                                        name="price_min"
                                                        placeholder="Min Price (KES)"
                                                        value={filterData.price_min}
                                                        onChange={handleFilterChange}
                                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                                    />
                                                    <input
                                                        type="number"
                                                        name="price_max"
                                                        placeholder="Max Price (KES)"
                                                        value={filterData.price_max}
                                                        onChange={handleFilterChange}
                                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                                                    />
                                                </div>
                                            </div>
                                        </Transition>
                                    </div>

                                    <button
                                        onClick={applyFilters}
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-primary to-primary/70 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center disabled:opacity-50"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Applying Filters...
                                            </>
                                        ) : (
                                            "Search Vehicles"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:w-3/4">
                        <VehicleList vehicles={results} filters={filterData} />
                    </div>
                </div>

                {/* Featured Sections */}
                <div className="mt-16 space-y-16">
                    <VehicleSlider
                        title="Featured Cars"
                        items={cars.featured}
                        categories={[
                            { id: "all", label: "All" },
                            { id: "suv", label: "SUV" },
                            { id: "sedan", label: "Sedan" },
                            { id: "hatchback", label: "Hatchback" },
                            { id: "van", label: "Van" },
                        ]}
                        filterFn={(items, category) =>
                            category === "all" ? items : cars[category] || []
                        }
                        viewMoreLink="/vehicles"
                    />

                    <VehicleSlider
                        title="Fuel Type"
                        items={cars.petrol}
                        categories={[
                            { id: "petrol", label: "Petrol" },
                            { id: "diesel", label: "Diesel" },
                            { id: "electric", label: "Electric" },
                        ]}
                        filterFn={(items, category) =>
                            category === "all" ? items : cars[category] || []
                        }
                        viewMoreLink="/vehicles?fuel_type="
                    />

                    <VehicleSlider
                        title="Latest Cars"
                        items={cars.latest}
                        viewMoreLink="/vehicles"
                    />

                    <VehicleSlider
                        title="Affordable Cars"
                        items={cars.affordable}
                        viewMoreLink="/vehicles"
                    />
                </div>
            </MaxWidthWrapper>
        </GuestLayout>
    );
};

export default Index;
