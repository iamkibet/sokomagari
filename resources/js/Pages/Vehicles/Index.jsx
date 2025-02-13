import React, { useState } from "react";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import SecondaryButton from "@/Components/SecondaryButton";
import { Filter } from "@/Components/svgs/Filter";
import GuestLayout from "@/Layouts/GuestLayout";
import FilteredCars from "@/Components/FilteredCars";
import { router, usePage } from "@inertiajs/react";
import VehicleSlider from "@/Components/VehicleSlider";

const Index = () => {
    const { allcars, vehicles, filters } = usePage().props;

    console.log(allcars);

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

    const ClearFilters = () => {
        setFilterData({
            make: "",
            model: "",
            year: "",
            price_min: "",
            price_max: "",
            mileage_max: "",
            condition: "",
            location: "",
            search: "",
        });

        setActiveFilter(null); //resets the budget filter

        router.get(route("vehicles.index"), {}, { preserveState: true });
    };

    const [activeFilter, setActiveFilter] = useState(false);

    // handling search
    const handleSearch = (e) => {
        setFilterData({
            ...filterData,
            search: e.target.value,
        });
    };


    const applyFilters = () => {
        router.get(route("vehicles.index"), filterData, {
            preserveState: true,
        });
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <GuestLayout>
            <MaxWidthWrapper className="flex py-10 overflow-visible">
                <div className="relative  w-1/4 ">
                    {" "}
                    <div className="  sticky top-36 self-start">
                        <ol className="flex items-center whitespace-nowrap">
                            <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                                <a href="/" className="cursor-pointer">
                                    Home
                                </a>{" "}
                                {arrowRight}
                            </li>
                            <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                                <a href="/vehicles" className="cursor-pointer">
                                    Vehicles{" "}
                                </a>
                                {arrowRight}
                            </li>
                            <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400">
                                <a href="/vehicles" className="cursor-pointer">
                                    Available
                                </a>
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
                                {
                                    label: "5M-10M",
                                    min: 5000000,
                                    max: 10000000,
                                },
                                {
                                    label: "Above 10M",
                                    min: 10000000,
                                    max: null,
                                },
                            ].map((b) => (
                                <li
                                    key={b.label}
                                    className={`${
                                        b.label === activeFilter
                                            ? "bg-primary text-white" // Active filter color
                                            : "bg-gray-200"
                                    } cursor-pointer border py-3 px-4`}
                                    onClick={() =>
                                        handleBudgetFilter(
                                            b.min,
                                            b.max,
                                            b.label
                                        )
                                    }
                                >
                                    {b.label}
                                </li>
                            ))}
                        </ul>

                        <SecondaryButton
                            className="my-4"
                            onClick={ClearFilters}
                        >
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
                                        <option value="">
                                            Select Condition
                                        </option>
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
                        <button onClick={applyFilters} className="px-4 py-3 bg-black text-white w-full mt-4 font-bold text-xl hover:bg-black/70">Search</button>
                    </div>
                </div>

                <div className="w-3/4 pl-6">
                    <FilteredCars
                        allcars={allcars.data}
                        filterData={filterData}
                        applyFilters={applyFilters}
                    />
                </div>
            </MaxWidthWrapper>
            <MaxWidthWrapper>
                <VehicleSlider
                    title="Latest cars"
                    items={allcars.data.filter(
                        (allcars) => allcars.year > 2021
                    )}
                    viewMoreLink="/vehicles"
                />
                <VehicleSlider
                    title="Affordable Cars"
                    items={allcars.data}
                    filterFn={(items) =>
                        items.filter((allcars) => allcars.price < 20000)
                    }
                    viewMoreLink="/affordable-cars"
                />
            </MaxWidthWrapper>
        </GuestLayout>
    );
};

export default Index;
