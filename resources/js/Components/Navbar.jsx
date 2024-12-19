import React, { useState } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Close } from "./svgs/Close";
import { Hambuger } from "./svgs/Hambuger";
import BorderHover from "./BorderHover";
import Dropdown from "./Dropdown";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "@inertiajs/react";
import { ArrowDown } from "./svgs/ArrowDown";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const MenuItem = ({ href, children }) => (
        <BorderHover>
            <Link
                href={href}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
            >
                {children}
            </Link>
        </BorderHover>
    );

    const DropdownMenuItem = ({ title, items }) => (
        <BorderHover>
            <Dropdown>
                <Dropdown.Trigger>
                    <div className="flex items-center  gap-1 py-2">
                        <button className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200">
                            {title}
                        </button>
                        <div className="h-4 w-4">
                            <ArrowDown />
                        </div>
                    </div>
                </Dropdown.Trigger>
                <Dropdown.Content align="right" width="48">
                    {items.map((item, index) => (
                        <Dropdown.Link key={index} href={item.href}>
                            {item.text}
                        </Dropdown.Link>
                    ))}
                </Dropdown.Content>
            </Dropdown>
        </BorderHover>
    );

    return (
        <header className="bg-[#f0f9f4] dark:bg-[#060f0a] sticky top-0 z-[9999] border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <ApplicationLogo className="h-12 w-auto fill-current text-gray-800 dark:text-white" />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex space-x-4">
                        <DropdownMenuItem
                            title="Vehicles"
                            items={[
                                { href: "/vehicles", text: "All Vehicles" },
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
                                { href: "/bikes", text: "All Bikes" },
                                {
                                    href: "/contact",
                                    text: "Available in Kenya",
                                },
                                { href: "/faq", text: "Direct import" },
                            ]}
                        />
                        <MenuItem href={route("login")}>Sell Your Car</MenuItem>
                        <MenuItem href={route("about")}>About</MenuItem>
                        <MenuItem href={route("contact")}>Contact</MenuItem>
                        <MenuItem href={route("faq")}>FAQ</MenuItem>
                        <ThemeSwitcher />
                    </nav>

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
                </div>

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
                        <MenuItem href={route("login")}>Sell Your Car</MenuItem>
                        <MenuItem href={route("about")}>About</MenuItem>
                        <MenuItem href={route("contact")}>Contact</MenuItem>
                        <MenuItem href={route("faq")}>FAQ</MenuItem>
                        <ThemeSwitcher />
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Navbar;
