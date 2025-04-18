import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Car } from "lucide-react";

export default function Terms() {
    return (
        <GuestLayout>
            <Head title="Terms of Service" />

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex justify-center">
                            <Car className="h-12 w-12 text-indigo-600" />
                        </div>
                        <h1 className="mt-6 text-3xl font-extrabold text-indigo-900">
                            Terms of Service
                        </h1>
                        <p className="mt-2 text-sm text-indigo-600">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 border border-indigo-100">
                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                1. Introduction
                            </h2>
                            <p className="text-gray-700">
                                Welcome to SokoMagari. By accessing or using our
                                platform, you agree to be bound by these Terms
                                of Service. Please read them carefully.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                2. Definitions
                            </h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>
                                    "Platform" refers to the SokoMagari website
                                    and services
                                </li>
                                <li>
                                    "User" refers to any individual or entity
                                    using our Platform
                                </li>
                                <li>
                                    "Content" refers to any information, text,
                                    or materials posted on the Platform
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                3. User Responsibilities
                            </h2>
                            <p className="text-gray-700 mb-4">
                                As a user of SokoMagari, you agree to:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>
                                    Provide accurate and complete information
                                </li>
                                <li>Maintain the security of your account</li>
                                <li>
                                    Comply with all applicable laws and
                                    regulations
                                </li>
                                <li>
                                    Not engage in any fraudulent or deceptive
                                    activities
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                4. Vehicle Listings
                            </h2>
                            <p className="text-gray-700">
                                When listing a vehicle on our Platform, you
                                must:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
                                <li>
                                    Provide accurate and complete vehicle
                                    information
                                </li>
                                <li>Include clear and recent photographs</li>
                                <li>Disclose any known issues or defects</li>
                                <li>Set a fair and reasonable price</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                5. Privacy
                            </h2>
                            <p className="text-gray-700">
                                Your privacy is important to us. Please review
                                our{" "}
                                <a
                                    href={route("policy.show")}
                                    className="text-indigo-600 hover:text-indigo-500 underline"
                                >
                                    Privacy Policy
                                </a>{" "}
                                to understand how we collect, use, and protect
                                your information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                6. Limitation of Liability
                            </h2>
                            <p className="text-gray-700">
                                SokoMagari is not responsible for any direct,
                                indirect, incidental, or consequential damages
                                resulting from your use of the Platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                7. Changes to Terms
                            </h2>
                            <p className="text-gray-700">
                                We reserve the right to modify these terms at
                                any time. We will notify users of any
                                significant changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                8. Contact Information
                            </h2>
                            <p className="text-gray-700">
                                If you have any questions about these Terms of
                                Service, please contact us at{" "}
                                <a
                                    href="mailto:support@sokomagari.com"
                                    className="text-indigo-600 hover:text-indigo-500"
                                >
                                    support@sokomagari.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
