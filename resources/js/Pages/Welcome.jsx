import React, { useState } from "react";
import WhatFits from "@/Components/WhatFits";
import Slider from "@/Components/Slider/Slider";
import CarInfoSection from "@/Components/CarInfoSection";
import GuestLayout from "@/Layouts/GuestLayout";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import FilterForm from "@/Components/ui/FilterForm";
import VehicleSlider from "@/Components/VehicleSlider";
import { Head } from "@inertiajs/react";

export default function Welcome({ cars, categories }) {
    const [currentCar, setCurrentCar] = useState(0);

    const heroimages = [
        {
            image: "/images/image 1.avif",
            model: "Hyundai Creta",
            description: "Description 1",
        },
        {
            image: "/images/image 2.avif",
            model: "Maruti Suzuki Baleno",
            description: "Description 2",
        },
    ];

    return (
        <GuestLayout>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex flex-col items-center justify-center overflow-x-hidden">
                <div className="relative mx-auto w-full lg:max-w-[1300px] xl:max-w-[1600px] flex flex-col md:flex-row items-center justify-center ">
                    {/* Filter Form - Hidden on Mobile */}
                    <div className="hidden md:block w-full max-w-[348px] z-10 md:absolute md:top-[54px] md:left-[90px]">
                        <FilterForm />
                    </div>

                    <div className="w-full md:flex md:justify-end relative">
                        <div className="w-full lg:max-w-[110%] xl:max-w-[120%]">
                            <img
                                src={heroimages[currentCar].image}
                                alt="Car"
                                className="w-full h-[300px] md:h-[546px] object-cover transition-all duration-500  shadow-lg"
                            />
                        </div>

                        {/* Car Model Buttons */}
                        <div className="absolute bottom-4 md:bottom-20 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-2 md:gap-4 z-20">
                            {heroimages.map((car, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentCar(index)}
                                    className={`px-3 py-1 text-sm md:text-base font-medium transition-all duration-300
                                ${
                                    currentCar === index
                                        ? "text-white border-b-2"
                                        : "text-white border-b-[0.5px] border-white"
                                }`}
                                >
                                    {car.model}
                                </button>
                            ))}
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
                    viewMoreLink="/vehicles"
                />

                <VehicleSlider
                    title="Latest cars"
                    items={cars.data.filter((car) => car.year > 2016)}
                    viewMoreLink="/vehicles"
                />

                <VehicleSlider
                    title="Affordable Cars"
                    items={cars.data}
                    filterFn={(items) =>
                        items.filter((car) => car.price < 20000)
                    }
                    viewMoreLink="/vehicles"
                />

                <WhatFits />
            </div>
        </GuestLayout>
    );
}
