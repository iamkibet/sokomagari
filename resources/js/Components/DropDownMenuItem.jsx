import React, { useState, useRef } from "react";

const DropdownMenuItem = ({ title, items, active }) => {
    const DownSvg = (
        <svg
            className="w-2.5 h-2.5 ms-2.5 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            viewBox="0 0 10 6"
        >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
            />
        </svg>
    );
    // State to manage the dropdown's open/closed status
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef(null);

    // Open the dropdown immediately when mouse enters or focus occurs
    const openDropdown = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    // Delay closing to give users time to move from trigger to menu
    const closeDropdown = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 100);
    };

    // Optional: handle keyboard navigation if desired
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            setIsOpen((prev) => !prev);
        }
        // Add additional key handling (e.g., ArrowDown/ArrowUp) if needed
    };

    return (
        <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            onFocus={openDropdown}
            onBlur={closeDropdown}
        >
            {/* Trigger */}
            <div
                className={`flex uppercase font-bold items-center gap-1 py-4 transition-all cursor-pointer ${
                    active
                        ? "border-t-2 border-[#f75d34]"
                        : "border-t-2 border-transparent"
                } hover:border-t-2 hover:border-[#f75d34]`}
                role="button"
                tabIndex="0"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onKeyDown={handleKeyDown}
            >
                <span className="hover:text-gray-900 dark:hover:text-[#eae9fc]">
                    {title}
                </span>
                {DownSvg}
            </div>

            {/* Dropdown Menu */}
            <div
                className={`absolute right-50 mt-2 w-64 text-[#040316] dark:text-[#eae9fc] bg-[#fbfbfe] dark:bg-[rgb(33,33,33)]  border border-gray-200 dark:border-gray-700 rounded-md shadow-lg transition-all transform ${
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                }`}
                role="menu"
                aria-label={`${title} menu`}
            >
                {/* Adding a scrollable container if there are many items */}
                <div className="max-h-64 overflow-y-auto">
                    {items.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            role="menuitem"
                            className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary/15 dark:hover:bg-gray-700"
                        >
                            {item.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropdownMenuItem;
