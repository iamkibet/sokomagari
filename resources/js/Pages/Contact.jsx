import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";

import React from "react";

const Contact = () => {
    const rightArrow = (
        <svg
            className="shrink-0 size-2.5 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.975821 6.92249C0.43689 6.92249 -3.50468e-07 7.34222 -3.27835e-07 7.85999C-3.05203e-07 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                fill="currentColor"
            />
        </svg>
    );

    return (
        <GuestLayout>
            {/* <!-- Contact Us --> */}
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="max-w-2xl lg:max-w-5xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                            Contact us
                        </h1>
                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                            We'd love to talk about how we can help you.
                        </p>
                    </div>

                    <div className="mt-12 grid items-center lg:grid-cols-2 gap-6 lg:gap-16">
                        {/* <!-- Card --> */}
                        <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-8 dark:border-neutral-700">
                            <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                Fill in the form
                            </h2>

                            <form>
                                <div className="grid gap-4">
                                    {/* <!-- Grid --> */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                for="hs-firstname-contacts-1"
                                                className="sr-only"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                name="hs-firstname-contacts-1"
                                                id="hs-firstname-contacts-1"
                                                className="contacttextarea"
                                                placeholder="First Name"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                for="hs-lastname-contacts-1"
                                                className="sr-only"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="hs-lastname-contacts-1"
                                                id="hs-lastname-contacts-1"
                                                className="contacttextarea"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>
                                    {/* <!-- End Grid --> */}

                                    <div>
                                        <label
                                            for="hs-email-contacts-1"
                                            className="sr-only"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="hs-email-contacts-1"
                                            id="hs-email-contacts-1"
                                            autocomplete="email"
                                            className="contacttextarea"
                                            placeholder="Email"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            for="hs-phone-number-1"
                                            className="sr-only"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            name="hs-phone-number-1"
                                            id="hs-phone-number-1"
                                            className="contacttextarea"
                                            placeholder="Phone Number"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            for="hs-about-contacts-1"
                                            className="sr-only"
                                        >
                                            Details
                                        </label>
                                        <textarea
                                            id="hs-about-contacts-1"
                                            name="hs-about-contacts-1"
                                            rows="4"
                                            className="contacttextarea"
                                            placeholder="Details"
                                        ></textarea>
                                    </div>
                                </div>
                                {/* <!-- End Grid --> */}

                                <div className="mt-4 grid">
                                    <PrimaryButton
                                        type="submit"
                                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent  disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        Send inquiry
                                    </PrimaryButton>
                                </div>

                                <div className="mt-3 text-center">
                                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                                        We'll get back to you in 1-2 business
                                        days.
                                    </p>
                                </div>
                            </form>
                        </div>
                        {/* <!-- End Card --> */}

                        <div className="divide-y divide-gray-200 dark:divide-neutral-800">
                            {/* <!-- Icon Block --> */}
                            <div className="flex gap-x-7 py-6">
                                <svg
                                    stroke="currentColor"
                                    stroke-width="1"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="shrink-0 size-6 mt-1.5 text-[#57c18a] "
                                    width="32px"
                                    height="32px"
                                    viewBox="0 0 32 32"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>whatsapp</title>
                                    <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path>
                                </svg>
                                <div className="grow">
                                    <h3 className="font-semibold text-gray-800 dark:text-neutral-200">
                                        Whatsapp
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                        We're online on whatsapp and ready to
                                        help. Please attach a screenshot of the
                                        car you are interested in.
                                    </p>
                                    <a
                                        className="contactlinks "
                                        href="https://wa.me/254720449012
"
                                    >
                                        Contact support
                                        {rightArrow}
                                    </a>
                                </div>
                            </div>
                            {/* <!-- End Icon Block -->

        <!-- Icon Block --> */}
                            <div className="flex gap-x-7 py-6">
                                <svg
                                    className="shrink-0 size-6 mt-1.5 text-gray-800 dark:text-neutral-200"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                                </svg>
                                <div className="grow">
                                    <h3 className="font-semibold text-gray-800 dark:text-neutral-200">
                                        FAQ
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                        Search our FAQ for answers to anything
                                        you might ask.
                                    </p>
                                    <a className="contactlinks" href="/faq">
                                        Visit FAQ
                                        {rightArrow}
                                    </a>
                                </div>
                            </div>
                            {/* <!-- End Icon Block -->

        <!-- Icon Block --> */}
                            <div className=" flex gap-x-7 py-6">
                                <svg
                                    className="shrink-0 size-6 mt-1.5 text-gray-800 dark:text-neutral-200"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="m7 11 2-2-2-2" />
                                    <path d="M11 13h4" />
                                    <rect
                                        width="18"
                                        height="18"
                                        x="3"
                                        y="3"
                                        rx="2"
                                        ry="2"
                                    />
                                </svg>
                                <div className="grow">
                                    <h3 className="font-semibold text-gray-800 dark:text-neutral-200">
                                        Developer APIs
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                        Check out our development quickstart
                                        guide.
                                    </p>
                                    <a className="contactlinks" href="#">
                                        Contact sales
                                        {rightArrow}
                                    </a>
                                </div>
                            </div>
                            {/* <!-- End Icon Block -->

        <!-- Icon Block --> */}
                            <div className="flex gap-x-7 py-6">
                                <svg
                                    className="shrink-0 size-6 mt-1.5 text-gray-800 dark:text-neutral-200"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                                    <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                                </svg>
                                <div className="grow">
                                    <h3 className="font-semibold text-gray-800 dark:text-neutral-200">
                                        Contact us by email
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                        If you wish to write us an email instead
                                        please use
                                    </p>
                                    <a className="contactlinks" href="#">
                                        info@isolatedsolutions.tech
                                    </a>
                                </div>
                            </div>
                            {/* <!-- End Icon Block --> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Contact Us --> */}
        </GuestLayout>
    );
};

export default Contact;
