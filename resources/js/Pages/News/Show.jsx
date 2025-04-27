import React from "react";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Show({ news, relatedNews }) {
    return (
        <GuestLayout>
            <Head title={news.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900 dark:text-gray-100">
                            {/* Featured Image */}
                            {news.featured_image && (
                                <div className="mb-8">
                                    <img
                                        src={`/storage/${news.featured_image}`}
                                        alt={news.title}
                                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                                    />
                                </div>
                            )}

                            {/* Article Header */}
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold mb-4 leading-tight">
                                    {news.title}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <span>
                                        Published on{" "}
                                        {format(
                                            new Date(news.published_at),
                                            "MMMM d, yyyy"
                                        )}
                                    </span>
                                    <span>•</span>
                                    <span>By SokoMagari Team</span>
                                </div>
                            </div>

                            {/* Article Content */}
                            <article className="prose dark:prose-invert max-w-none">
                                <div className="mb-8 text-lg text-gray-700 dark:text-gray-300">
                                    {news.excerpt}
                                </div>

                                <div
                                    className="prose dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html: news.content,
                                    }}
                                />
                            </article>

                            {/* Tags */}
                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {news.tags?.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Share Buttons */}
                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
                                    Share this article
                                </h3>
                                <div className="flex gap-4">
                                    <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </button>
                                    <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </button>
                                    <button className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition-colors">
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Related News */}
                            {relatedNews.length > 0 && (
                                <div className="mt-16">
                                    <h2 className="text-2xl font-bold mb-6">
                                        More from SokoMagari
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {relatedNews.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={route(
                                                    "public.news.show",
                                                    item.slug
                                                )}
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
                                                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                            {format(
                                                                new Date(
                                                                    item.published_at
                                                                ),
                                                                "MMMM d, yyyy"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Newsletter Signup */}
                            <div className="mt-16 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <h3 className="text-xl font-semibold mb-4">
                                    Stay Updated
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Subscribe to our newsletter for the latest
                                    car news, reviews, and updates.
                                </p>
                                <form className="flex gap-4">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
