import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function About() {
    return (
        <GuestLayout>
            <Head title="About Us - SokoMagari" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            About SokoMagari
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Your trusted partner in the automotive industry,
                            providing quality vehicles and exceptional service
                            since 2020.
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Our Mission
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                To revolutionize the car buying experience in
                                Kenya by providing transparent, reliable, and
                                customer-focused services. We aim to make car
                                ownership accessible and enjoyable for everyone.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                                Our Vision
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                To become Kenya's leading automotive
                                marketplace, setting new standards in vehicle
                                sales, customer service, and industry
                                innovation.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                            Our Core Values
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Integrity",
                                    description:
                                        "We conduct our business with honesty and transparency, building trust with our customers.",
                                    icon: (
                                        <svg
                                            className="w-8 h-8 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Excellence",
                                    description:
                                        "We strive for excellence in every aspect of our service, from vehicle quality to customer care.",
                                    icon: (
                                        <svg
                                            className="w-8 h-8 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    title: "Innovation",
                                    description:
                                        "We continuously innovate to provide better solutions and improve the car buying experience.",
                                    icon: (
                                        <svg
                                            className="w-8 h-8 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    ),
                                },
                            ].map((value) => (
                                <div
                                    key={value.title}
                                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                                >
                                    <div className="mb-4">{value.icon}</div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
                            Our Team
                        </h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                {
                                    name: "John Doe",
                                    role: "CEO & Founder",
                                    image: "/images/team/john.jpg",
                                },
                                {
                                    name: "Jane Smith",
                                    role: "Sales Director",
                                    image: "/images/team/jane.jpg",
                                },
                                {
                                    name: "Mike Johnson",
                                    role: "Operations Manager",
                                    image: "/images/team/mike.jpg",
                                },
                                {
                                    name: "Sarah Williams",
                                    role: "Customer Service Lead",
                                    image: "/images/team/sarah.jpg",
                                },
                            ].map((member) => (
                                <div key={member.name} className="text-center">
                                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {member.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {member.role}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-primary text-white rounded-lg p-8 mb-16">
                        <div className="grid md:grid-cols-4 gap-8 text-center">
                            {[
                                { number: "1000+", label: "Vehicles Sold" },
                                { number: "5000+", label: "Happy Customers" },
                                { number: "50+", label: "Team Members" },
                                { number: "4.9", label: "Customer Rating" },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-4xl font-bold mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm opacity-90">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Ready to Find Your Perfect Vehicle?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            Browse our extensive inventory of quality vehicles
                            and experience the SokoMagari difference.
                        </p>
                        <a
                            href={route("public.vehicles.index")}
                            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Browse Vehicles
                        </a>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
