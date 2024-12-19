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
import Footer from "@/Components/Footer";
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
                <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-black to-gray-800 text-white overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
                    <motion.div
                        className="absolute inset-0 overflow-hidden"
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
                            alt="Luxury car background"
                            className="w-full h-full object-cover"
                            width={100}
                            height={100}
                        />
                    </motion.div>
                    {/* Content */}
                    <div className="my-10 md:my-0 relative z-10 w-full max-w-5xl mx-auto text-center">
                        {/* Tagline and Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-6 sm:mb-8"
                        >
                            <AnimatedText
                                text="The best platform to buy and sell your cars in Kenya"
                                className="text-base lg:text-lg text-gray-300"
                            />

                            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mt-2">
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
                                            ? "border-b text-white shadow-lg"
                                            : ""
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
                            className="bg-white backdrop-blur-md rounded-lg md:rounded-full px-4 py-4 shadow-lg mx-auto w-full max-w-4xl"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                                    <FilterMenu
                                        label="Any Makes"
                                        options={["Egypt", "Germany", "US"]}
                                    />
                                    <FilterMenu
                                        label="Model"
                                        options={["Egypt", "Germany", "US"]}
                                    />
                                    <FilterMenu
                                        label="Price"
                                        options={["Egypt", "Germany", "US"]}
                                    />
                                </div>
                                <Button
                                    variant="secondary"
                                    className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3"
                                >
                                    <Search className="w-4 h-4 md:w-5 md:h-5" />
                                    <span className="text-sm md:text-base">
                                        Search Cars
                                    </span>
                                </Button>
                            </div>
                        </motion.div>

                        <div className="flex flex-col items-center mt-6 sm:mt-8 py-4 rounded-lg shadow-md">
                            <p className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                                Or Browse Featured Models
                            </p>
                            <div className="flex justify-center flex-wrap gap-3 sm:gap-4 max-w-3xl py-4 sm:py-6">
                                {carTypes.map(({ Component, label }, index) => (
                                    <Button
                                        key={index}
                                        className="items-center bg-white/10 px-4 sm:px-6 py-2 rounded-md transition duration-300 ease-in-out text-xs sm:text-sm"
                                    >
                                        <Component />
                                        <span className="font-medium ml-2">
                                            {label}
                                        </span>
                                    </Button>
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
