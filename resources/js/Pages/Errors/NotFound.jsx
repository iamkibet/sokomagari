import React from "react";
import { Link } from "@inertiajs/react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white p-4">
            <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 text-center animate-fade-in">
                <div className="relative inline-block">
                    <h1 className="text-8xl font-bold text-primary mb-4">
                        404
                    </h1>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 transform origin-left scale-x-0 animate-scale-x"></div>
                </div>

                <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-600 mb-8">
                    The page you're looking for seems to have taken a detour.
                    Don't worry, we'll help you get back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:-translate-y-1"
                    >
                        <Home className="w-5 h-5" />
                        Go Homee
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300 hover:-translate-y-1"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
