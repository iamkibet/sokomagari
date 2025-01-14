import React, { useState } from "react";
import { Car, Truck } from "lucide-react";

import { AdvancedSearch } from "./AdvancedSearch";

const WhatFits = () => {
    const [activeTab, setActiveTab] = useState("name");

    const bodyTypes = [
        { icon: Car, name: "Sedan" },
        { icon: Truck, name: "SUV" },
    ];
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="flex flex-col w-full py-12 text-gray-800 dark:text-neutral-400">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center font-playfair ">
                    Find what fits your lifestyle
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-center  max-w-2xl">
                    We help you find a car that fits your personality, dream,
                    and pocket!
                </p>
            </div>

            <AdvancedSearch />
        </section>
    );
};

export default WhatFits;
