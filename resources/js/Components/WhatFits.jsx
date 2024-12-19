import React, { useState } from "react";
import { Search, Car, Truck } from "lucide-react";
import { Button } from "./ui/button";

import {
    Audi,
    Bmw,
    Honda,
    Hyundai,
    LandRover,
    Lexus,
    Mazda,
    Mercedes,
    Nissan,
    Subaru,
    Toyota,
    VolksWagen,
} from "./cars";
import {
    Convertibles,
    Hatchback,
    Pickups,
    Saloons,
    Suvs,
    Vans,
} from "./cartypes";
import { Filter } from "./svgs/Filter";

const WhatFits = () => {
    const [activeTab, setActiveTab] = useState("name");

    const bodyTypes = [
        { icon: Car, name: "Sedan" },
        { icon: Truck, name: "SUV" },
    ];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="flex flex-col w-full py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center font-playfair ">
                    Find what fits your lifestyle
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-center  max-w-2xl">
                    We help you find a car that fits your personality, dream,
                    and pocket!
                </p>
            </div>

            <div className="container mx-auto max-w-4xl mt-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full">
                    <div className="flex justify-center mb-6">
                        {["name", "brand", "body"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-2 px-4 text-sm sm:text-base transition-all duration-300 ${
                                    activeTab === tab ? "font-extrabold" : ""
                                } rounded-full mx-1`}
                            >
                                {tab === "name" && "Search by Name"}
                                {tab === "brand" && "Filter by Brand"}
                                {tab === "body" && "Filter by Body Type"}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">
                        {activeTab === "name" && (
                            <div className="flex flex-col gap-2 py-6">
                                <h1 className="font-bold text-lg">
                                    Search the name of a vehicle
                                </h1>
                                <i>
                                    Simply write the name of a vehicle in the
                                    search box, i.e Vitz, Toyota Noah...
                                </i>
                                <div className="relative py-6">
                                    <input
                                        type="text"
                                        placeholder="Search for cars"
                                        className="rounded-lg pl-10 pr-4 py-4 border w-full border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        <Search className="w-5 h-5" />
                                    </span>
                                </div>
                                <div className="py-6">
                                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                        Filter by Budget
                                    </h1>
                                    <ul className="flex-wrap sm:flex gap-3 font-figtree">
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
                                                className="border  border-gray-200 py-3 px-4 rounded-md text-center text-sm font-medium  cursor-pointer  transition duration-300 ease-in-out active:scale-95 "
                                            >
                                                {budget}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="py-3">
                                        <button className="bg-[#8fafd6] px-6 py-2 rounded-md  font-bold">
                                            Clear
                                        </button>
                                    </div>
                                    {/* advanced search */}
                                    <div className=" container mx-auto  py-6">
                                        {/* Toggle Button */}
                                        <button
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="font-bold flex w-full justify-between"
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
                                            <form className="mt-4 y-6">
                                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                                    Brand & Model
                                                </h2>

                                                {/* Vehicle Brand and Model */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Vehicle Brand
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter brand"
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Brand Model
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter model"
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Year of Manufacture */}
                                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                                    Year of Manufacture
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Min YOM
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="Minimum year"
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Max YOM
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="Maximum year"
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>

                                                {/* Price and Currency */}
                                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                                    Price & Currency
                                                </h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Min Price
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="Minimum price"
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            Max Price
                                                        </label>
                                                        <input
                                                            type="number"
                                                            placeholder="Maximum price"
                                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Currency
                                                    </label>
                                                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
                                                        <option>
                                                            All Currencies
                                                        </option>
                                                        <option>USD</option>
                                                        <option>EUR</option>
                                                        <option>KES</option>
                                                    </select>
                                                </div>

                                                {/* Vehicle Location */}
                                                <h2 className="text-lg font-semibold text-gray-800 my-4">
                                                    Vehicle Location
                                                </h2>
                                                <div className="flex items-center space-x-4 mb-4">
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="location"
                                                            value="kenya"
                                                            className="form-radio text-blue-600"
                                                        />
                                                        <span className="ml-2">
                                                            Available in Kenya
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="location"
                                                            value="import"
                                                            className="form-radio text-blue-600"
                                                        />
                                                        <span className="ml-2">
                                                            Direct
                                                            Import/International
                                                            Stock
                                                        </span>
                                                    </label>
                                                    <label className="inline-flex items-center">
                                                        <input
                                                            type="radio"
                                                            name="location"
                                                            value="both"
                                                            className="form-radio text-blue-600"
                                                        />
                                                        <span className="ml-2">
                                                            Both
                                                        </span>
                                                    </label>
                                                </div>

                                                {/* Submit Button */}
                                                <Button
                                                    type="submit"
                                                    className="mt-4 w-full px-6 py-6 text-lg flex items-center text-center"
                                                >
                                                    Search
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "brand" && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
                                {[
                                    Toyota,
                                    Audi,
                                    Bmw,
                                    Honda,
                                    Subaru,
                                    Nissan,
                                    Hyundai,
                                    Lexus,
                                    Mazda,
                                    Mercedes,
                                    LandRover,
                                    VolksWagen,
                                ].map((Brand, index) => (
                                    <button
                                        key={index}
                                        className="flex flex-col items-center p-4 "
                                    >
                                        <Brand className="w-16 h-16 mb-2 text-gray-800" />
                                        <span className="text-sm font-medium text-gray-700">
                                            {Brand.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {activeTab === "body" && (
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { Icon: Suvs },
                                    { Icon: Hatchback },
                                    { Icon: Pickups },
                                    { Icon: Vans },
                                    { Icon: Saloons },
                                    { Icon: Convertibles },
                                ].map(({ Icon, index }) => (
                                    <a
                                        key={index}
                                        className="flex cursor-pointer items-center justify-center py-8  transition duration-300 ease-in-out group"
                                    >
                                        <Icon className="w-16 h-16 transition-colors duration-300" />
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatFits;
