import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { RadioGroup } from "@radix-ui/react-radio-group";

const FilterForm = () => {
    // State to manage the active tabs
    const [activeTab, setActiveTab] = useState("new");
    const [activeInNewTab, setActiveInNewTab] = useState("budget");
    const [activeInUsedTab, setActiveInUsedTab] = useState("budget");

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

    return (
        <div className="bg-white w-[348px] h-auto rounded-xl py-[19px] px-[24px] shadow-lg">
            <h2 className="flex items-center justify-center text-3xl font-bold tracking-tight mb-4">
                Find Your Right Car
            </h2>
            {/* Parent Tabs */}
            <Tabs.Root
                value={activeTab}
                onValueChange={(value) => setActiveTab(value)}
            >
                <Tabs.List className="flex gap-3 justify-center">
                    {tabData.map((tab) => (
                        <Tabs.Trigger
                            key={tab.value}
                            value={tab.value}
                            className={`relative py-3 px-6 text-md font-semibold transition-colors duration-200 ${
                                activeTab === tab.value
                                    ? "bg-black text-white rounded-xl"
                                    : "text-gray-500 border rounded-xl"
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
                            <Tabs.List className="flex">
                                {newInTabData.map((tab) => (
                                    <Tabs.Trigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={`flex items-center justify-center gap-2 text-md py-2 px-4 transition-all duration-300 ${
                                            activeInNewTab === tab.value
                                                ? "text-primary"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        <div
                                            className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                                                activeInNewTab === tab.value
                                                    ? "border-primary"
                                                    : "bg-white border-gray-300"
                                            } transition-all`}
                                        >
                                            {activeInNewTab === tab.value && (
                                                <div className="w-3 h-3 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <span className="pl-3">
                                            {tab.label}
                                        </span>
                                    </Tabs.Trigger>
                                ))}
                            </Tabs.List>

                            {activeInNewTab === "budget" && (
                                <div className="flex flex-col py-3">
                                    <select
                                        className="border-[0.5px] rounded-sm border-gray-300 py-3"
                                        name="/"
                                        id=""
                                    >
                                        <option value="0">Select Budget</option>
                                        <option value="1">1000</option>
                                        <option value="2">2000</option>
                                        <option value="3">3000</option>
                                        <option value="4">4000</option>
                                    </select>
                                    <select
                                        className="border-[0.5px] rounded-sm border-gray-300 py-3"
                                        name="/"
                                        id=""
                                    >
                                        <option value="0">All Vehicles</option>
                                        <option value="1">Brand 1</option>
                                        <option value="2">Brand 2</option>
                                        <option value="3">Brand 3</option>
                                        <option value="4">Brand 4</option>
                                    </select>
                                </div>
                            )}
                            {activeInNewTab === "brand" && (
                                <div className="flex flex-col py-3">
                                    <select
                                        className="border-[0.5px] rounded-sm border-gray-300 py-3"
                                        name="/"
                                        id=""
                                    >
                                        <option value="0">Select Brand</option>
                                        <option value="1">Brand 1</option>
                                        <option value="2">Brand 2</option>
                                        <option value="3">Brand 3</option>
                                        <option value="4">Brand 4</option>
                                    </select>
                                    <select
                                        className="border-[0.5px] rounded-sm border-gray-300 py-3"
                                        name="/"
                                        id=""
                                    >
                                        <option value="0">Select Model</option>
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

                {/* Content for Used Car */}
                {activeTab === "used" && (
                    <div className="mt-4">
                        <Tabs.Root
                            value={activeInUsedTab}
                            onValueChange={(value) => setActiveInUsedTab(value)}
                        >
                            <Tabs.List className="flex ">
                                {usedInTabData.map((tab) => (
                                    <Tabs.Trigger
                                        key={tab.value}
                                        value={tab.value}
                                        className={`flex items-center justify-center gap-2 text-md py-2 px-4 transition-all duration-300 ${
                                            activeInUsedTab === tab.value
                                                ? "text-primary "
                                                : "text-gray-500"
                                        }`}
                                    >
                                        <div
                                            className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                                                activeInUsedTab === tab.value
                                                    ? "border-primary"
                                                    : "bg-white border-gray-300"
                                            } transition-all`}
                                        >
                                            {activeInUsedTab === tab.value && (
                                                <div className="w-3 h-3 rounded-full bg-primary" />
                                            )}
                                        </div>
                                        <span className="pl-3">
                                            {tab.label}
                                        </span>
                                    </Tabs.Trigger>
                                ))}
                            </Tabs.List>
                            {activeInUsedTab === "budget" && (
                                <div className="flex flex-col py-3">
                                    <select
                                        className="border-[0.5px] rounded-sm border-gray-300 py-3"
                                        name="/"
                                        id=""
                                    >
                                        <option value="0">Select Budget</option>
                                        <option value="1">1000</option>
                                        <option value="2">2000</option>
                                        <option value="3">3000</option>
                                        <option value="4">4000</option>
                                    </select>
                                    <select
                                        className="border-[0.5px] rounded-sm border-gray-300 py-3"
                                        name="/"
                                        id=""
                                    >
                                        <option value="0">Select Brand</option>
                                        <option value="1">Brand 1</option>
                                        <option value="2">Brand 2</option>
                                        <option value="3">Brand 3</option>
                                        <option value="4">Brand 4</option>
                                    </select>
                                </div>
                            )}
                            {activeInUsedTab === "model" && (
                                <div className="flex flex-col py-3">
                                    <select
                                        className="border-[0.5px] rounded-sm border-gray-300 py-3"
                                        name="/"
                                        id=""
                                    >
                                        <option value="0">Select Model</option>
                                        <option value="1">Model 1</option>
                                        <option value="2">Model 2</option>
                                        <option value="3">Model 3</option>
                                        <option value="4">Model 4</option>
                                    </select>
                                    <select
                                        className="border-[0.5px] rounded-sm border-gray-300 py-3"
                                        name="/"
                                        id=""
                                    >
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
            <button href="/" className="bg-primary text-white w-full py-3 rounded-xl mt-4 text-center">
                Search
            </button>
        </div>
    );
};

export default FilterForm;
