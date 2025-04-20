import { Head } from "@inertiajs/react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    Building2,
    Globe,
} from "lucide-react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contact.submit"), {
            onSuccess: () => {
                reset();
                // Show success message
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Contact Us" />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-primary to-indigo-800">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Get in Touch
                    </h1>
                    <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                        Have questions about our vehicles or services? We're
                        here to help. Reach out to us through any of the
                        channels below or fill out the contact form.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-2 md:gap-8">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                                    Contact Information
                                </h2>
                                <div className="mt-3">
                                    <p className="text-lg text-gray-500 dark:text-gray-400">
                                        Get in touch with us for any inquiries
                                        about our vehicles or services.
                                    </p>
                                </div>
                                <div className="mt-8 space-y-6">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                                <Phone className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Phone
                                            </h3>
                                            <p className="mt-1 text-gray-500 dark:text-gray-400">
                                                +254 720 449 012
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Mon-Fri 8am to 6pm
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                                <Mail className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Email
                                            </h3>
                                            <p className="mt-1 text-gray-500 dark:text-gray-400">
                                                info@sokomagari.com
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                                <Building2 className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                Address
                                            </h3>
                                            <p className="mt-1 text-gray-500 dark:text-gray-400">
                                                Nairobi, Kenya
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Business Hours
                                </h3>
                                <div className="mt-4 space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Monday - Friday
                                        </span>
                                        <span className="text-gray-900 dark:text-white">
                                            8:00 AM - 6:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Saturday
                                        </span>
                                        <span className="text-gray-900 dark:text-white">
                                            9:00 AM - 4:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">
                                            Sunday
                                        </span>
                                        <span className="text-gray-900 dark:text-white">
                                            Closed
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="mt-12 sm:mt-16 md:mt-0">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                                    Send us a message
                                </h2>
                                <form
                                    onSubmit={handleSubmit}
                                    className="mt-8 space-y-6"
                                >
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                                />
                                                {errors.name && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Email
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                                />
                                                {errors.email && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div>
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Phone
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="phone"
                                                    value={data.phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            "phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                                />
                                                {errors.phone && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {errors.phone}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="subject"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                Subject
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    id="subject"
                                                    value={data.subject}
                                                    onChange={(e) =>
                                                        setData(
                                                            "subject",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                                />
                                                {errors.subject && (
                                                    <p className="mt-2 text-sm text-red-600">
                                                        {errors.subject}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                        >
                                            Message
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                value={data.message}
                                                onChange={(e) =>
                                                    setData(
                                                        "message",
                                                        e.target.value
                                                    )
                                                }
                                                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                                            />
                                            {errors.message && (
                                                <p className="mt-2 text-sm text-red-600">
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/85 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <span className="flex items-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                <span className="flex items-center">
                                                    <Send className="mr-2 h-5 w-5" />
                                                    Send Message
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
