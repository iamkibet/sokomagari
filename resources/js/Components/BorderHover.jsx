import React, { useState } from "react";

const BorderHover = ({
    children,
    defBorderColor = "bg-gray-300",
    hovBorderColor = "bg-slate-800 dark:bg-slate-200",
    className = "",
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const borderColor = isHovered ? hovBorderColor : defBorderColor;

    return (
        <span
            className={`relative group w-fit z-10 ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span
                className={`absolute bottom-0  transition-transform duration-700 ${borderColor}`}
                style={{
                    width: "100%",
                    height: "1px",
                    transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "center",
                }}
            ></span>
            {children}
        </span>
    );
};

export default BorderHover;
