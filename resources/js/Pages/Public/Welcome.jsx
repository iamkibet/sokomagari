import React from "react";
import WhatFits from "@/Components/WhatFits";
import Slider from "@/Components/Slider/Slider";
import CarInfoSection from "@/Components/CarInfoSection";
import GuestLayout from "@/Layouts/GuestLayout";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import FilterForm from "@/Components/ui/FilterForm";
import VehicleSlider from "@/Components/VehicleSlider";
import { Head } from "@inertiajs/react";
import {
    BadgeCheck,
    Shield,
    ShieldCheck,
    Truck,
    Clock,
    FileText,
    Car,
    Sparkles,
    ArrowRight,
} from "lucide-react";

export default function Welcome({ cars, categories }) {
 

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

            {/* Hero Section */}
            <div className="relative isolate min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 -z-10">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />

                    {/* Floating Elements */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]" />
                </div>

                <MaxWidthWrapper>
                    <div className="flex flex-col md:flex-row items-center min-h-[calc(100vh-4rem)] py-12 md:py-24">
                        {/* Hero Content */}
                        <div className="md:w-1/2 w-full space-y-8 text-white z-10">
                            {/* Decorative Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">
                                    Your Trusted Auto Partner
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl">
                                Find Your Perfect
                                <br />
                                <span className="bg-gradient-to-r from-primary/70 via-primary/80 to-primary bg-clip-text text-transparent">
                                    Vehicle Match
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
                                Discover your dream car from our extensive
                                collection of verified vehicles, complete with
                                detailed inspections and transparent pricing.
                            </p>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                    <ShieldCheck className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-medium">
                                        200-Point Inspection
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                    <BadgeCheck className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-medium">
                                        1-Year Warranty
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                                    <Car className="w-5 h-5 text-primary" />
                                    <span className="text-sm font-medium">
                                        Free Test Drive
                                    </span>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-xl">
                                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <div className="text-2xl md:text-3xl font-bold text-primary">
                                        5000+
                                    </div>
                                    <div className="text-sm md:text-base text-gray-300 font-medium">
                                        Happy Customers
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <div className="text-2xl md:text-3xl font-bold text-primary">
                                        50+
                                    </div>
                                    <div className="text-sm md:text-base text-gray-300 font-medium">
                                        Brands & Models
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                    <div className="text-2xl md:text-3xl font-bold text-primary">
                                        50+
                                    </div>
                                    <div className="text-sm md:text-base text-gray-300 font-medium">
                                        Loans Facilitated
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter Form Container */}

                        <div className="my-10 md:my-0 md:ml-20 items-center justify-center bg-white/95 dark:bg-primary/10 backdrop-blur-xl rounded-2xl shadow-2xl dark:shadow-gray-800/30 p-2 md:p-4 border border-gray-200/20 dark:border-gray-700/20">
                            <FilterForm />
                            <div className="hidden md:block md:mt-8 text-sm text-gray-600 dark:text-gray-400">
                                Popular Searches:
                                <a
                                    href="#"
                                    className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    SUV
                                </a>
                                ,
                                <a
                                    href="#"
                                    className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Electric
                                </a>
                                ,
                                <a
                                    href="#"
                                    className="ml-2 text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    Luxury
                                </a>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>

                {/* USP Bar */}
                <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-gray-200/10">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                            <div className="flex items-center gap-3 text-gray-200">
                                <Truck className="w-6 h-6 text-primary" />
                                <span className="font-medium">
                                    Fast Delivery
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-200">
                                <Clock className="w-6 h-6 text-primary" />
                                <span className="font-medium">
                                    24/7 Support
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-200">
                                <Shield className="w-6 h-6 text-primary" />
                                <span className="font-medium">
                                    Buyback Guarantee
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-200">
                                <FileText className="w-6 h-6 text-primary" />
                                <span className="font-medium">
                                    Fast Processing
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vehicle Sliders */}
            <div className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
                <MaxWidthWrapper>
                    <VehicleSlider
                        title="Featured Cars"
                        items={cars.featured}
                        categories={[
                            { id: "all", label: "All" },
                            { id: "suv", label: "SUV" },
                            { id: "sedan", label: "Sedan" },
                            { id: "van", label: "Van" },
                            { id: "hatchback", label: "Hatchback" },
                        ]}
                        filterFn={(items, category) =>
                            category === "all" ? items : cars[category] || []
                        }
                        viewMoreLink="/vehicles"
                        sliderText="View More Featured Cars"
                    />

                    <VehicleSlider
                        title="Get truested used cars nearby"
                        items={cars.petrol}
                        categories={[
                            { id: "all", label: "Petrol" },

                            { id: "diesel", label: "Diesel" },
                            { id: "electric", label: "Electric" },
                        ]}
                        filterFn={(items, category) =>
                            category === "all" ? items : cars[category] || []
                        }
                        viewMoreLink="/vehicles?fuel_type="
                        sliderText="View More vehicles"
                    />

                    <VehicleSlider
                        title="Latest Cars"
                        items={cars.latest}
                        viewMoreLink="/vehicles"
                        sliderText="View More Latest Cars"
                    />

                    <VehicleSlider
                        title="Affordable Cars"
                        items={cars.affordable}
                        viewMoreLink="/vehicles"
                        sliderText="View More Affordable Cars"
                    />
                </MaxWidthWrapper>
            </div>

            <WhatFits />
            {/* CTA Section */}
            <div className="relative py-24 bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gradient-to-r from-primary to-primary-dark px-6 py-16 text-center shadow-2xl rounded-3xl sm:px-16">
                        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white">
                            Ready for Exceptional Mobility?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
                            Discover your ideal vehicle through Africa's most
                            trusted automotive platform
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href={route("public.vehicles.index")}
                                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
                            >
                                Browse Inventory
                                <ArrowRight
                                    className="w-4 h-4"
                                    strokeWidth={2.5}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
