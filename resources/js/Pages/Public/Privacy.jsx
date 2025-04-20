import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Car } from "lucide-react";

export default function Privacy() {
    return (
        <GuestLayout>
            <Head title="Privacy Policy" />

            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="flex justify-center">
                            <Car className="h-12 w-12 text-indigo-600" />
                        </div>
                        <h1 className="mt-6 text-3xl font-extrabold text-indigo-900">
                            Privacy Policy
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
                                At SokoMagari, we are committed to protecting
                                your privacy. This Privacy Policy explains how
                                we collect, use, and safeguard your personal
                                information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                2. Information We Collect
                            </h2>
                            <p className="text-gray-700 mb-2">
                                We collect the following types of information:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>
                                    Personal information (name, email, phone
                                    number)
                                </li>
                                <li>Vehicle information for listings</li>
                                <li>Usage data and analytics</li>
                                <li>Communication preferences</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                3. How We Use Your Information
                            </h2>
                            <p className="text-gray-700 mb-2">
                                We use your information to:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Provide and improve our services</li>
                                <li>
                                    Process vehicle listings and transactions
                                </li>
                                <li>Communicate with you about your account</li>
                                <li>
                                    Send important updates and notifications
                                </li>
                                <li>Analyze and improve our platform</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                4. Information Sharing
                            </h2>
                            <p className="text-gray-700">
                                We do not sell your personal information. We may
                                share your information with:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
                                <li>
                                    Service providers who assist in our
                                    operations
                                </li>
                                <li>Law enforcement when required by law</li>
                                <li>
                                    Other users as necessary for vehicle
                                    transactions
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                5. Data Security
                            </h2>
                            <p className="text-gray-700">
                                We implement appropriate security measures to
                                protect your personal information. However, no
                                method of transmission over the internet is 100%
                                secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                6. Your Rights
                            </h2>
                            <p className="text-gray-700 mb-2">
                                You have the right to:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your information</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                7. Cookies and Tracking
                            </h2>
                            <p className="text-gray-700">
                                We use cookies and similar technologies to
                                improve your experience and analyze site usage.
                                You can control cookie settings through your
                                browser.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                8. Changes to Privacy Policy
                            </h2>
                            <p className="text-gray-700">
                                We may update this Privacy Policy from time to
                                time. We will notify you of any significant
                                changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-indigo-900 mb-4">
                                9. Contact Us
                            </h2>
                            <p className="text-gray-700">
                                If you have questions about this Privacy Policy,
                                please contact us at{" "}
                                <a
                                    href="mailto:privacy@sokomagari.com"
                                    className="text-indigo-600 hover:text-indigo-500"
                                >
                                    privacy@sokomagari.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
