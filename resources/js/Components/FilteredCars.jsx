import React, { useState } from "react";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import SecondaryButton from "@/Components/SecondaryButton";
import { Filter } from "@/Components/svgs/Filter";
import GuestLayout from "@/Layouts/GuestLayout";
import FilteredCars from "@/Components/FilteredCars";
import { router, usePage } from "@inertiajs/react";

const Index = () => {
    const { vehicles, filters } = usePage().props;

    // filters local state
    const [filterData, setFilterData] = useState({
        make: filters.make || "",
        model: filters.model || "",
        year: filters.year || "",
        price_min: filters.price_min || "",
        price_max: filters.price_max || "",
        mileage_max: filters.mileage_max || "",
        condition: filters.condition || "",
        location: filters.location || "",
        search: "",
    });

    // handling filter change
    const handleFilterChange = (e) => {
        setFilterData({
            ...filterData,
            [e.target.name]: e.target.value,
        });
    };

    // handling search input
    const handleSearch = (e) => {
        setFilterData({
            ...filterData,
            search: e.target.value,
        });
        router.get(
            route("vehicles.index"),
            {
                search: e.target.value,
            },
            {
                preserveState: true,
            }
        );
    };

    // submitting the filters
    const applyFilters = () => {
        router.get(route("vehicles.index"), filterData, {
            preserveState: true,
        });
    };

    const [isOpen, setIsOpen] = useState(false);

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
            <MaxWidthWrapper className="flex py-10">
                <div className="w-1/4">
                    <ol className="flex items-center whitespace-nowrap">
                        <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                            Home {arrowRight}
                        </li>
                        <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                            Vehicles {arrowRight}
                        </li>
                        <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400">
                            Available
                        </li>
                    </ol>
                    <div className="flex flex-col gap-1 py-6">
                        <h1 className="font-bold text-sm text-gray-800 dark:text-neutral-400">
                            Search Vehicle
                        </h1>
                        <input
                            type="text"
                            placeholder="Search Bikes, Cars..."
                            value={filterData.search}
                            onChange={handleSearch}
                            className="w-full p-4 border rounded-md"
                        />
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-neutral-400 mb-4">
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
                                    b.label ? "bg-gray-200" : ""
                                } cursor-pointer border py-3 px-4`}
                                onClick={() => {
                                    setFilterData({
                                        ...filterData,
                                        price_min: b.min,
                                        price_max: b.max,
                                    });
                                    router.get(
                                        route("vehicles.index"),
                                        {
                                            price_min: b.min,
                                            price_max: b.max,
                                        },
                                        {
                                            preserveState: true,
                                        }
                                    );
                                }}
                            >
                                {b.label}
                            </li>
                        ))}
                    </ul>

                    <SecondaryButton className="my-4">
                        Clear Filters
                    </SecondaryButton>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="font-bold flex w-full justify-between border-b py-1"
                    >
                        {isOpen
                            ? "Hide Advanced Search"
                            : "Click here for Advanced Search"}
                        <div className="h-8 w-8">
                            <Filter />
                        </div>
                    </button>
                    {isOpen && (
                        <div className="mt-4">
                            <select className="w-full p-2 mb-2">
                                <option value="">Brand</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Honda">Honda</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Min Year"
                                className="w-full p-2 mb-2"
                            />
                            <input
                                type="number"
                                placeholder="Max Year"
                                className="w-full p-2 mb-2"
                            />
                            <label>
                                Price Min:
                                <input
                                    type="number"
                                    name="price_min"
                                    value={filterData.price_min}
                                    onChange={handleFilterChange}
                                />
                            </label>
                            <label>
                                Price Max:
                                <input
                                    type="number"
                                    name="price_max"
                                    value={filterData.price_max}
                                    onChange={handleFilterChange}
                                />
                            </label>
                            <label>
                                Mileage Max:
                                <input
                                    type="number"
                                    name="mileage_max"
                                    value={filterData.mileage_max}
                                    onChange={handleFilterChange}
                                />
                            </label>
                            <label>
                                Condition:
                                <select
                                    name="condition"
                                    value={filterData.condition}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Select Condition</option>
                                    <option value="new">New</option>
                                    <option value="used">Used</option>
                                </select>
                            </label>
                            <label>
                                Location:
                                <input
                                    type="text"
                                    name="location"
                                    value={filterData.location}
                                    onChange={handleFilterChange}
                                />
                            </label>
                        </div>
                    )}
                </div>

                <div className="w-3/4 pl-6">
                    <FilteredCars
                        filterData={filterData}
                        applyFilters={applyFilters}
                    />
                </div>
            </MaxWidthWrapper>
        </GuestLayout>
    );
};

export default Index;
