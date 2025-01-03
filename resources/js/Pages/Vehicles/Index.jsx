import InfiniteScroll from "@/Components/PaginatedCars";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { Filter } from "@/Components/svgs/Filter";
import GuestLayout from "@/Layouts/GuestLayout";
import React, { useState } from "react";
import PaginatedCars from "@/Components/PaginatedCars";

const Index = ({ cars }) => {
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
                            Home
                            {arrowRight}
                        </li>
                        <li
                            className="flex items-center text-sm text-gray-800 dark:text-neutral-400"
                            aria-current="page"
                        >
                            Vehicles
                            {arrowRight}
                        </li>
                        <li
                            className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
                            aria-current="page"
                        >
                            Available
                        </li>
                    </ol>
                    <div className="flex flex-col gap-1 py-6">
                        <h1 className="font-bold text-sm text-gray-800 dark:text-neutral-400">
                            Search Vehicle
                        </h1>
                        <i className="text-xs">
                            Simply write the name of a vehicle in the search
                            box, i.e Vitz, Toyota Noah...
                        </i>
                        <div className="py-6">
                            <form>
                                <label
                                    for="default-search"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Search
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="search"
                                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-800 focus:border-blue-500 dark:bg-[rgba(143,175,214,0.3)]/10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-neutral-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search Bikes, Cars..."
                                        required
                                    />
                                    <PrimaryButton
                                        type="submit"
                                        className=" absolute end-2.5 bottom-2.5  focus:ring-4 focus:outline-none focus:ring-gray-800 font-medium rounded-lg text-sm px-4 py-2  dark:focus:ring-neutral-400"
                                    >
                                        Search
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                        <div className="py-6">
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
                                ].map((budget) => (
                                    <li
                                        key={budget}
                                        className=" text-gray-800 dark:text-neutral-400 border-[0.5px] border-neutral-400 py-3 px-4 rounded-md text-center text-sm font-medium  cursor-pointer  transition duration-300 ease-in-out active:scale-95 "
                                    >
                                        {budget}
                                    </li>
                                ))}
                            </ul>
                            <div className="py-3">
                                <SecondaryButton className="bg-slate-300 dark:bg-[#294970]">
                                    Clear
                                </SecondaryButton>
                            </div>
                            {/* advanced search */}
                            <div className="py-6 text-gray-800 dark:text-neutral-400">
                                {/* Toggle Button */}
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

                                {/* Advanced Search Form */}
                                <div
                                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                                        isOpen
                                            ? "max-h-screen opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <form className="mt-4 y-6 flex flex-col gap-y-2">
                                        {/* Vehicle Brand and Model */}
                                        <div className="">
                                            <h2 className="text-lg font-semibold mb-4">
                                                Brand & Model
                                            </h2>
                                            <div className="space-y-3">
                                                <select
                                                    className="w-full py-4 px-2 border rounded-md bg-white text-gray-800 dark:bg-[rgba(143,175,214,0.3)]/10 dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    name="selectBrand1"
                                                    id="selectBrand1"
                                                >
                                                    <option value="#">
                                                        Brand Name
                                                    </option>
                                                    <option value="brand1">
                                                        Brand 1
                                                    </option>
                                                    <option value="brand2">
                                                        Brand 2
                                                    </option>
                                                </select>
                                                <select
                                                    className="w-full py-4 px-2 border rounded-md bg-white text-gray-800 dark:bg-[rgba(143,175,214,0.3)]/10 dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    name="selectBrand2"
                                                    id="selectBrand2"
                                                >
                                                    <option value="#">
                                                        Brand Model
                                                    </option>
                                                    <option value="brand1">
                                                        Brand 1
                                                    </option>
                                                    <option value="brand2">
                                                        Brand 2
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            {/* Year of Manufacture */}
                                            <h2 className="text-base font-semibold  mb-4">
                                                Year of Manufacture
                                            </h2>
                                            <div className="flex gap-2">
                                                <div>
                                                    <label className="block text-sm font-medium ">
                                                        Min YOM
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Minimum year"
                                                        className="mt-1 block w-full bg-[rgba(143,175,214,0.3)]/10 border-[0.5px] px-3 py-4 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium ">
                                                        Max YOM
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="Maximum year"
                                                        className="mt-1 block w-full bg-[rgba(143,175,214,0.3)]/10 border-[0.5px] px-3 py-4 focus:ring-blue-500 focus:border-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                {/* Price and Currency */}
                                                <h2 className="text-lg font-semibold  mb-4">
                                                    Price & Currency
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium ">
                                                            Min Price
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="Minimum Price"
                                                            className="mt-1 block w-full bg-[rgba(143,175,214,0.3)]/10 border-[0.5px] px-3 py-4 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium ">
                                                            Max Price
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="Maximum Price"
                                                            className="mt-1 block w-full bg-[rgba(143,175,214,0.3)]/10 border-[0.5px] px-3 py-4 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium ">
                                                Currency
                                            </label>
                                            <select className="w-full py-4 px-2 border rounded-md bg-white text-gray-800 dark:bg-[rgba(143,175,214,0.3)]/10 dark:text-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option>All Currencies</option>
                                                <option>USD</option>
                                                <option>EUR</option>
                                                <option>KES</option>
                                            </select>
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="mt-4 w-full rounded-sm px-6 bg-[#323286] hover:bg-[#323286]/90 py-4 text-lg flex items-center text-center"
                                        >
                                            Search
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-2 flex flex-col gap-y-2 w-3/4">
                    <p className="text-gray-800 dark:text-neutral-400">
                        Show results for automobiles
                    </p>
                    <div className="flex gap-2  border-b-2 pb-2">
                        <PrimaryButton>Available in Kenya</PrimaryButton>
                        <PrimaryButton>Direct import</PrimaryButton>
                        <PrimaryButton>both</PrimaryButton>
                    </div>

                    <PaginatedCars cars={cars} />
                </div>
            </MaxWidthWrapper>
        </GuestLayout>
    );
};

export default Index;
