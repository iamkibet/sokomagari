import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I schedule a test drive?",
            answer: "You can schedule a test drive by visiting our showroom during business hours or by calling our sales team at +254 700 000 000. We recommend booking in advance to ensure your preferred vehicle is available.",
        },
        {
            question: "What documents do I need to purchase a vehicle?",
            answer: "To purchase a vehicle, you'll need a valid Kenyan ID or passport, proof of residence, and a valid driver's license. For financing options, additional documents like proof of income and bank statements may be required.",
        },
        {
            question: "Do you offer financing options?",
            answer: "Yes, we offer various financing options through our partner banks and financial institutions. Our sales team can help you find the best financing solution based on your needs and financial situation.",
        },
        {
            question: "What is your return policy?",
            answer: "We offer a 7-day return policy for all vehicles purchased from our dealership, subject to certain conditions. The vehicle must be in the same condition as when purchased, with no more than 500km driven.",
        },
        {
            question: "Do you provide vehicle maintenance services?",
            answer: "Yes, we have a fully equipped service center with certified technicians. We offer regular maintenance, repairs, and genuine spare parts for all vehicles sold through our dealership.",
        },
        {
            question: "How do I check the vehicle's history?",
            answer: "We provide a comprehensive vehicle history report for all our vehicles, including service records, accident history, and ownership details. You can request this information from our sales team.",
        },
        {
            question: "What warranty do you offer on vehicles?",
            answer: "All our vehicles come with a minimum 3-month warranty. Extended warranty options are available for purchase. The warranty covers major mechanical and electrical components.",
        },
        {
            question: "Can I trade in my current vehicle?",
            answer: "Yes, we accept trade-ins. Our team will evaluate your current vehicle and offer a fair market value. This value can be used as part of your payment for a new vehicle.",
        },
    ];

    return (
        <GuestLayout>
            <Head title="Frequently Asked Questions - SokoMagari" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Find answers to common questions about our services
                            and vehicle purchasing process.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
                        />
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
                            >
                                <button
                                    className="w-full px-6 py-4 text-left focus:outline-none"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                            {faq.question}
                                        </h3>
                                        <svg
                                            className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform ${
                                                openIndex === index
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </div>
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Section */}
                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Still Have Questions?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Our team is here to help. Contact us for more
                            information.
                        </p>
                        <a
                            href={route("public.contact")}
                            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
