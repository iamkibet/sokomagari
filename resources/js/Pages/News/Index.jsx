import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";

export default function Index({ news, auth }) {
    return (
        <GuestLayout>
            <Head title="News" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h1 className="text-3xl font-bold">
                                    Latest News
                                </h1>
                                {auth?.user && (
                                    <Link
                                        href={route("dashboard.news.create")}
                                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        Create News
                                    </Link>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {news.data.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route("public.news.show", item.slug)}
                                        className="group"
                                    >
                                        <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                                            {item.featured_image && (
                                                <img
                                                    src={`/storage/${item.featured_image}`}
                                                    alt={item.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                            )}
                                            <div className="p-6">
                                                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h2>
                                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                    {item.excerpt}
                                                </p>
                                                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <span>
                                                        {format(
                                                            new Date(
                                                                item.published_at
                                                            ),
                                                            "MMMM d, yyyy"
                                                        )}
                                                    </span>
                                                    <span>Read More →</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {news.links.length > 3 && (
                                <div className="mt-8">
                                    {news.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-4 py-2 mx-1 rounded-lg ${
                                                link.active
                                                    ? "bg-primary text-white"
                                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
