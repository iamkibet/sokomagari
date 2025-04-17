import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Fleet Overview
                </h2>
            }
        >
            <Head title="Dashboard" />

            {/* Your page content */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Statistics Cards */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
