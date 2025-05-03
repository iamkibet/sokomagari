import React, { useState } from "react";
import { Car, Truck, Search } from "lucide-react";
import { AdvancedSearch } from "./AdvancedSearch";
import { router } from "@inertiajs/react";

const WhatFits = () => {
    const [activeTab, setActiveTab] = useState("all");

    const categories = [
        { id: "all", label: "All Vehicles", icon: Car, count: "250+" },
        { id: "sedan", label: "Sedans", icon: Car, count: "120+" },
        { id: "suv", label: "SUVs", icon: Truck, count: "85+" },
        { id: "luxury", label: "Luxury", icon: Car, count: "45+" },
        { id: "commercial", label: "Commercial", icon: Truck, count: "30+" },
    ];

    const handleCategoryClick = (categoryId) => {
        setActiveTab(categoryId);
        router.get(route("public.showroom.index", { type: categoryId }));
    };

    return (
        <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                        Find what fits your lifestyle
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                        We help you find a car that perfectly matches your
                        personality, dreams, and budget!
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category.id)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                                activeTab === category.id
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
                        >
                            <category.icon className="w-5 h-5" />
                            <span className="font-medium">
                                {category.label}
                            </span>
                            <span className="text-sm opacity-75">
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Advanced Search Section */}
                <div className="max-w-4xl mx-auto">
                    <AdvancedSearch />
                </div>
            </div>
        </section>
    );
};

export default WhatFits;
