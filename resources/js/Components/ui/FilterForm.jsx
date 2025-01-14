import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { ArrowRight } from "../svgs/ArrowRight";

const FilterForm = () => {
    // State to manage the active tabs
    const [activeTab, setActiveTab] = useState("new");
    const [activeInNewTab, setActiveInNewTab] = useState("budget");
    const [activeInUsedTab, setActiveInUsedTab] = useState("budget");

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [budget, setBudget] = useState("");
    const [brand, setBrand] = useState("");
    const [minYOM, setMinYOM] = useState("");
    const [maxYOM, setMaxYOM] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [model, setModel] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const downArrow = (
        <svg fill="#000000" className="h-6 w-6" viewBox="0 0 386.257 386.257">
            <polygon points="0,96.879 193.129,289.379 386.257,96.879 " />
        </svg>
    );


    

    const tabData = [
        { value: "new", label: "New Car" },
        { value: "used", label: "Used Car" },
    ];

    const newInTabData = [
        { value: "budget", label: "By Budget" },
        { value: "brand", label: "By Brand" },
    ];

    const usedInTabData = [
        { value: "budget", label: "By Budget" },
        { value: "model", label: "By Model" },
    ];

    const arrowRight = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className=" w-3 h-3 ml-1"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
        </svg>
    );
    return (
        <div className="bg-white dark:bg-[#010104] dark:bg-opacity-45 w-full md:max-w-[348px]  max-h-[443px] rounded-xl py-6 px-4 sm:py-[19px] sm:px-[24px] shadow-lg overflow-y-auto">
            <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Find Your Right Car
            </h2>

            <Tabs.Root
                value={activeTab}
                onValueChange={(value) => setActiveTab(value)}
            >
                <Tabs.List className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                    {tabData.map((tab) => (
                        <Tabs.Trigger
                            key={tab.value}
                            value={tab.value}
                            className={`relative py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-md font-semibold transition-colors duration-200 ${
                                activeTab === tab.value
                                    ? "bg-black text-[#eae9fc] rounded-xl"
                                    : "border rounded-xl"
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.value && (
                                <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2">
                                    {downArrow}
                                </div>
                            )}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {/* Content for New Car */}
                {activeTab === "new" && (
                    <div className="mt-4">
                        <Tabs.Root
                            value={activeInNewTab}
                            onValueChange={(value) => setActiveInNewTab(value)}
                        >
                            <Tabs.List className="flex gap-2 flex-wrap">
                                {newInTabData.map((tab) => (
                                    <Tabs.Trigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={`flex items-center justify-center gap-2 text-sm sm:text-md py-2 px-3 sm:py-2 sm:px-4 transition-all duration-300 ${
                                            activeInNewTab === tab.value
                                                ? "text-primary"
                                                : ""
                                        }`}
                                    >
                                        <div
                                            className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 ${
                                                activeInNewTab === tab.value
                                                    ? "border-primary"
                                                    : " border-gray-300"
                                            } transition-all`}
                                        >
                                            {activeInNewTab === tab.value && (
                                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <span className="pl-2 sm:pl-3">
                                            {tab.label}
                                        </span>
                                    </Tabs.Trigger>
                                ))}
                            </Tabs.List>

                            {activeInNewTab === "budget" && (
                                <div className="flex flex-col py-3 gap-3 ">
                                    <select className="dark:bg-[#01010400]  border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3">
                                        <option value="0">Select Budget</option>
                                        <option value="1">1000</option>
                                        <option value="2">2000</option>
                                        <option value="3">3000</option>
                                        <option value="4">4000</option>
                                    </select>
                                    <select className="dark:bg-[#01010400]  border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3">
                                        <option value="0">All Vehicles</option>
                                        <option value="1">Brand 1</option>
                                        <option value="2">Brand 2</option>
                                        <option value="3">Brand 3</option>
                                        <option value="4">Brand 4</option>
                                    </select>
                                </div>
                            )}
                        </Tabs.Root>
                        {activeInNewTab === "brand" && (
                            <div className="flex flex-col py-3 gap-3 ">
                                <select className="dark:bg-[#01010400]  border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3">
                                    <option value="0">Select Brand</option>
                                    <option value="1">1000</option>
                                    <option value="2">2000</option>
                                    <option value="3">3000</option>
                                    <option value="4">4000</option>
                                </select>
                                <select className="dark:bg-[#01010400]  border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3">
                                    <option value="0">All Vehicles</option>
                                    <option value="1">Brand 1</option>
                                    <option value="2">Brand 2</option>
                                    <option value="3">Brand 3</option>
                                    <option value="4">Brand 4</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}

                {/* Content for Used Car */}
                {activeTab === "used" && (
                    <div className="mt-4">
                        <Tabs.Root
                            value={activeInUsedTab}
                            onValueChange={(value) => setActiveInUsedTab(value)}
                        >
                            <Tabs.List className="flex gap-2 flex-wrap">
                                {usedInTabData.map((tab) => (
                                    <Tabs.Trigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={`flex items-center justify-center gap-2 text-sm sm:text-md py-2 px-3 sm:py-2 sm:px-4 transition-all duration-300 ${
                                            activeInUsedTab === tab.value
                                                ? "text-primary"
                                                : ""
                                        }`}
                                    >
                                        <div
                                            className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 ${
                                                activeInUsedTab === tab.value
                                                    ? "border-primary"
                                                    : " border-gray-300"
                                            } transition-all`}
                                        >
                                            {activeInUsedTab === tab.value && (
                                                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <span className="pl-2 sm:pl-3">
                                            {tab.label}
                                        </span>
                                    </Tabs.Trigger>
                                ))}
                            </Tabs.List>

                            {activeInUsedTab === "budget" && (
                                <div className="flex flex-col py-3 gap-3">
                                    <select className="dark:bg-[#01010400]  border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3">
                                        <option value="0">Select Budget</option>
                                        <option value="1">1000</option>
                                        <option value="2">2000</option>
                                        <option value="3">3000</option>
                                        <option value="4">4000</option>
                                    </select>
                                    <select className="dark:bg-[#01010400]  border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3">
                                        <option value="0">Select Brand</option>
                                        <option value="1">Brand 1</option>
                                        <option value="2">Brand 2</option>
                                        <option value="3">Brand 3</option>
                                        <option value="4">Brand 4</option>
                                    </select>
                                </div>
                            )}
                            {activeInUsedTab === "model" && (
                                <div className="flex flex-col py-3 gap-3">
                                    <select className="dark:bg-[#01010400]  border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3">
                                        <option value="0">Select Model</option>
                                        <option value="1">1000</option>
                                        <option value="2">2000</option>
                                        <option value="3">3000</option>
                                        <option value="4">4000</option>
                                    </select>
                                    <select className="dark:bg-[#01010400]  border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3">
                                        <option value="0">Select Brand</option>
                                        <option value="1">Brand 1</option>
                                        <option value="2">Brand 2</option>
                                        <option value="3">Brand 3</option>
                                        <option value="4">Brand 4</option>
                                    </select>
                                </div>
                            )}
                        </Tabs.Root>
                    </div>
                )}
            </Tabs.Root>

            <button className="bg-primary text-white w-full py-3 rounded-xl mt-4 text-center">
                Search
            </button>
            <a
                href="/"
                className="text-xs flex justify-end items-center py-2 pr-3"
            >
                Advanced search {arrowRight}
            </a>
        </div>
    );
};

export default FilterForm;
