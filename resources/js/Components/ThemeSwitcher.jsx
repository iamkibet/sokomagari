import React from "react";

import { Moon } from "./svgs/Moon";
import { Sun } from "./svgs/Sun";
import { useTheme } from "@/ThemeContext";

const ThemeSwitcher = () => {
    const { toggleTheme, theme } = useTheme();

    return (
        <a
            onClick={toggleTheme}
            className="flex items-center transition duration-200 cursor-pointer"
            aria-label="Toggle Dark Mode"
        >
            {theme === "light" ? (
                <div className="w-5 h-5 flex items-center">
                    <Moon />
                </div>
            ) : (
                <div className="w-5 h-5 flex items-center">
                    <Sun />
                </div>
            )}
        </a>
    );
};

export default ThemeSwitcher;
