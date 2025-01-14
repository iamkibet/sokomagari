import React, { useEffect, useState } from "react";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import SecondaryButton from "@/Components/SecondaryButton";
import { Filter } from "@/Components/svgs/Filter";
import GuestLayout from "@/Layouts/GuestLayout";
import PaginatedCars from "@/Components/PaginatedCars";

const Index = ({ cars }) => {
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

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [budget, setBudget] = useState("");
    const [brand, setBrand] = useState("");
    const [minYOM, setMinYOM] = useState("");
    const [maxYOM, setMaxYOM] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [model, setModel] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const carsPerPage = 10;

    const [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        if (Array.isArray(cars)) {
            const filtered = cars.filter((car) => {
                const matchesSearchQuery = car.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                const matchesBudget = budget
                    ? car.price <= parseBudget(budget)
                    : true;
                const matchesBrand = brand ? car.brand === brand : true;
                const matchesYOM =
                    (!minYOM || car.year >= parseInt(minYOM)) &&
                    (!maxYOM || car.year <= parseInt(maxYOM));
                return (
                    matchesSearchQuery &&
                    matchesBudget &&
                    matchesBrand &&
                    matchesYOM
                );
            });
            setFilteredCars(filtered);
        } else {
            setFilteredCars([]);
        }
        setCurrentPage(1);
    }, [
        searchQuery,
        budget,
        brand,
        model,
        minYOM,
        maxYOM,
        minPrice,
        maxPrice,
        cars,
    ]);

    const parseBudget = (budget) => {
        const [min, max] = budget.split("-").map(Number);
        return max || min;
    };

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = Array.isArray(filteredCars)
        ? filteredCars.slice(indexOfFirstCar, indexOfLastCar)
        : [];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const clearFilters = () => {
        setSearchQuery("");
        setBudget("");
        setBrand("");
        setMinYOM("");
        setMaxYOM("");
    };

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Bikes, Cars..."
                            className="w-full p-4 border rounded-md"
                        />
                    </div>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-neutral-400 mb-4">
                        Filter by Budget
                    </h1>
                    <ul className="flex-wrap sm:flex gap-2">
                        {[
                            "0-500K",
                            "500K-1M",
                            "1M-2M",
                            "2M-3M",
                            "3M-4M",
                            "4M-5M",
                            "5M-10M",
                            "Above 10M",
                        ].map((b) => (
                            <li
                                key={b}
                                onClick={() => setBudget(b)}
                                className={`${
                                    budget === b ? "bg-gray-200" : ""
                                } cursor-pointer border py-3 px-4`}
                            >
                                {b}
                            </li>
                        ))}
                    </ul>

                    <SecondaryButton onClick={clearFilters} className="my-4">
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
                            <select
                                onChange={(e) => setBrand(e.target.value)}
                                className="w-full p-2 mb-2"
                            >
                                <option value="">Brand</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Honda">Honda</option>
                            </select>
                            <input
                                type="number"
                                value={minYOM}
                                onChange={(e) => setMinYOM(e.target.value)}
                                placeholder="Min Year"
                                className="w-full p-2 mb-2"
                            />
                            <input
                                type="number"
                                value={maxYOM}
                                onChange={(e) => setMaxYOM(e.target.value)}
                                placeholder="Max Year"
                                className="w-full p-2 mb-2"
                            />
                        </div>
                    )}
                </div>

                <div className="w-3/4 pl-6">
                    <PaginatedCars cars={currentCars} />
                    <div className="flex justify-center mt-4">
                        {[
                            ...Array(
                                Math.ceil(filteredCars.length / carsPerPage)
                            ),
                        ].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={`mx-1 px-3 py-1 ${
                                    currentPage === i + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </MaxWidthWrapper>
        </GuestLayout>
    );
};

export default Index;
