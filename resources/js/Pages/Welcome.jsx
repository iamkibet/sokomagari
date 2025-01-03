import React, { useState } from "react";
import { motion } from "framer-motion";
import WhatFits from "@/Components/WhatFits";
import { Button } from "@/Components/ui/button";
import { Search } from "lucide-react";
import AnimatedText from "@/Components/AninatedText";
import { SUV } from "@/Components/svgs/SUV";
import { Sedan } from "@/Components/svgs/Sedan";
import { Hatchback } from "@/Components/svgs/Hatchback";
import { Hybrid } from "@/Components/svgs/Hybrid";
import { Coupe } from "@/Components/svgs/Coupe";
import FilterMenu from "@/Components/FilterMenu";
import Slider from "@/Components/Slider/Slider";
import CarInfoSection from "@/Components/CarInfoSection";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Welcome({ canLogin, canRegister, cars }) {
    const [selectedTag, setSelectedTag] = useState("all");

    const carTypes = [
        { Component: SUV, label: "SUV" },
        { Component: Sedan, label: "Sedan" },
        { Component: Hatchback, label: "Hatchback" },
        { Component: Coupe, label: "Coupe" },
        { Component: Hybrid, label: "Hybrid" },
    ];

    const tags = [
        { id: "all", label: "All" },
        { id: "new", label: "New" },
        { id: "used", label: "Used" },
    ];
    return (
        <GuestLayout>
            <div>
                <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
                    {/* Content */}
                    <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
                        {/* Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-6 sm:mb-8"
                        >
                            <p className="text-base lg:text-lg text-gray-700 dark:text-gray-400">
                                The best platform to buy and sell your cars
                            </p>
                            <h1 className="text-4xl lg:text-5xl font-extrabold mt-2 text-gray-900 dark:text-gray-100">
                                Find Your Perfect Car
                            </h1>
                        </motion.div>

                        {/* Filter Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
                        >
                            {tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => setSelectedTag(tag.id)}
                                    className={`px-3 py-1 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                                        selectedTag === tag.id
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
                                    }`}
                                >
                                    {tag.label}
                                </button>
                            ))}
                        </motion.div>

                        {/* Search Section */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                            className="rounded-lg px-4 py-4 shadow-lg mx-auto w-full max-w-4xl bg-gray-100 dark:bg-gray-800"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                                <FilterMenu
                                    label="Make"
                                    options={["Toyota", "Tesla", "BMW"]}
                                    className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                                />
                                <FilterMenu
                                    label="Model"
                                    options={["Camry", "Model S", "X5"]}
                                    className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                                />
                                <FilterMenu
                                    label="Price"
                                    options={["<$20K", "$20K-$50K", ">$50K"]}
                                    className="bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
                                />
                                <Button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md dark:bg-blue-500">
                                    <Search className="inline-block mr-2" />
                                    Search Cars
                                </Button>
                            </div>
                        </motion.div>

                        {/* Featured Models Section */}
                        <div className="mt-8 sm:mt-12">
                            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                                Or Browse Featured Models
                            </h2>
                            <div className="flex justify-center flex-wrap gap-4">
                                {carTypes.map(({ Component, label }, index) => (
                                    <button
                                        key={index}
                                        className="flex items-center px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                    >
                                        <Component />
                                        <span className="ml-2 font-medium">
                                            {label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <WhatFits />
                <Slider cars={cars} />
                <CarInfoSection />
            </div>
        </GuestLayout>
    );
}
