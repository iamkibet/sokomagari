import React from "react";

const CarFeatures = ({ features }) => {
    // Ensure features is an object, default to empty object if null/undefined
    const safeFeatures = features || {};

    return (
        <div className="mb-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(safeFeatures).map(([feature, value]) => (
                    <li
                        key={feature}
                        className="flex justify-between items-center bg-white py-2 rounded-lg shadow-sm hover:shadow-md"
                    >
                        <span className="text-gray-700">
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
            className="w-6 h-6 text-primary"
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
        <span className="text-gray-400">—</span>
    );

const formatFeatureName = (name) => {
    return name
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default CarFeatures;
