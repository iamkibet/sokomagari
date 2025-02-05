import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import Modal from "@/Components/Modal";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import VehicleSlider from "@/Components/VehicleSlider";
import DetailedVehicleCard from "@/Components/DetailedVehicleCard";

const Show = () => {
    const {
        vehicle: { data: vehicle },
        similarcars,
    } = usePage().props;

    const images = vehicle.image_urls
        ? vehicle.image_urls.map((url) => ({
              original: url,
              thumbnail: url,
          }))
        : [];

    const details = [
        { label: "Year of Manufacture", value: vehicle.year },
        { label: "Current Location", value: vehicle.location },
        { label: "Mileage", value: `${vehicle.mileage} miles` },
        { label: "Condition", value: vehicle.condition },
        { label: "Engine Size", value: `${vehicle.engine_size} CC` },
        { label: "Transmission", value: vehicle.transmission },
        { label: "Torque", value: vehicle.torque },
        { label: "Accelaration", value: vehicle.acceleration },
        { label: "Transmission", value: vehicle.transmission },
    ];

    const arrowRight = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    );

    const whatsappSvg = (
        <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                fill="#ffff"
            />
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                fill="#ffff"
            />
        </svg>
    );

    const callSvg = (
        <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z"
                fill="#ffff"
            />
        </svg>
    );

    //foratting prices
    const formattedPrice = Number(vehicle.price).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);

    const closeModal = () => setIsModalOpen(false);

    return (
        <GuestLayout>
            <MaxWidthWrapper>
                <div className="flex flex-wrap -mx-4">
                    {/* Image Gallery Section */}
                    <div className="w-full xl:w-1/2 p-4">
                        <div className="">
                            <ImageGallery
                                items={images}
                                showThumbnails={true}
                                showPlayButton={false}
                                showFullscreenButton={true}
                                showNav={true}
                                lazyLoad={true}
                                additionalClass="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="w-full pt-4">
                            <h1 className="flex w-full text-sm justify-between">
                                Price
                                <span className="text-base font-bold">
                                    KES {formattedPrice}
                                </span>
                            </h1>

                            <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                                {details.map((detail, index) => (
                                    <li key={index} className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm  text-gray-900 truncate dark:text-white">
                                                    {detail.label}
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                {detail.value}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Vehicle Details Section */}
                    <div className="w-full xl:w-1/2 p-4">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h1 className="text-3xl font-extrabold mb-4">
                                {vehicle.make} {vehicle.model}
                            </h1>
                            <p className="text-gray-700">
                                {vehicle.description}
                            </p>

                            <div className="pt-4">
                                <a
                                    className="cursor-pointer flex justify-between border-b p-4 hover:bg-primary/10"
                                    onClick={openModal}
                                >
                                    Specifications <span>{arrowRight}</span>
                                </a>
                                <a
                                    className="cursor-pointer flex justify-between border-b p-4 hover:bg-primary/10"
                                    onClick={openModal}
                                >
                                    Running Costs <span>{arrowRight}</span>
                                </a>
                            </div>

                            {/* modal */}
                            <Modal show={isModalOpen} onClose={closeModal}>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-4">
                                        {vehicle.model} Specifications
                                    </h2>
                                </div>
                            </Modal>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <a
                                    href="https://wa.me/+254720449012"
                                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[rgb(34,195,94)] text-white hover:bg-[rgb(30,170,80)] dark:bg-[rgb(30,170,80)] dark:hover:bg-[rgb(26,150,70)] transition-colors"
                                >
                                    {whatsappSvg} Enquire via WhatsApp
                                </a>
                                <a
                                    href="tel:+254720449012"
                                    className="flex items-center justify-center gap-3 py-3 px-4 rounded-md bg-black text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {callSvg} Call Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        Similar Cars
                    </h2>
                    {similarcars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {similarcars.map((car) => (
                                <div key={car.id} className="flex ">
                                    <DetailedVehicleCard car={car} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                            No similar cars found.
                        </p>
                    )}
                </div>
            </MaxWidthWrapper>
        </GuestLayout>
    );
};

export default Show;
