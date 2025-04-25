import React from "react";

const CarCard = ({ car }) => {
    const formatPrice = (price) => {
        if (price >= 1_000_000) {
            return (price / 1_000_000).toFixed(1).toLowerCase() + "M";
        } else if (price >= 1_000) {
            return (price / 1_000).toFixed(1).toLowerCase() + "K";
        } else {
            return price.toString();
        }
    };

    return (
        <div className="group relative flex flex-col bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl  w-full max-w-[264px] md:max-w-[300px] lg:max-w-[320px] mx-auto">
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={car.thumbnail}
                    alt={`${car.make} ${car.model} - ${car.year}`}
                    className="w-full h-full object-cover transition-transform duration-500 "
                    loading="lazy"
                    decoding="async"
                />

                {/* Condition Badge */}
                <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 px-3 py-1 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200 shadow-sm">
                    <span className="capitalize">{car.condition}</span>
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col gap-3 p-4 md:p-5 lg:p-6">
                {/* Title Row */}
                <div className="flex justify-between items-start mb-1.5">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 leading-tight transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400">
                        <span className="inline-block pr-2 bg-clip-text bg-gradient-to-r from-gray-800 dark:from-gray-100 to-gray-600 dark:to-gray-300">
                            {car.make} {car.model}
                        </span>
                    </h3>
                    <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap bg-gray-100 dark:bg-gray-700/50 px-2.5 py-1 rounded-full">
                        {car.year}
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center mb-3">
                    <p className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-primary-600 to-primary-400 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-1.5">
                            KSH
                        </span>
                        <span className="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-300 mr-1.5">
                            {formatPrice(car.price)}
                        </span>
                    </p>
                </div>

                {/* CTA Button */}
                <a
                    href={`/vehicles/${car.slug}`}
                    className="group relative inline-flex items-center justify-center w-full py-3 px-5 space-x-2 border border-transparent rounded-xl font-medium transition-all duration-300  dark:bg-gray-700 dark:hover:bg-gray-600 
                   hover:shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    aria-label={`Explore ${car.make} ${car.model} details`}
                >
                    <span className="text-primary/70 dark:text-primary transition-colors duration-200">
                        View Details
                    </span>
                    <svg
                        className="w-4 h-4 text-primary/70 dark:text-primary transform transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                    </svg>
                    <div className="absolute inset-0 rounded-xl border border-primary group-hover:border-primary/60 transition-colors duration-300 pointer-events-none" />
                </a>
            </div>
        </div>
    );
};

export default CarCard;
