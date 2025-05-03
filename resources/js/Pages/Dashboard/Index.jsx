import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Car, DollarSign, BarChart, Edit, Trash2, Trash2Icon, PencilIcon, EyeIcon, TrashIcon } from "lucide-react";
import { router } from "@inertiajs/react";
import { formatDistanceToNow } from 'date-fns';



export default function Index({ recentListings, financialMetrics, newsMetrics, recentNews }) {
    // Ensure recentListings is an array
    const listingsArray = Array.isArray(recentListings)
        ? recentListings
        : recentListings?.data || [];

    // Format large numbers for better display
    const formatCurrency = (value) => {
        if (!value) return "0";

        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}K`;
        } else {
            return value.toString();
        }
    };

    // Handle delete with confirmation
    const handleDelete = (slug) => {
        if (
            confirm(
                "Are you sure you want to delete this vehicle? This action cannot be undone."
            )
        ) {
            router.delete(route("dashboard.vehicles.destroy", slug));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Total Vehicles */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-primary rounded-md p-3">
                                    <Car className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-5">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Vehicles
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        {listingsArray.length || 0}
                                    </dd>
                                </div>
                            </div>
                        </div>

                        {/* Total Value */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-primary rounded-md p-3">
                                    <DollarSign className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-5">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Total Value
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        KES{" "}
                                        {formatCurrency(
                                            financialMetrics?.total_value || 0
                                        )}
                                    </dd>
                                </div>
                            </div>
                        </div>

                        {/* Average Days to Sell */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-primary rounded-md p-3">
                                    <BarChart className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-5">
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Avg. Days to Sell
                                    </dt>
                                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                                        {Math.round(
                                            financialMetrics?.avg_days_to_sell
                                        ) || 0}{" "}
                                        days
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* News Metrics Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">News Analytics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-blue-900">Total Articles</h3>
                                    <p className="text-3xl font-bold text-blue-700">{newsMetrics.total_articles}</p>
                                    <div className="flex justify-between mt-2 text-sm text-blue-600">
                                        <span>Published: {newsMetrics.published_articles}</span>
                                        <span>Drafts: {newsMetrics.draft_articles}</span>
                                    </div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-green-900">Total Views</h3>
                                    <p className="text-3xl font-bold text-green-700">{newsMetrics.total_views}</p>
                                    <p className="text-sm text-green-600 mt-2">
                                        Avg: {Math.round(newsMetrics.avg_views)} views/article
                                    </p>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-purple-900">Engagement</h3>
                                    <p className="text-3xl font-bold text-purple-700">
                                        {Math.round(newsMetrics.engagement_metrics.avg_read_time)} min
                                    </p>
                                    <p className="text-sm text-purple-600 mt-2">
                                        Avg read time
                                    </p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-yellow-900">Comments</h3>
                                    <p className="text-3xl font-bold text-yellow-700">
                                        {newsMetrics.engagement_metrics.total_comments}
                                    </p>
                                    <p className="text-sm text-yellow-600 mt-2">
                                        Total interactions
                                    </p>
                                </div>
                            </div>

                            {/* Top Performing Articles */}
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Articles</h3>
                                <div className="space-y-4">
                                    {newsMetrics.top_performing.map((article) => (
                                        <div key={article.title} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{article.title}</h4>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDistanceToNow(new Date(article.published_at))} ago
                                                    </p>
                                                </div>
                                                <span className="text-lg font-semibold text-blue-600">
                                                    {article.views} views
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Listings */}
                    <div className="mt-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">
                                    Recent Listings
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Vehicle
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Listed
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {listingsArray.map((listing) => (
                                                <tr
                                                    key={listing.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {listing.make}{" "}
                                                            {listing.model}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {listing.year}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            KES{" "}
                                                            {listing.price?.raw
                                                                ? formatCurrency(
                                                                      listing
                                                                          .price
                                                                          .raw
                                                                  )
                                                                : listing.price
                                                                      ?.formatted}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                listing.status
                                                                    ?.availability ===
                                                                "available"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : listing
                                                                          .status
                                                                          ?.availability ===
                                                                      "pending"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : "bg-red-100 text-red-800"
                                                            }`}
                                                        >
                                                            {listing.status
                                                                ?.status_label ||
                                                                listing.status
                                                                    ?.availability ||
                                                                "Unknown"}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {listing.dates?.listed}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <div className="flex space-x-3">
                                                            <Link
                                                                href={
                                                                    listing
                                                                        .links
                                                                        ?.edit
                                                                }
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                <Edit
                                                                    size={18}
                                                                />
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        listing.slug
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-900"
                                                                type="button"
                                                            >
                                                                <Trash2Icon
                                                                    size={18}
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent News Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Recent News Articles</h2>
                                <Link
                                    href={route('dashboard.news.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700"
                                >
                                    Create New Article
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {recentNews.map((article) => (
                                            <tr key={article.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                                                    <div className="text-sm text-gray-500">{article.excerpt}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        article.is_published
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {article.is_published ? 'Published' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {article.metrics.views}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {article.published_at
                                                        ? formatDistanceToNow(new Date(article.published_at)) + ' ago'
                                                        : 'Not published'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={article.links.edit}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            <PencilIcon className="h-5 w-5" />
                                                        </Link>
                                                        <Link
                                                            href={article.links.preview}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            <EyeIcon className="h-5 w-5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Are you sure you want to delete this article?')) {
                                                                    // Handle delete
                                                                }
                                                            }}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <TrashIcon className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
