import React, { useState } from "react";
import WhatFits from "@/Components/WhatFits";
import Slider from "@/Components/Slider/Slider";
import CarInfoSection from "@/Components/CarInfoSection";
import GuestLayout from "@/Layouts/GuestLayout";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import FilterForm from "@/Components/ui/FilterForm";

export default function Welcome({ cars }) {
    const [currentCar, setCurrentCar] = useState(0);
    const heroimages = [
        {
            image: "https://stimg.cardekho.com/images/uploadimages/1735897382911/CD-MasterHead-Desktop_1686x548px.jpg",
            model: "Car Model 1",
            description: "Description 1",
        },
        {
            image: "https://stimg.cardekho.com/images/uploadimages/1735909214588/CD-MasterHead-Desktop_1686x548px-(2).jpg",
            model: "Car Model 2",
            description: "Description 2",
        },
    ];

    return (
        <GuestLayout>
            <div className="flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                    {/* Content */}
                    <MaxWidthWrapper className="hidden md:flex absolute top-[50%] left-4 md:left-20 z-10 items-center h-full transform -translate-y-1/2">
                        <FilterForm />
                    </MaxWidthWrapper>
                    <div className="relative flex items-center justify-center">
                        {/* Content */}
                        <MaxWidthWrapper className="hidden md:flex absolute top-[50%] left-4 md:left-20 z-10 items-center h-full transform -translate-y-1/2">
                            <FilterForm />
                        </MaxWidthWrapper>
                        <div className="flex flex-col md:flex-row w-full">
                            {/* Right side car display */}
                            <div className="w-full relative">
                                <img
                                    src={heroimages[currentCar].image}
                                    alt="Car"
                                    className="w-full h-auto object-contain md:h-[500px] lg:h-[600px] transition-all duration-300"
                                />
                                <div className="absolute bottom-4 left-0 right-0 text-white p-4 flex justify-center">
                                    {/* Scrollable car model buttons */}
                                    <div className="flex space-x-4 overflow-x-auto py-2 px-4 bg-opacity-60 bg-black rounded-xl w-full md:w-auto">
                                        {heroimages.map((car, index) => (
                                            <button
                                                key={index}
                                                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                                                    currentCar === index
                                                        ? "border-b-4 border-white text-white"
                                                        : "border-b border-transparent text-gray-300 hover:text-white"
                                                }`}
                                                onClick={() =>
                                                    setCurrentCar(index)
                                                }
                                            >
                                                {car.model}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <WhatFits />

                <MaxWidthWrapper className="py-12 text-gray-800 dark:text-neutral-400">
                    <h2 className="text-2xl sm:text-3xl font-extrabold  mb-6 sm:mb-8">
                        Featured Cars
                    </h2>
                    <Slider cars={cars} />
                </MaxWidthWrapper>

                <CarInfoSection />
            </div>
        </GuestLayout>
    );
}
