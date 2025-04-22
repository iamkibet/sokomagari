import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { LogOutIcon, UserIcon } from "lucide-react";

// Reusable Icon component to handle SVG props consistently
const Icon = ({ children, className = "w-5 h-5" }) => (
    <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        {children}
    </svg>
);

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth < 1024;
            setIsMobile(isMobile);
            setIsSidebarOpen(!isMobile);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navigation = [
        {
            name: "Dashboard",
            route: "dashboard.index",
            icon: (
                <Icon>
                    <path
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                    />
                </Icon>
            ),
        },
        {
            name: "Vehicles",
            route: "dashboard.vehicles.index",
            icon: (
                <Icon>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                </Icon>
            ),
        },
        {
            name: "News",
            route: "public.news.index",
            icon: (
                <Icon>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                    />
                </Icon>
            ),
        },
        {
            name: "Create news",
            route: "dashboard.news.create",
            icon: (
                <Icon>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                </Icon>
            ),
        },
        {
            name: "Create vehicle",
            route: "dashboard.vehicles.create",
            icon: (
                <Icon>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                </Icon>
            ),
        },
    ];

    return (
        <>
            <Head />
            <div className="min-h-screen bg-gray-50/50">
                {/* Mobile Overlay */}
                {isMobile && isSidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/40 lg:hidden backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Mobile Sidebar Toggle */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-xl shadow-sm hover:shadow transition-shadow"
                    aria-label="Toggle sidebar"
                >
                    <Icon className="w-6 h-6">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </Icon>
                </button>

                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-out pt-4 border-r border-gray-100
                        ${
                            isSidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        } lg:translate-x-0`}
                >
                    <div className="flex flex-col h-full">
                        <div className="px-4 pb-4 border-b border-gray-100">
                            <Link href="/" className="flex items-center gap-3">
                                <ApplicationLogo className="block h-8 w-auto text-primary/60" />
                                
                            </Link>
                        </div>

                        <nav className="flex-1 overflow-y-auto px-2 mt-5">
                            <ul className="flex flex-col space-y-1">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <NavLink
                                            href={route(item.route)}
                                            active={route().current(item.route)}
                                            className="group flex items-center gap-x-3 px-4 py-3  hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-primary-600">
                                                {item.icon}
                                            </span>
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600">
                                                {item.name}
                                            </span>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* User Account Dropdown */}
                        <div className="p-4 border-t border-gray-100">
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setIsDropdownOpen((prev) => !prev)
                                    }
                                    className="flex items-center w-full p-2 text-left rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                                    aria-expanded={isDropdownOpen}
                                    aria-controls="user-menu"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div
                                            className="flex items-center justify-center h-9 w-9 rounded-full bg-primary-100 text-primary-800 font-medium uppercase"
                                            aria-hidden="true"
                                        >
                                            {user.initials || user.name[0]}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </button>

                                {/* Dropdown Overlay and Menu */}
                                {isDropdownOpen && (
                                    <div
                                        className="fixed inset-0 z-50"
                                        onClick={() => setIsDropdownOpen(false)}
                                        role="presentation"
                                    >
                                        <div className="absolute bottom-0 right-0 w-64 bg-white rounded-lg shadow-lg border border-gray-100 transform translate-y-[-100%] translate-x-[-16px] transition-opacity duration-200 ease-out">
                                            <nav
                                                id="user-menu"
                                                className="py-2"
                                                aria-label="User menu"
                                            >
                                                <Link
                                                    href={route(
                                                        "dashboard.profile.edit",
                                                        { profile: user.id }
                                                    )}
                                                    className="flex items-center px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
                                                    onClick={() =>
                                                        setIsDropdownOpen(false)
                                                    }
                                                >
                                                    <UserIcon className="w-5 h-5 mr-3 text-gray-400" />
                                                    Profile Settings
                                                </Link>

                                                <form
                                                    action={route("logout")}
                                                    method="POST"
                                                    className="border-t border-gray-100"
                                                >
                                                    <button
                                                        type="submit"
                                                        className="flex items-center w-full px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors text-red-600"
                                                    >
                                                        <LogOutIcon className="w-5 h-5 mr-3 text-red-400" />
                                                        Log Out
                                                    </button>
                                                </form>
                                            </nav>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="lg:pl-64">
                    {/* Page Header */}
                    {header && (
                        <header className="bg-white border-b border-gray-100">
                            <div className="px-6 py-4 mx-auto max-w-7xl">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-semibold text-gray-900">
                                        {header}
                                    </h1>
                                    {/* Add any header actions here */}
                                </div>
                            </div>
                        </header>
                    )}

                    {/* Main Content Area */}
                    <main className="p-6">
                        <div className="mx-auto max-w-7xl">
                            <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6">{children}</div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
