import React from "react";
import { Link } from "@inertiajs/react";

const Breadcrumbs = (breadcrumbs) => (
    <nav aria-label="Breadcrumb" className="py-3">
        <ol className="flex space-x-1 text-gray-600">
            {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                    {breadcrumb.url ? (
                        <Link
                            href={breadcrumb.url}
                            className="text-blue-600 hover:underline"
                        >
                            {breadcrumb.name}
                        </Link>
                    ) : (
                        <span>{breadcrumb.name}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                        <span className="mx-2">/</span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
);

export default Breadcrumbs;
