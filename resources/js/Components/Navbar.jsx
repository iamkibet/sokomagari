import React, { useState } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Close } from "./svgs/Close";
import { Hambuger } from "./svgs/Hambuger";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "@inertiajs/react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Arrow } from "@radix-ui/react-select";

const LocationSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
    </svg>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isActive = (route) => window.location.pathname === route;
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

    const heartSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
        </svg>
    );

    const userProfileSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
        </svg>
    );
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const MenuItem = ({ href, children, active }) => (
        <Link
            href={href}
            className={`flex uppercase font-bold items-center px-4 py-4 transition-all 
            ${
                active
                    ? "border-t-2 border-[#f75d34]"
                    : "border-t-2 border-transparent"
            }
            hover:border-t-2 border-[#f75d34]`}
        >
            {children}
        </Link>
    );

    const DropdownMenuItem = ({ title, items, active }) => (
        <div className="relative group">
            {/* Trigger */}
            <div
                className={`flex uppercase font-bold items-center gap-1 py-4 transition-all 
                ${
                    active
                        ? "border-t-2 border-[#f75d34]"
                        : "border-t-2 border-transparent"
                }
                hover:border-t-2 hover:border-[#f75d34]`}
            >
                <a className="text-gray-800 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-gray-200">
                    {title}
                </a>
                {DownSvg}
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-[50] mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all transform translate-y-2 pointer-events-none group-hover:pointer-events-auto">
                {items.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {item.text}
                    </a>
                ))}
            </div>
        </div>
    );

    return (
        <header className="bg-[#f0f9f4] dark:bg-[#060f0a] sticky top-0 z-[9999] border-b shadow-lg dark:border-gray-800">
            <section className="border-b-2 py-4">
                <MaxWidthWrapper className="flex items-center justify-between px-2 ">
                    <Link href="/">
                        <ApplicationLogo className="h-12 w-auto fill-current text-gray-800 dark:text-neutral-400" />
                    </Link>

                    <form className="max-w-md w-full">
                        <div className="flex">
                            <button
                                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                                type="button"
                            >
                                All
                                {DownSvg}
                            </button>
                            <div
                                id="dropdown"
                                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdown-button"
                                >
                                    <li>
                                        <button
                                            type="button"
                                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Mockups
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Templates
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Design
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            Logos
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="relative w-full">
                                <input
                                    type="search"
                                    id="search-dropdown"
                                    className="block pl-9 p-2.5 w-full z-20 text-sm rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                    placeholder="Search or ask a question"
                                    required
                                />

                                <svg
                                    className="w-4 h-4 flex items-center text-center absolute top-4 start-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                            </div>
                        </div>
                    </form>
                    <div className="flex items-center justify-between space-x-4">
                        <p className="flex items-center text-xs">
                            English <span>{DownSvg}</span>
                        </p>
                        <a href="/"> {heartSvg}</a>
                        <a className="flex gap-2 text-sm">
                            {" "}
                            {userProfileSvg}Login / Register
                        </a>
                    </div>
                </MaxWidthWrapper>
            </section>
            <section>
                <MaxWidthWrapper>
                    <div className="flex justify-between items-center">
                        {/* Desktop Menu */}
                        <div>
                            <nav className="hidden md:flex space-x-4 ">
                                <DropdownMenuItem
                                    title="Vehicles"
                                    items={[
                                        {
                                            href: "/vehicles",
                                            text: "All Vehicles",
                                        },
                                        {
                                            href: "/contact",
                                            text: "Available in Kenya",
                                        },
                                        { href: "/faq", text: "Direct import" },
                                    ]}
                                    active={isActive("/vehicles")}
                                />
                                <DropdownMenuItem
                                    title="Bikes"
                                    items={[
                                        { href: "/bikes", text: "All Bikes" },
                                        {
                                            href: "/contact",
                                            text: "Available in Kenya",
                                        },
                                        { href: "/faq", text: "Direct import" },
                                    ]}
                                    active={isActive("/bikes")}
                                />
                                <MenuItem href={route("login")}>
                                    Sell Your Car
                                </MenuItem>
                                <MenuItem href={route("about")}>About</MenuItem>
                                <MenuItem href={route("contact")}>
                                    Contact
                                </MenuItem>
                                <MenuItem href={route("faq")}>FAQ</MenuItem>
                                <ThemeSwitcher />
                            </nav>
                            <div>
                                {LocationSvg} <span>Select City</span> {Arrows}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMenu} className="md:hidden">
                        {isMenuOpen ? (
                            <div className="h-8 w-8">
                                <Close />
                            </div>
                        ) : (
                            <div className="h-8 w-8">
                                {" "}
                                <Hambuger />
                            </div>
                        )}
                    </button>
                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <nav className="md:hidden mt-4 space-y-2">
                            <DropdownMenuItem
                                title="Vehicles"
                                items={[
                                    { href: "/services", text: "All Vehicles" },
                                    {
                                        href: "/contact",
                                        text: "Available in Kenya",
                                    },
                                    { href: "/faq", text: "Direct import" },
                                ]}
                            />
                            <DropdownMenuItem
                                title="Bikes"
                                items={[
                                    { href: "/services", text: "All Bikes" },
                                    {
                                        href: "/contact",
                                        text: "Available in Kenya",
                                    },
                                    { href: "/faq", text: "Direct import" },
                                ]}
                            />
                            <MenuItem href={route("login")}>
                                Sell Your Car
                            </MenuItem>
                            <MenuItem href={route("about")}>About</MenuItem>
                            <MenuItem href={route("contact")}>Contact</MenuItem>
                            <MenuItem href={route("faq")}>FAQ</MenuItem>
                            <ThemeSwitcher />
                        </nav>
                    )}
                </MaxWidthWrapper>
            </section>
        </header>
    );
};

export default Navbar;
