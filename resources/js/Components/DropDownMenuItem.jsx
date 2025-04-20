import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import {
    ChevronDown,
    Car,
    Bike,
    Newspaper,
    Info,
    Phone,
    HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DropdownMenuItem = ({ title, items, active }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getIcon = (title) => {
        switch (title.toLowerCase()) {
            case "vehicles":
                return <Car className="w-5 h-5" />;
            case "bikes":
                return <Bike className="w-5 h-5" />;
            case "news & reviews":
                return <Newspaper className="w-5 h-5" />;
            case "about us":
                return <Info className="w-5 h-5" />;
            case "contact":
                return <Phone className="w-5 h-5" />;
            case "faq":
                return <HelpCircle className="w-5 h-5" />;
            default:
                return null;
        }
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${
                        active
                            ? "text-primary bg-primary/10"
                            : "text-gray-700 hover:text-primary hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`}
            >
                {getIcon(title)}
                <span>{title}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-56 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    >
                        <div className="py-1">
                            {items.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    {getIcon(item.text)}
                                    <span>{item.text}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropdownMenuItem;
