// Dashboard/Index.jsx
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ recentListings, financialMetrics }) {
    return (
        <AuthenticatedLayout>
            <h1>Dashboard Loaded Successfully</h1>
            <pre>{JSON.stringify(recentListings, null, 2)}</pre>
        </AuthenticatedLayout>
    );
}
