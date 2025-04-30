import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./ThemeContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import Loader from "./components/Loader";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const page =
            pages[`./Pages/${name}.jsx`] || pages[`./Pages/${name}/Index.jsx`];

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider>
                <LoadingProvider>
                    <App {...props} />
                    <Loader />
                </LoadingProvider>
            </ThemeProvider>
        );
    },
    progress: {
        color: "#4B5563",
        showSpinner: true,
        delay: 250,
    },
});
