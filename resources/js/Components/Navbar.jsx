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
import { Search, Heart, User, MapPin, ChevronDown } from "lucide-react";
import SearchBar from "./SearchBar";

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
    const [showTopBar, setShowTopBar] = useState(true);
    const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    const [selectedCity, setSelectedCity] = useState("Nairobi");
    const { auth } = usePage().props;

    const cities = [
        "Nairobi",
        "Mombasa",
        "Kisumu",
        "Nakuru",
        "Eldoret",
        "Thika",
        "Malindi",
        "Kitale",
        "Garissa",
        "Kakamega",
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 20);
            setShowTopBar(scrollPosition < 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (route) => window.location.pathname === route;

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

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setIsCityDropdownOpen(false);
    };

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
            {/* Top Bar */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{
                    opacity: showTopBar ? 1 : 0,
                    height: showTopBar ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="bg-primary text-white overflow-hidden"
            >
                <MaxWidthWrapper>
                    {/* Mobile View */}
                    <div className="md:hidden flex flex-col items-center space-y-2 text-xs py-2">
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>Nairobi, Kenya</span>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <span className="text-center">
                                Mon-Fri: 8:00 AM - 6:00 PM
                            </span>
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/contact"
                                    className="hover:text-primary/80 transition-colors"
                                >
                                    Contact
                                </Link>
                                <ThemeSwitcher />
                            </div>
                        </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:flex items-center justify-between text-sm py-2">
                        <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                Nairobi, Kenya
                            </span>
                            <span>|</span>
                            <span>Mon-Fri: 8:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/contact"
                                className="hover:text-primary/80 transition-colors"
                            >
                                Contact Us
                            </Link>
                            <ThemeSwitcher />
                        </div>
                    </div>
                </MaxWidthWrapper>
            </motion.div>

            {/* Main Navigation */}
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
                                <Heart className="w-5 h-5" />
                            </Link>
                            {auth.user ? (
                                <Link
                                    href="/profile"
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                </Link>
                            ) : (
                                <Link
                                    href="/login"
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
                        <SearchBar />
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        {/* <Link
                            href="/favorites"
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                            <Heart className="w-5 h-5" />
                        </Link> */}
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span className="hidden md:inline">
                                    {auth.user.name}
                                </span>
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="group flex items-center gap-3 px-4 py-2.5 rounded-xl 
              dark:bg-primary-dark/10 dark:hover:bg-primary-dark/20
             transition-all duration-200 ease-out
             hover:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/70
             border border-transparent hover:border-primary/5 dark:hover:border-white/5
             text-primary-600 dark:text-primary-200"
                                role="button"
                                aria-label="Demo login access"
                            >
                                <User
                                    className="w-5 h-5 opacity-80 group-hover:opacity-100 
                 transition-opacity dark:text-primary-300"
                                />
                            </Link>
                        )}
                    </div>
                </MaxWidthWrapper>
            </section>

            {/* Navigation Menu */}
            <section className="border-b border-gray-200 dark:border-gray-800">
                <MaxWidthWrapper>
                    <div className="flex justify-between items-center">
                        <nav className="hidden md:flex space-x-4">
                            <DropdownMenuItem
                                title="Vehicles"
                                items={[
                                    {
                                        href: "/showroom",
                                        text: "All Vehicles",
                                    },
                                    {
                                        href: "/showroom?type=sedan",
                                        text: "Sedans",
                                    },
                                    {
                                        href: "/showroom?type=suv",
                                        text: "SUVs",
                                    },
                                    {
                                        href: "/showroom?type=truck",
                                        text: "Trucks",
                                    },
                                    {
                                        href: "/showroom?type=van",
                                        text: "Vans",
                                    },
                                    {
                                        href: "/showroom?location=kenya",
                                        text: "Available in Kenya",
                                    },
                                    {
                                        href: "/showroom?import=direct",
                                        text: "Direct Import",
                                    },
                                ]}
                                active={isActive("/showroom")}
                            />
                            <DropdownMenuItem
                                title="Bikes"
                                items={[
                                    { href: "/bikes", text: "All Bikes" },
                                    {
                                        href: "/showroom?type=sports",
                                        text: "Sports Bikes",
                                    },
                                    {
                                        href: "/showroom?type=cruiser",
                                        text: "Cruisers",
                                    },
                                    {
                                        href: "/showroom?type=offroad",
                                        text: "Off-Road",
                                    },
                                    {
                                        href: "/showroom?location=kenya",
                                        text: "Available in Kenya",
                                    },
                                ]}
                                active={isActive("/bikes")}
                            />
                            <DropdownMenuItem
                                title="Services"
                                items={[
                                    {
                                        href: "/services/financing",
                                        text: "Financing",
                                    },
                                    {
                                        href: "/services/insurance",
                                        text: "Insurance",
                                    },
                                    {
                                        href: "/services/maintenance",
                                        text: "Maintenance",
                                    },
                                    {
                                        href: "/services/inspection",
                                        text: "Vehicle Inspection",
                                    },
                                    {
                                        href: "/services/import",
                                        text: "Import Services",
                                    },
                                ]}
                                active={isActive("/services")}
                            />
                            <DropdownMenuItem
                                title="News & Reviews"
                                items={[
                                    { href: "/news", text: "Latest News" },
                                    {
                                        href: "/",
                                        text: "Vehicle Reviews",
                                    },
                                    { href: "/", text: "Buying Guides" },
                                ]}
                                active={isActive("/blog") || isActive("/news")}
                            />
                            <DropdownMenuItem
                                title="About Us"
                                items={[
                                    { href: "/about", text: "About Us" },
                                    { href: "/contact", text: "Contact" },
                                    { href: "/faq", text: "FAQ" },
                                    {
                                        href: "/testimonials",
                                        text: "Testimonials",
                                    },
                                    { href: "/careers", text: "Careers" },
                                ]}
                                active={
                                    isActive("/about") ||
                                    isActive("/contact") ||
                                    isActive("/faq")
                                }
                            />
                        </nav>
                        <div className="relative">
                            <button
                                onClick={() =>
                                    setIsCityDropdownOpen(!isCityDropdownOpen)
                                }
                                className="hidden md:flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                                <MapPin className="w-5 h-5" />
                                <span className="text-gray-600 dark:text-gray-300">
                                    {selectedCity}
                                </span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        isCityDropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            <AnimatePresence>
                                {isCityDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                                    >
                                        {cities.map((city) => (
                                            <button
                                                key={city}
                                                onClick={() =>
                                                    handleCitySelect(city)
                                                }
                                                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                                                    selectedCity === city
                                                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                                                        : "text-gray-700 dark:text-gray-300"
                                                }`}
                                            >
                                                {city}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.nav
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden mt-4 space-y-2"
                            >
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        placeholder="Search vehicles..."
                                        className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <DropdownMenuItem
                                    title="Vehicles"
                                    items={[
                                        {
                                            href: "/showroom",
                                            text: "All Vehicles",
                                        },
                                        {
                                            href: "/showroom?type=sedan",
                                            text: "Sedans",
                                        },
                                        {
                                            href: "/showroom?type=suv",
                                            text: "SUVs",
                                        },
                                        {
                                            href: "/showroom?type=truck",
                                            text: "Trucks",
                                        },
                                        {
                                            href: "/showroom?type=van",
                                            text: "Vans",
                                        },
                                    ]}
                                />
                                <DropdownMenuItem
                                    title="Bikes"
                                    items={[
                                        { href: "/bikes", text: "All Bikes" },
                                        {
                                            href: "/bikes?type=sports",
                                            text: "Sports Bikes",
                                        },
                                        {
                                            href: "/bikes?type=cruiser",
                                            text: "Cruisers",
                                        },
                                        {
                                            href: "/bikes?type=offroad",
                                            text: "Off-Road",
                                        },
                                    ]}
                                />
                                <DropdownMenuItem
                                    title="Services"
                                    items={[
                                        {
                                            href: "/services/financing",
                                            text: "Financing",
                                        },
                                        {
                                            href: "/services/insurance",
                                            text: "Insurance",
                                        },
                                        {
                                            href: "/services/maintenance",
                                            text: "Maintenance",
                                        },
                                    ]}
                                />
                                <MenuItem href="/sell">Sell Your Car</MenuItem>
                                <MenuItem href="/about">About</MenuItem>
                                <MenuItem href="/contact">Contact</MenuItem>
                                <MenuItem href="/faq">FAQ</MenuItem>
                            </motion.nav>
                        )}
                    </AnimatePresence>
                </MaxWidthWrapper>
            </section>
        </motion.header>
    );
};

export default Navbar;
