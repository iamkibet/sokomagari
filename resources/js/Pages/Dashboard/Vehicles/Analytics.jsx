import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Eye, Clock, BarChart2 } from "react-feather";

export default function Analytics({ vehicle, analytics }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Analytics: {vehicle.make} {vehicle.model} {vehicle.year}
                </h2>
            }
        >
            <Head title={`Analytics - ${vehicle.make} ${vehicle.model}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href={route(
                                "dashboard.vehicles.show",
                                vehicle.slug
                            )}
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft size={16} className="mr-1" /> Back to
                            vehicle
                        </Link>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Total Views
                                        </p>
                                        <p className="text-3xl font-semibold">
                                            {analytics.total_views}
                                        </p>
                                    </div>
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Eye className="h-6 w-6 text-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Days on Market
                                        </p>
                                        <p className="text-3xl font-semibold">
                                            {analytics.days_on_market}
                                        </p>
                                    </div>
                                    <div className="bg-yellow-100 p-3 rounded-full">
                                        <Clock className="h-6 w-6 text-yellow-500" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Conversion Rate
                                        </p>
                                        <p className="text-3xl font-semibold">
                                            {analytics.conversion_rate}%
                                        </p>
                                    </div>
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <BarChart2 className="h-6 w-6 text-green-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Views Over Time */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg mb-8">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                Views Over Time
                            </h3>

                            {analytics.views_by_date.length > 0 ? (
                                <div className="h-64 flex items-end">
                                    {analytics.views_by_date.map(
                                        (item, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-col items-center mx-1 flex-1"
                                            >
                                                <div
                                                    className="w-full bg-blue-500 rounded-t"
                                                    style={{
                                                        height: `${Math.max(
                                                            (item.count /
                                                                Math.max(
                                                                    ...analytics.views_by_date.map(
                                                                        (d) =>
                                                                            d.count
                                                                    )
                                                                )) *
                                                                200,
                                                            20
                                                        )}px`,
                                                    }}
                                                ></div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {item.date.split("-")[2]}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="text-gray-500 text-center py-8">
                                    No view data available yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
