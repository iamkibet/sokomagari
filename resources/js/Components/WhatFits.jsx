import React, { useState } from "react";
import { Car, Truck, Search } from "lucide-react";
import { AdvancedSearch } from "./AdvancedSearch";
import { router } from "@inertiajs/react";

const WhatFits = () => {
    const [activeTab, setActiveTab] = useState("name");
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route("vehicles.search", { search: searchQuery }));
        }
    };

    return (
        <section className="flex flex-col w-full py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-8">
                <div className="text-center space-y-4 max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center font-playfair bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                        Find what fits your lifestyle
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mx-auto">
                        We help you find a car that perfectly matches your
                        personality, dreams, and budget!
                    </p>
                </div>

                {/* Quick Search Bar */}
                <div className="w-full max-w-2xl">
                    <form onSubmit={handleSearch} className="relative">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for vehicles (e.g., Toyota Vitz, Mercedes E-Class)"
                                className="w-full px-6 py-4 text-lg rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300"
                            />
                            <button
                                type="submit"
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors duration-300"
                            >
                                <Search className="w-6 h-6" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Popular Categories */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl mt-8">
                    {[
                        { icon: Car, name: "Sedans", count: "120+" },
                        { icon: Truck, name: "SUVs", count: "85+" },
                        { icon: Car, name: "Luxury", count: "45+" },
                        { icon: Truck, name: "Commercial", count: "30+" },
                    ].map((category, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                router.get(
                                    route("vehicles.index", {
                                        category: category.name.toLowerCase(),
                                    })
                                )
                            }
                            className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                        >
                            <category.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                                {category.name}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {category.count} vehicles
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Advanced Search Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <AdvancedSearch />
            </div>
        </section>
    );
};

export default WhatFits;
