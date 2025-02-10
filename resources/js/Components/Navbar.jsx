import React, { useState } from "react";
import ApplicationLogo from "./ApplicationLogo";
import { Close } from "./svgs/Close";
import { Hambuger } from "./svgs/Hambuger";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link } from "@inertiajs/react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Arrow } from "@radix-ui/react-select";
import { ArrowDown } from "./svgs/ArrowDown";
import DropdownMenuItem from "./DropDownMenuItem";
import SearchBar from "./SearchBar";

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
            ${active ? "border-t-2 border-[#f75d34]" : ""}
            hover:border-t-2 border-[#f75d34]`}
        >
            {children}
        </Link>
    );

    return (
        <header className=" text-[#040316] dark:text-[#eae9fc] bg-[#fbfbfe] dark:bg-[rgb(33,33,33)] sticky top-0 z-[999] border-none md:border-b shadow-none md:shadow-sm dark:border-gray-800">
            <section>
                <MaxWidthWrapper className="flex md:items-center justify-between flex-col space-y-4 md:flex-row md:space-y-0   border-b-[0.5px] py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
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

                            <a href="/" className="cursor-pointer">
                                <ApplicationLogo />
                            </a>
                        </div>
                        <div className="flex items-center gap-1 md:hidden">
                            <a href="/"> {heartSvg}</a>
                            <a href="/">{userProfileSvg}</a>
                        </div>
                    </div>

                    <SearchBar />
                    <div className="hidden md:flex items-center justify-between space-x-4">
                        <p className="flex items-center text-xs">
                            English <span>{DownSvg}</span>
                        </p>
                        <a href="/"> {heartSvg}</a>
                        <a className="flex gap-2 text-sm"> {userProfileSvg}</a>
                    </div>
                </MaxWidthWrapper>
            </section>
            <section>
                <MaxWidthWrapper>
                    <div className="flex justify-between items-center">
                        {/* Desktop Menu */}

                        <nav className="hidden md:flex space-x-4 ">
                            <DropdownMenuItem
                                title="New Cars"
                                items={[
                                    {
                                        href: "/vehicles",
                                        text: "New cars",
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
                                title="Used Cars"
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
                            <DropdownMenuItem
                                title="News & Reviews"
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
                            <DropdownMenuItem
                                title="Videos"
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

                            <ThemeSwitcher />
                        </nav>
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            {LocationSvg} <span>Select City</span> <ArrowDown />
                        </div>
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
