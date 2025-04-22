import React from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import {
    ArrowRight,
    Trophy,
    Sparkles,
    Shield,
    HeartPulse,
    Users,
} from "lucide-react";

export default function About() {
    return (
        <GuestLayout>
            <Head title="About Us - SokoMagari" />

            {/* Hero Section with Animated Background */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                {/* Decorative Gradient Blobs */}
                <div className="absolute inset-x-0 -top-48 -z-10 transform-gpu overflow-hidden blur-3xl">
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#002f6b] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Redefining Automotive Excellence
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Pioneering transparent vehicle solutions with
                            cutting-edge technology and customer-first
                            innovation since 2018
                        </p>
                    </div>
                </div>

                {/* Animated Grid Pattern */}
                <div
                    className="absolute inset-0 -z-10 opacity-10"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Mission/Vision Section */}
            <div className="relative py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Mission Card */}
                        <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 group hover:border-primary/20 transition-all duration-300">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-gray-50 -z-10" />
                            <div className="absolute inset-0 rounded-3xl border border-gray-100/30 -z-20" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-primary/10 rounded-xl">
                                    <Trophy
                                        className="w-8 h-8 text-primary"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Our Mission
                                </h2>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To revolutionize East Africa's automotive
                                landscape through ethical practices,
                                technological innovation, and unparalleled
                                customer experiences that set new industry
                                standards.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 group hover:border-primary/20 transition-all duration-300">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-gray-50 -z-10" />
                            <div className="absolute inset-0 rounded-3xl border border-gray-100/30 -z-20" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-primary/10 rounded-xl">
                                    <Sparkles
                                        className="w-8 h-8 text-primary"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Our Vision
                                </h2>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                To become Africa's most trusted automotive
                                ecosystem, empowering mobility solutions that
                                drive economic growth while maintaining
                                sustainable environmental practices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="py-24 sm:py-32 bg-gray-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-20">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Foundational Principles
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            The bedrock of our operational philosophy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Integrity First",
                                description:
                                    "Uncompromising ethical standards in every transaction",
                            },
                            {
                                icon: HeartPulse,
                                title: "Customer Empathy",
                                description:
                                    "Solutions designed around real human needs",
                            },
                            {
                                icon: Users,
                                title: "Collective Growth",
                                description:
                                    "Empowering communities through mobility access",
                            },
                        ].map((value, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl -z-10" />
                                <div className="mb-6">
                                    <div className="p-3 bg-primary/10 rounded-lg w-max">
                                        <value.icon
                                            className="w-8 h-8 text-primary"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="relative py-24 sm:py-32 bg-gradient-to-br from-gray-900 to-primary-dark">
                <div className="absolute inset-0 bg-[url('/images/texture.png')] opacity-10 mix-blend-soft-light" />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-2 gap-x-8 gap-y-16 text-center md:grid-cols-4">
                        {[
                            { metric: "99.7%", label: "Customer Satisfaction" },
                            { metric: "10K+", label: "Vehicles Delivered" },
                            { metric: "40M+", label: "Transaction Value" },
                            { metric: "24/7", label: "Support Coverage" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="mx-auto flex max-w-xs flex-col gap-y-4"
                            >
                                <dt className="text-4xl font-bold text-white leading-7">
                                    {stat.metric}
                                </dt>
                                <dd className="text-sm leading-6 text-gray-200">
                                    {stat.label}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* Leadership Team */}
            {/* <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-20">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Executive Leadership
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Visionaries driving automotive innovation
                        </p>
                    </div>

                    <div className="grid gap-12 md:grid-cols-4">
                        {[
                            {
                                name: "Amina Okeke",
                                role: "Chief Executive Officer",
                                image: "/images/team/amina.jpg",
                            },
                            {
                                name: "Chinedu Nwankwo",
                                role: "Operations Director",
                                image: "/images/team/chinedu.jpg",
                            },
                            {
                                name: "Zahara Mohammed",
                                role: "Technology Lead",
                                image: "/images/team/zahara.jpg",
                            },
                            {
                                name: "Kwame Asante",
                                role: "Customer Experience",
                                image: "/images/team/kwame.jpg",
                            },
                        ].map((member, idx) => (
                            <div key={idx} className="group relative">
                                <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100 transition-all duration-300 hover:rounded-3xl">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="mt-6 text-center">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {member.name}
                                    </h3>
                                    <p className="mt-1 text-gray-600">
                                        {member.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}

            {/* CTA Section */}
            <div className="relative py-24 bg-gray-900">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gradient-to-r from-primary to-primary-dark px-6 py-16 text-center shadow-2xl rounded-3xl sm:px-16">
                        <h2 className="mx-auto max-w-2xl text-3xl font-bold text-white">
                            Ready for Exceptional Mobility?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
                            Discover your ideal vehicle through Africa's most
                            trusted automotive platform
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href={route("public.vehicles.index")}
                                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
                            >
                                Browse Inventory
                                <ArrowRight
                                    className="w-4 h-4"
                                    strokeWidth={2.5}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
