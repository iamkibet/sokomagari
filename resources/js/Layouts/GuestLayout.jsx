import React from "react";

import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function GuestLayout({ auth, children }) {
    return (
        <div className="flex flex-col text-[#040316] dark:text-[#eae9fc] min-h-screen bg-[#fbfbfe] dark:bg-[rgb(33,33,33)]">
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
