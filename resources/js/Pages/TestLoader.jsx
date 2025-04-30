import React, { useState } from "react";
import { useLoading } from "../contexts/LoadingContext";

const TestLoader = () => {
    const { showLoading, hideLoading } = useLoading();
    const [message, setMessage] = useState("");

    const simulateLoading = async () => {
        showLoading();
        setMessage("Loading started...");

        // Simulate an async operation
        await new Promise((resolve) => setTimeout(resolve, 3000));

        setMessage("Loading completed!");
        hideLoading();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Loader Test Page</h1>
            <button
                onClick={simulateLoading}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
                Trigger Loader
            </button>
            {message && (
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {message}
                </p>
            )}
        </div>
    );
};

export default TestLoader;
