import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import SecondaryButton from "@/Components/SecondaryButton";
import { Filter } from "@/Components/svgs/Filter";
import GuestLayout from "@/Layouts/GuestLayout";
import VehicleList from "@/Components/VehicleList";
import { Head, router, usePage } from "@inertiajs/react";
import VehicleSlider from "@/Components/VehicleSlider";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const Index = () => {
    const { allCars, results, filters = {} } = usePage().props;
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState(null);

    // Debug logging
    useEffect(() => {
        console.log("Index page received data:", {
            results,
            filters,
            hasResults: !!results,
            resultsData: results?.data,
            pagination: {
                current_page: results?.current_page,
                last_page: results?.last_page,
                total: results?.total,
                per_page: results?.per_page,
            },
        });
    }, [results, filters]);

    // Initialize filter state with received filters or defaults
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
                    content="Kenya's best car rental and purchase platform"
                />
            </Head>

            <MaxWidthWrapper className="flex py-10 overflow-visible">
                {/* Filters Sidebar */}
                <div className="flex w-full">
                    <div className="w-1/4 sticky top-36 self-start">
                        {/* Breadcrumbs */}
                        <ol className="flex items-center whitespace-nowrap">
                            <li className="flex items-center text-sm text-gray-800">
                                <a href="/" className="cursor-pointer">
                                    Home
                                </a>{" "}
                                {arrowRight}
                            </li>
                            <li className="flex items-center text-sm text-gray-800">
                                <a href="/vehicles" className="cursor-pointer">
                                    Vehicles
                                </a>{" "}
                                {arrowRight}
                            </li>
                            <li className="text-sm font-semibold text-gray-800 truncate">
                                <a href="/vehicles" className="cursor-pointer">
                                    Available
                                </a>
                            </li>
                        </ol>

                        {/* Search Input */}
                        <div className="flex flex-col gap-1 py-6">
                            <h1 className="font-bold text-sm text-gray-800">
                                Search Vehicle
                            </h1>
                            <input
                                type="text"
                                placeholder="Search Bikes, Cars..."
                                name="search"
                                value={filterData.search}
                                onChange={handleFilterChange}
                                className="w-full p-4 border rounded-md"
                            />
                        </div>

                        {/* Budget Filters */}
                        <h1 className="text-xl font-bold text-gray-800 mb-4">
                            Filter by Budget
                        </h1>
                        <ul className="flex-wrap sm:flex gap-2">
                            {[
                                { label: "0-500K", min: 0, max: 500000 },
                                { label: "500K-1M", min: 500000, max: 1000000 },
                                { label: "1M-2M", min: 1000000, max: 2000000 },
                                { label: "2M-3M", min: 2000000, max: 3000000 },
                                { label: "3M-4M", min: 3000000, max: 4000000 },
                                { label: "4M-5M", min: 4000000, max: 5000000 },
                                { label: "5M-10M", min: 5000000, max: 10000000 },
                                { label: "Above 10M", min: 10000000, max: null },
                            ].map((b) => (
                                <li
                                    key={b.label}
                                    className={`${
                                        b.label === activeFilter
                                            ? "bg-primary text-white"
                                            : "bg-gray-200"
                                    } cursor-pointer border py-3 px-4`}
                                    onClick={() =>
                                        handleBudgetFilter(b.min, b.max, b.label)
                                    }
                                >
                                    {b.label}
                                </li>
                            ))}
                        </ul>

                        {/* Advanced Filters */}
                        <SecondaryButton className="my-4" onClick={ClearFilters}>
                            Clear Filters
                        </SecondaryButton>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="font-bold flex w-full justify-between border-b py-1"
                        >
                            {isOpen ? "Hide Advanced Search" : "Click here for Advanced Search"}
                            <div className="h-8 w-8">
                                <Filter />
                            </div>
                        </button>

                        {isOpen && (
                            <div className="mt-4 space-y-2">
                                <select
                                    name="make"
                                    value={filterData.make}
                                    onChange={handleFilterChange}
                                    className="w-full p-2 mb-2"
                                >
                                    <option value="">Brand</option>
                                    <option value="Toyota">Toyota</option>
                                    <option value="Honda">Honda</option>
                                </select>

                                <input
                                    type="number"
                                    name="year_min"
                                    placeholder="Min Year"
                                    value={filterData.year_min}
                                    onChange={handleFilterChange}
                                    className="w-full p-2"
                                />

                                <input
                                    type="number"
                                    name="year_max"
                                    placeholder="Max Year"
                                    value={filterData.year_max}
                                    onChange={handleFilterChange}
                                    className="w-full p-2"
                                />

                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        name="price_min"
                                        placeholder="Min Price (KES)"
                                        value={filterData.price_min}
                                        onChange={handleFilterChange}
                                        className="w-full p-2"
                                    />

                                    <input
                                        type="number"
                                        name="price_max"
                                        placeholder="Max Price (KES)"
                                        value={filterData.price_max}
                                        onChange={handleFilterChange}
                                        className="w-full p-2"
                                    />

                                    <input
                                        type="number"
                                        name="mileage_max"
                                        placeholder="Max Mileage (km)"
                                        value={filterData.mileage_max}
                                        onChange={handleFilterChange}
                                        className="w-full p-2"
                                    />

                                    <select
                                        name="condition"
                                        value={filterData.condition}
                                        onChange={handleFilterChange}
                                        className="w-full p-2"
                                    >
                                        <option value="">Condition</option>
                                        <option value="new">New</option>
                                        <option value="used">Used</option>
                                    </select>

                                    <input
                                        type="text"
                                        name="location"
                                        placeholder="Location"
                                        value={filterData.location}
                                        onChange={handleFilterChange}
                                        className="w-full p-2"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Search Button */}
                        <button
                            onClick={applyFilters}
                            disabled={isLoading}
                            className={`px-4 py-3 bg-black text-white w-full mt-4 font-bold text-xl ${
                                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-black/70"
                            }`}
                        >
                            {isLoading ? "Searching..." : "Search"}
                        </button>
                    </div>
                    {/* Results Section */}
                    <div className="w-3/4 pl-6">
                        <VehicleList vehicles={results} filters={filterData} />
                    </div>
                </div>
            </MaxWidthWrapper>
            {/* Featured Sections */}
            <div className="mt-12 space-y-12">
                <VehicleSlider
                    title="Latest Cars"
                    items={results.data.filter((car) => car.year > 2021)}
                    categories={[
                        { id: "all", label: "All" },
                        { id: "suv", label: "SUV" },
                        { id: "sedan", label: "Sedan" },
                    ]}
                    viewMoreLink="/vehicles?year_min=2022"
                />

                <VehicleSlider
                    title="Affordable Options"
                    items={results.data.filter((car) => car.price < 2000000)}
                    categories={[
                        { id: "all", label: "All" },
                        { id: "suv", label: "SUV" },
                        { id: "sedan", label: "Sedan" },
                    ]}
                    viewMoreLink="/vehicles?price_max=2000000"
                />
            </div>
        </GuestLayout>
    );
};

export default Index;