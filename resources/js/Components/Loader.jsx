import React, { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

const words = [
    "Cars",
    "SUVs",
    "Sedans",
    "Toyota",
    "Lambo",
    "BMW",
    "Mercedes",
    "Audi",
    "Porsche",
    "Ferrari",
];

const Loader = () => {
    const { isLoading, isInitialized } = useLoading();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [isLoading]);

    if (!isLoading && isInitialized) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 transition-opacity duration-300 ${
                isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div className="relative">
                {/* Outer circle */}
                <div className="w-24 h-24 border-4 border-gray-200 dark:border-gray-700 rounded-full loader-circle">
                    {/* Inner circle */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-t-primary-500 border-r-primary-500 border-b-transparent border-l-transparent rounded-full loader-inner-circle"></div>
                </div>
                {/* Word cycling container */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-8 overflow-hidden">
                    <div className="relative h-full">
                        {words.map((word, index) => (
                            <span
                                key={word}
                                className={`absolute top-0 left-0 w-full text-center text-primary-500 font-bold text-lg word-animation ${
                                    index === currentWordIndex
                                        ? "block"
                                        : "hidden"
                                }`}
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                {word}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
