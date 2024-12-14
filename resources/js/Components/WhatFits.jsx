import React, { useState } from "react";
import { Search, Car, Truck } from "lucide-react";
import { Button } from "./ui/button";
import { Audi } from "./cars/Audi";
import { Bmw } from "./cars/Bmw";
import { Honda } from "./cars/Honda";
import { Subaru } from "./cars/Subaru";
import { Toyota } from "./cars/Toyota";
import { Nissan } from "./cars/Nissan";
import { Hyundai } from "./cars/Hyundai";
import { Lexus } from "./cars/Lexus";
import { Mazda } from "./cars/Mazda";
import { Mercedes } from "./cars/Mercedes";
import { LandRover } from "./cars/LandRover";
import { VolksWagen } from "./cars/VolksWagen";


const WhatFits = () => {
    const [activeTab, setActiveTab] = useState("name");

    const bodyTypes = [
        { icon: Car, name: "Sedan" },
        { icon: Truck, name: "SUV" },
    ];
  


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
                                <div className="bg-white py-6">
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
                                        <Button>Clear</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "brand" && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
                                {[Toyota, Audi, Bmw, Honda, Subaru, Nissan, Hyundai, Lexus, Mazda, Mercedes, LandRover, VolksWagen].map(
                                    (Brand, index) => (
                                        <button
                                            key={index}
                                            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                                        >
                                            <Brand className="w-16 h-16 mb-2 text-gray-800" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {Brand.name}
                                            </span>
                                        </button>
                                    )
                                )}
                            </div>
                        )}

                        {activeTab === "body" && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                                {bodyTypes.map((type) => (
                                    <button
                                        key={type.name}
                                        className="flex flex-col items-center p-4 bg-white rounded-md shadow hover:shadow-md transition duration-300"
                                    >
                                        <type.icon className="w-12 h-12 mb-2 text-indigo-600" />
                                        <span className="text-sm font-medium text-gray-800">
                                            {type.name}
                                        </span>
                                    </button>
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
