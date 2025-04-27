import React from "react";

const CarFeatures = ({ features }) => {
    const safeFeatures = features || {};

    return (
        <div className="mb-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(safeFeatures).map(([feature, value]) => (
                    <li
                        key={feature}
                        className="flex justify-between items-center bg-white dark:bg-gray-800 py-2 rounded-lg shadow-sm hover:shadow-md"
                    >
                        <span className="text-gray-700 dark:text-gray-300">
                            {formatFeatureName(feature)}
                        </span>
                        <FeatureIcon value={value} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

const FeatureIcon = ({ value }) =>
    value === "1" ? (
        <svg
            className="w-6 h-6 text-primary dark:text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
            ></path>
        </svg>
    ) : (
        <span className="text-gray-400 dark:text-gray-500">—</span>
    );

const formatFeatureName = (name) => {
    return name
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default CarFeatures;
