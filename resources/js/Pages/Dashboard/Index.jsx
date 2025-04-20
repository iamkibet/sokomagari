import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Car, DollarSign, BarChart, Edit, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";

export default function Index({ recentListings, financialMetrics }) {
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
                                                                <Trash2
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
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
