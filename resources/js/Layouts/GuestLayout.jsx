import React from "react";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Breadcrumbs from "@/Components/Breadcrumbs";

export default function GuestLayout({ auth, children, breadcrumbs }) {
     console.log("Breadcrumbs:", breadcrumbs);

    return (
        <div className="flex flex-col min-h-screen bg-[#f0f9f4] dark:bg-[#060f0a]">
            <Navbar />
            <header>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </header>
            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
