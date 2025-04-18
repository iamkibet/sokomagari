import React, { useState, useEffect } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Close } from "./svgs/Close";
import { Hambuger } from "./svgs/Hambuger";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, usePage } from "@inertiajs/react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowDown } from "./svgs/ArrowDown";
import DropdownMenuItem from "./DropDownMenuItem";
import { motion, AnimatePresence } from "framer-motion";

const LocationSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-5"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
        />
    </svg>
);

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (route) => window.location.pathname === route;

    const DownSvg = (
        <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
            />
        </svg>
    );

    const heartSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
        </svg>
    );

    const userProfileSvg = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
        </svg>
    );

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const MenuItem = ({ href, children, active }) => (
        <Link
            href={href}
            className={`relative flex uppercase font-medium items-center px-4 py-4 transition-all duration-300
            ${
                active
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
            }
            group`}
        >
            {children}
            <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    active ? "scale-x-100" : ""
                }`}
            />
        </Link>
    );

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`sticky top-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
                    : "bg-white dark:bg-gray-900"
            }`}
        >
            <section className="border-b border-gray-200 dark:border-gray-800">
                <MaxWidthWrapper className="flex md:items-center justify-between flex-col space-y-4 md:flex-row md:space-y-0 py-4">
                    <div className="flex justify-between items-center w-full md:w-auto">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleMenu}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {isMenuOpen ? (
                                    <div className="h-6 w-6">
                                        <Close />
                                    </div>
                                ) : (
                                    <div className="h-6 w-6">
                                        <Hambuger />
                                    </div>
                                )}
                            </button>

                            <Link href="/" className="cursor-pointer">
                                <ApplicationLogo />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4 md:hidden">
                            <Link
                                href="/favorites"
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {heartSvg}
                            </Link>
                            {auth.user ? (
                                <Link
                                    href="/profile"
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {userProfileSvg}
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    {userProfileSvg}
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-between space-x-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                            <span>English</span>
                            <span>{DownSvg}</span>
                        </div>
                        <Link
                            href="/favorites"
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            {heartSvg}
                        </Link>
                        {auth.user ? (
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {userProfileSvg}
                                <span className="hidden md:inline">
                                    {auth.user.name}
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                {userProfileSvg}
                                <span className="hidden md:inline">
                                    Sign In
                                </span>
                            </Link>
                        )}
                    </div>
                </MaxWidthWrapper>
            </section>
            <section className="border-b border-gray-200 dark:border-gray-800">
                <MaxWidthWrapper>
                    <div className="flex justify-between items-center">
                        <nav className="hidden md:flex space-x-6">
                            <DropdownMenuItem
                                title="Vehicles"
                                items={[
                                    {
                                        href: "/vehicles",
                                        text: "All Vehicles",
                                    },
                                    {
                                        href: "/vehicles?location=kenya",
                                        text: "Available in Kenya",
                                    },
                                    {
                                        href: "/vehicles?import=direct",
                                        text: "Direct import",
                                    },
                                ]}
                                active={isActive("/vehicles")}
                            />
                            <DropdownMenuItem
                                title="Bikes"
                                items={[
                                    { href: "/bikes", text: "All Bikes" },
                                    {
                                        href: "/bikes?location=kenya",
                                        text: "Available in Kenya",
                                    },
                                    {
                                        href: "/bikes?import=direct",
                                        text: "Direct import",
                                    },
                                ]}
                                active={isActive("/bikes")}
                            />
                            <DropdownMenuItem
                                title="News & Reviews"
                                items={[
                                    { href: "/blog", text: "Blog" },
                                    {
                                        href: "/news",
                                        text: "News & More",
                                    },
                                ]}
                                active={isActive("/blog") || isActive("/news")}
                            />
                            <DropdownMenuItem
                                title="About Us"
                                items={[
                                    { href: "/faq", text: "FAQ" },
                                    {
                                        href: "/about",
                                        text: "About Us",
                                    },
                                    { href: "/contact", text: "Contact" },
                                ]}
                                active={
                                    isActive("/about") ||
                                    isActive("/contact") ||
                                    isActive("/faq")
                                }
                            />
                            <ThemeSwitcher />
                        </nav>
                        <div className="hidden md:flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            {LocationSvg}
                            <span className="text-gray-600 dark:text-gray-300">
                                Select City
                            </span>
                            <ArrowDown />
                        </div>
                    </div>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.nav
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden mt-4 space-y-2"
                            >
                                <DropdownMenuItem
                                    title="Vehicles"
                                    items={[
                                        {
                                            href: "/vehicles",
                                            text: "All Vehicles",
                                        },
                                        {
                                            href: "/vehicles?location=kenya",
                                            text: "Available in Kenya",
                                        },
                                        {
                                            href: "/vehicles?import=direct",
                                            text: "Direct import",
                                        },
                                    ]}
                                />
                                <DropdownMenuItem
                                    title="Bikes"
                                    items={[
                                        { href: "/bikes", text: "All Bikes" },
                                        {
                                            href: "/bikes?location=kenya",
                                            text: "Available in Kenya",
                                        },
                                        {
                                            href: "/bikes?import=direct",
                                            text: "Direct import",
                                        },
                                    ]}
                                />
                                <MenuItem href="/sell">Sell Your Car</MenuItem>
                                <MenuItem href="/about">About</MenuItem>
                                <MenuItem href="/contact">Contact</MenuItem>
                                <MenuItem href="/faq">FAQ</MenuItem>
                                <div className="p-4">
                                    <ThemeSwitcher />
                                </div>
                            </motion.nav>
                        )}
                    </AnimatePresence>
                </MaxWidthWrapper>
            </section>
        </motion.header>
    );
};

export default Navbar;
