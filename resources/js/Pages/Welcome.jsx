import React, { useState } from "react";
import WhatFits from "@/Components/WhatFits";
import Slider from "@/Components/Slider/Slider";
import CarInfoSection from "@/Components/CarInfoSection";
import GuestLayout from "@/Layouts/GuestLayout";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import FilterForm from "@/Components/ui/FilterForm";
import VehicleSlider from "@/Components/VehicleSlider";

export default function Welcome({ cars, categories }) {
  
    const [currentCar, setCurrentCar] = useState(0);
    const heroimages = [
        {
            image: "https://stimg.cardekho.com/images/uploadimages/1735897382911/CD-MasterHead-Desktop_1686x548px.jpg",
            model: "Hyundai Creta",
            description: "Description 1",
        },
        {
            image: "https://stimg.cardekho.com/images/uploadimages/1735909214588/CD-MasterHead-Desktop_1686x548px-(2).jpg",
            model: "Maruti Suzuki Baleno",
            description: "Description 2",
        },
    ];

    return (
        <GuestLayout>
            <div className="flex flex-col items-center justify-center overflow-x-hidden">
                <div className="relative flex items-center justify-center w-full">
                    {/* Content */}

                    <div className="flex md:absolute md:block top-4  md:top-[54px] md:left-[90px] z-10 w-full md:w-md:max-w-[348px]">
                        <FilterForm />
                    </div>

                    <div className="hidden md:flex flex-col md:flex-row w-full">
                        {/* Right side car display */}
                        <div className="w-full relative ">
                            <img
                                src={heroimages[currentCar].image}
                                alt="Car"
                                className="w-full h-[500px]   md:h-[546px]  md:object-cover transition-all duration-300"
                            />
                            <div className="absolute bottom-4 md:bottom-20 left-1/2 transform -translate-x-1/2 z-[100] flex justify-center items-center space-x-2 md:space-x-4 py-2 px-2 md:px-4 rounded-xl w-full md:max-w-[500px]">
                                {heroimages.map((car, index) => (
                                    <button
                                        key={index}
                                        className={`px-2 md:px-4 py-1 md:py-2 text-sm md:text-base transition-all duration-300 ${
                                            currentCar === index
                                                ? "border-b-4 border-white text-white"
                                                : "border-b text-gray-300 hover:text-white"
                                        }`}
                                        onClick={() => setCurrentCar(index)}
                                    >
                                        {car.model}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <VehicleSlider
                    title="The most searched cars"
                    items={cars.data}
                    categories={[
                        { id: "all", label: "All" },
                        { id: "sedan", label: "Sedan" },
                        { id: "suv", label: "SUV" },
                    ]}
                    filterFn={(items, category) =>
                        category === "all"
                            ? items
                            : items.filter((car) => car.category === category)
                    }
                    viewMoreLink="/cars"
                />

                <VehicleSlider
                    title="Latest cars"
                    items={cars.data.filter((car) => car.year > 2021)}
                    viewMoreLink="/cars"
                />

                <VehicleSlider
                    title="Affordable Cars"
                    items={cars.data}
                    filterFn={(items) =>
                        items.filter((car) => car.price < 20000)
                    }
                    viewMoreLink="/affordable-cars"
                />

                <WhatFits />

            </div>
        </GuestLayout>
    );
}
