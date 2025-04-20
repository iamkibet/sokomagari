import React from "react";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Car,
    Facebook,
    Twitter,
    Instagram,
    Youtube,
} from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import ApplicationLogo from "./ApplicationLogo";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Vehicles", href: "/vehicles" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy-policy" },
    ];

    const services = [
        "Vehicle Sales",
        "Vehicle Financing",
        "Trade-in Services",
        "Vehicle Inspection",
        "Maintenance Services",
        "Parts & Accessories",
    ];

    const contactInfo = [
        { icon: Phone, text: "+254 700 000 000" },
        { icon: Mail, text: "info@sokomagari.com" },
        { icon: MapPin, text: "Nairobi, Kenya" },
        { icon: Clock, text: "Mon - Sat: 8:00 AM - 6:00 PM" },
    ];

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Youtube, href: "#", label: "YouTube" },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div class="relative text-lg md:text-3xl font-bold text-primary">
                                <span class="tracking-tight uppercase">
                                    Soko <span class="text-white">Magari</span>
                                </span>
                            </div>
                        </div>
                        <p className="text-sm">
                            Your trusted partner in finding the perfect vehicle.
                            We offer a wide range of quality vehicles and
                            exceptional service.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                                    aria-label={label}
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm hover:text-primary transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Our Services
                        </h3>
                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service}>
                                    <a
                                        href="#"
                                        className="text-sm hover:text-primary transition-colors duration-300"
                                    >
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-3">
                            {contactInfo.map(({ icon: Icon, text }) => (
                                <li
                                    key={text}
                                    className="flex items-center gap-3"
                                >
                                    <Icon className="w-5 h-5 text-primary" />
                                    <span className="text-sm">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm">
                            © {currentYear} Sokomagari. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
