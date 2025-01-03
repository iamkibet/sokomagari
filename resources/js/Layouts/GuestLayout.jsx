import React from "react";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function GuestLayout({ auth, children }) {
    return (
        <div className="flex flex-col min-h-screen bg-[#f0f9f4] dark:bg-[#060f0a]">
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
