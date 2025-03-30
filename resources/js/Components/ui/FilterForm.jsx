import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useForm } from "@inertiajs/react";

const HARDCODED_DATA = {
    brands: ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi"],
    models: {
        Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Prius"],
        Honda: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey"],
        Ford: ["F-150", "Focus", "Explorer", "Mustang", "Escape"],
        BMW: ["3 Series", "5 Series", "X5", "X3", "7 Series"],
        Mercedes: ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
        Audi: ["A4", "A6", "Q5", "Q7", "e-tron"],
    },
    budgets: [
        { label: "300K-500K", min: 300000, max: 500000 },
        { label: "501K-1M", min: 501000, max: 1000000 },
        { label: "1M-2M", min: 1000000, max: 2000000 },
        { label: "2M+", min: 2000000, max: null },
    ],
};

const FilterForm = () => {
    const [activeTab, setActiveTab] = useState("new");
    const [activeSubTab, setActiveSubTab] = useState("budget");

    const { data, setData, get } = useForm({
        condition: activeTab,
        price_min: "",
        price_max: "",
        make: "",
        model: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        get(route("vehicles.index"), {
            preserveScroll: true,
            preserveState: true,
            data: {
                ...data,
                // Clear unused filters based on active tab
                ...(activeSubTab !== "budget" && {
                    price_min: "",
                    price_max: "",
                }),
                ...(activeSubTab !== "brand" && { make: "", model: "" }),
            },
        });
    };

    const handleTabChange = (value) => {
        setActiveTab(value);
        setActiveSubTab("budget");
        setData({
            condition: value,
            price_min: "",
            price_max: "",
            make: "",
            model: "",
        });
    };

    const handleBudgetChange = (range) => {
        const selected = HARDCODED_DATA.budgets.find((b) => b.label === range);
        setData({
            ...data,
            price_min: selected?.min || "",
            price_max: selected?.max || "",
        });
    };

    // Keep original JSX structure with functional updates
    return (
        <div className="bg-white dark:bg-[#010104] dark:bg-opacity-45 w-full md:max-w-[348px] max-h-[443px] rounded-xl py-6 px-4 sm:py-[19px] sm:px-[24px] shadow-lg overflow-y-auto">
            <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Find Your Right Car
            </h2>

            <form onSubmit={handleSubmit}>
                <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
                    <Tabs.List className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                        {["new", "used"].map((tabValue) => (
                            <Tabs.Trigger
                                key={tabValue}
                                value={tabValue}
                                className={`relative py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-md font-semibold transition-colors duration-200 ${
                                    activeTab === tabValue
                                        ? "bg-black text-[#eae9fc] rounded-xl"
                                        : "border rounded-xl"
                                }`}
                            >
                                {tabValue === "new" ? "New Car" : "Used Car"}
                                {activeTab === tabValue && (
                                    <div className="absolute bottom-[-16px] left-1/2 transform -translate-x-1/2">
                                        <svg
                                            fill="#000000"
                                            className="h-6 w-6"
                                            viewBox="0 0 386.257 386.257"
                                        >
                                            <polygon points="0,96.879 193.129,289.379 386.257,96.879" />
                                        </svg>
                                    </div>
                                )}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>

                    <div className="mt-4">
                        <Tabs.Root
                            value={activeSubTab}
                            onValueChange={setActiveSubTab}
                        >
                            <Tabs.List className="flex gap-2 flex-wrap">
                                {activeTab === "new" ? (
                                    <>
                                        <TabTrigger
                                            value="budget"
                                            active={activeSubTab === "budget"}
                                            label="By Budget"
                                        />
                                        <TabTrigger
                                            value="brand"
                                            active={activeSubTab === "brand"}
                                            label="By Brand"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <TabTrigger
                                            value="budget"
                                            active={activeSubTab === "budget"}
                                            label="By Budget"
                                        />
                                        <TabTrigger
                                            value="model"
                                            active={activeSubTab === "model"}
                                            label="By Model"
                                        />
                                    </>
                                )}
                            </Tabs.List>

                            {activeSubTab === "budget" && (
                                <div className="flex flex-col py-3 gap-3">
                                    <select
                                        value={
                                            HARDCODED_DATA.budgets.find(
                                                (b) =>
                                                    b.min === data.price_min &&
                                                    b.max === data.price_max
                                            )?.label || ""
                                        }
                                        onChange={(e) =>
                                            handleBudgetChange(e.target.value)
                                        }
                                        className="dark:bg-[#01010400] border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3"
                                    >
                                        <option value="">Select Budget</option>
                                        {HARDCODED_DATA.budgets.map(
                                            (budget) => (
                                                <option
                                                    key={budget.label}
                                                    value={budget.label}
                                                >
                                                    {budget.label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            )}

                            {(activeSubTab === "brand" ||
                                activeSubTab === "model") && (
                                <div className="flex flex-col py-3 gap-3">
                                    <select
                                        value={data.make}
                                        onChange={(e) =>
                                            setData("make", e.target.value)
                                        }
                                        className="dark:bg-[#01010400] border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3"
                                    >
                                        <option value="">Select Brand</option>
                                        {HARDCODED_DATA.brands.map((brand) => (
                                            <option key={brand} value={brand}>
                                                {brand}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={data.model}
                                        onChange={(e) =>
                                            setData("model", e.target.value)
                                        }
                                        className="dark:bg-[#01010400] border rounded-sm border-gray-300 dark:border-gray-500 py-2 sm:py-3"
                                        disabled={!data.make}
                                    >
                                        <option value="">Select Model</option>
                                        {data.make &&
                                            HARDCODED_DATA.models[
                                                data.make
                                            ]?.map((model) => (
                                                <option
                                                    key={model}
                                                    value={model}
                                                >
                                                    {model}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}
                        </Tabs.Root>
                    </div>
                </Tabs.Root>

                <button
                    type="submit"
                    className="bg-primary text-white w-full py-3 rounded-xl mt-4 text-center"
                >
                    Search
                </button>
            </form>

            <a
                href="/"
                className="text-xs flex justify-end items-center py-2 pr-3"
            >
                Advanced search
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-3 h-3 ml-1"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                </svg>
            </a>
        </div>
    );
};

const TabTrigger = ({ value, active, label }) => (
    <Tabs.Trigger
        value={value}
        className={`flex items-center justify-center gap-2 text-sm sm:text-md py-2 px-3 sm:py-2 sm:px-4 transition-all duration-300 ${
            active ? "text-primary" : ""
        }`}
    >
        <div
            className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 ${
                active ? "border-primary" : "border-gray-300"
            }`}
        >
            {active && (
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
            )}
        </div>
        <span className="pl-2 sm:pl-3">{label}</span>
    </Tabs.Trigger>
);

export default FilterForm;
