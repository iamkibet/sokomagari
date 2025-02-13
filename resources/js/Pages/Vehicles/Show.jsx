import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import GuestLayout from "@/Layouts/GuestLayout";
import Modal from "@/Components/Modal";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import CarFeatures from "@/Components/CarFeatures";
import { ChevronDown, ChevronUp } from "react-feather";

const Show = () => {
    const {
        vehicle: { data: vehicle },
        similarcars,
    } = usePage().props;

    console.log(vehicle);

    const {
        comfort_features,
        safety_features,
        urban_fuel_efficiency,
        highway_fuel_efficiency,
        annual_insurance_cost,
    } = vehicle;
    const [expandedSection, setExpandedSection] = useState(null);

    const images = vehicle.image_urls
        ? vehicle.image_urls.map((url) => ({
              original: url,
              thumbnail: url,
          }))
        : [];

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const SectionHeader = ({ title, section }) => (
        <div
            className="flex justify-between items-center py-3 px-2 border-y-[0.5px] rounded-lg cursor-pointer hover:bg-primary/15 transition-colors "
            onClick={() => toggleSection(section)}
        >
            <h3 className="text-lg font-semibold">{title}</h3>
            {expandedSection === section ? (
                <ChevronUp className="h-5 w-5 text-gray-600" />
            ) : (
                <ChevronDown className="h-5 w-5 text-gray-600" />
            )}
        </div>
    );

    const details = [
        { label: "Year of Manufacture", value: vehicle.year },
        { label: "Current Location", value: vehicle.location },
        { label: "Mileage", value: `${vehicle.mileage} miles` },
        { label: "Condition", value: vehicle.condition },
        { label: "type", value: vehicle.type },
        { label: "Engine Size", value: `${vehicle.engine_size} CC` },
        { label: "Transmission", value: vehicle.transmission },
        { label: "Torque", value: vehicle.torque },
        { label: "Accelaration", value: vehicle.acceleration },
    ];

    const insuranceSVG = (
        <svg
            viewBox="0 0 1024 1024"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-600 mx-auto mb-4"
        >
            <path
                d="M458.9 434.6c0 157-89.1 221.3-199 221.3s-199-64.3-199-221.3 199-410.2 199-410.2 199 253.2 199 410.2z"
                fill="#60C13D"
            />
            <path
                d="M259.9 665.9c-60.6 0-111.7-18.9-147.7-54.7C71.6 570.9 51 511.5 51 434.6c0-66.9 33.9-157.5 100.9-269.1C201.3 83 251.5 18.9 252 18.3c1.9-2.4 4.8-3.8 7.9-3.8s6 1.4 7.9 3.8c0.5 0.6 50.7 64.7 100.2 147.3 67 111.6 100.9 202.2 100.9 269.1 0 76.9-20.6 136.3-61.2 176.6-36.2 35.7-87.2 54.6-147.8 54.6z m0-625c-15.9 21.2-53.7 72.8-91 135.1C124.2 250.5 71 355.9 71 434.6c0 71.4 18.6 126 55.3 162.4 32.2 32 78.5 48.9 133.6 48.9S361.3 629 393.5 597c36.7-36.4 55.3-91 55.3-162.4 0-78.8-53.3-184.2-98.1-258.8-37.2-62.2-74.9-113.8-90.8-134.9z"
                fill=""
            />
            <path
                d="M259.9 771.1c-5.5 0-10-4.5-10-10V173.3c0-5.5 4.5-10 10-10s10 4.5 10 10v587.8c0 5.6-4.5 10-10 10z"
                fill=""
            />
            <path
                d="M259.9 401.3c-2.7 0-5.5-1.1-7.4-3.3L150 283.9c-3.7-4.1-3.4-10.4 0.8-14.1 4.1-3.7 10.4-3.4 14.1 0.8l102.5 114.1c3.7 4.1 3.4 10.4-0.8 14.1-1.9 1.6-4.3 2.5-6.7 2.5zM231.4 518.5c-2.8 0-5.6-1.2-7.6-3.5L145 422.5c-3.6-4.2-3.1-10.5 1.1-14.1 4.2-3.6 10.5-3.1 14.1 1.1L239 502c3.6 4.2 3.1 10.5-1.1 14.1-1.9 1.6-4.2 2.4-6.5 2.4zM259.9 287.2c-2.6 0-5.1-1-7.1-2.9-3.9-3.9-3.9-10.2 0-14.1l69.4-69.4c3.9-3.9 10.2-3.9 14.1 0s3.9 10.2 0 14.1L267 284.3c-2 1.9-4.6 2.9-7.1 2.9zM266.6 491.7c-2.7 0-5.5-1.1-7.4-3.3-3.7-4.1-3.3-10.4 0.8-14.1l101.2-90.8c4.1-3.7 10.4-3.3 14.1 0.8 3.7 4.1 3.3 10.4-0.8 14.1l-101.2 90.8c-1.9 1.7-4.3 2.5-6.7 2.5z"
                fill=""
            />
            <path
                d="M798.1 588.8h-67c-8.6-18.7-77.5-157.9-278.4-157.8-149.3 0-437.2 156.9-424.3 194.2 6.6 19.2 19.4 30.3 23.7 80.7 3.1 35.8 10.4 80.1 10.4 80.1 0 55.9 45.3 101.3 101.3 101.3H998v-133c0-110.5-89.5-165.5-199.9-165.5z"
                fill="#D64F34"
            />
            <path
                d="M998 897.2H163.7c-61.1 0-110.8-49.5-111.3-110.4-1-6.2-7.5-46.9-10.4-80.1-3-35.1-10.1-49.8-16.4-62.7-2.5-5.1-4.8-10-6.8-15.6-2.3-6.8-0.5-14.5 5.6-23 19.8-27.8 91-73.2 177.3-113 98.4-45.4 189.8-71.5 250.8-71.5h0.2c189.9 0 265.8 121 284.5 157.8h60.7c59.2 0 110.2 15 147.4 43.4 40.9 31.2 62.5 76.8 62.5 132.1v133c0.2 5.5-4.2 10-9.8 10zM38 622.4c1.6 4.4 3.5 8.4 5.7 13 6.7 13.7 15 30.9 18.3 69.7 3 35 10.2 78.9 10.3 79.3 0.1 0.5 0.1 1.1 0.1 1.6 0 50.3 40.9 91.3 91.3 91.3H988v-123c0-48.8-18.9-89-54.6-116.2-33.7-25.7-80.5-39.3-135.3-39.3h-67c-3.9 0-7.4-2.3-9.1-5.8-11.7-25.4-79.8-152-269.2-152h-0.2c-62.1 0-159.9 29.5-261.7 78.7-42.6 20.6-81.8 43-110.5 62.9-38.2 26.7-42 38.1-42.4 39.8z m0 0.2z"
                fill=""
            />
            <path
                d="M452.7 430.9c-63.5 0-143 31.8-221.6 71.8l61 160.6h370.2l68.9-74.6c-8.7-18.6-77.5-157.9-278.5-157.8z"
                fill="#80F9E7"
            />
            <path
                d="M662.3 673.4H292.1c-4.2 0-7.9-2.6-9.3-6.5l-61-160.6c-1.8-4.8 0.3-10.1 4.8-12.5 97.6-49.7 169.5-72.9 226.2-72.9h0.2c201.6 0 274.7 136.3 287.3 163.7 1.7 3.7 1 8-1.7 11l-68.9 74.6c-2 2-4.6 3.2-7.4 3.2z m-363.3-20h358.9l61.3-66.4c-17.9-34.9-88.8-146.1-266.3-146.1h-0.2c-51.2 0-119.6 21.8-209.1 66.7L299 653.4z m153.7-222.5z"
                fill=""
            />
            <path d="M477.2 430.9v232.5" fill="#80F9E7" />
            <path
                d="M477.2 673.4c-5.5 0-10-4.5-10-10V430.9c0-5.5 4.5-10 10-10s10 4.5 10 10v232.5c0 5.5-4.5 10-10 10z"
                fill=""
            />
            <path
                d="M274.8 887.2m-103.3 0a103.3 103.3 0 1 0 206.6 0 103.3 103.3 0 1 0-206.6 0Z"
                fill="#B6B7B7"
            />
            <path
                d="M274.8 1000.5c-62.5 0-113.3-50.8-113.3-113.3s50.8-113.3 113.3-113.3 113.3 50.8 113.3 113.3-50.8 113.3-113.3 113.3z m0-206.6c-51.5 0-93.3 41.9-93.3 93.3 0 51.5 41.9 93.3 93.3 93.3 51.5 0 93.3-41.9 93.3-93.3s-41.8-93.3-93.3-93.3z"
                fill=""
            />
            <path
                d="M765.6 887.2m-103.3 0a103.3 103.3 0 1 0 206.6 0 103.3 103.3 0 1 0-206.6 0Z"
                fill="#B6B7B7"
            />
            <path
                d="M765.6 1000.5c-62.5 0-113.3-50.8-113.3-113.3s50.8-113.3 113.3-113.3 113.3 50.8 113.3 113.3-50.8 113.3-113.3 113.3z m0-206.6c-51.5 0-93.3 41.9-93.3 93.3 0 51.5 41.9 93.3 93.3 93.3s93.3-41.9 93.3-93.3-41.9-93.3-93.3-93.3z"
                fill=""
            />
            <path
                d="M443.5 1009.1H59.6c-5.5 0-10-4.5-10-10s4.5-10 10-10h383.9c5.5 0 10 4.5 10 10s-4.5 10-10 10zM990.2 1009.1H606.3c-5.5 0-10-4.5-10-10s4.5-10 10-10h383.9c5.5 0 10 4.5 10 10s-4.5 10-10 10z"
                fill=""
            />
        </svg>
    );

    const arrowRight = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
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
                fillRule="evenodd"
                clipRule="evenodd"
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.3545 22.2323C15.3344 21.7262 11.1989 20.2993 7.44976 16.5502C3.70065 12.8011 2.2738 8.66559 1.76767 6.6455C1.47681 5.48459 2.00058 4.36434 2.88869 3.72997L5.21694 2.06693C6.57922 1.09388 8.47432 1.42407 9.42724 2.80051L10.893 4.91776C11.5152 5.8165 11.3006 7.0483 10.4111 7.68365L9.24234 8.51849C9.41923 9.1951 9.96939 10.5846 11.6924 12.3076C13.4154 14.0306 14.8049 14.5807 15.4815 14.7576L16.3163 13.5888C16.9517 12.6994 18.1835 12.4847 19.0822 13.1069L21.1995 14.5727C22.5759 15.5257 22.9061 17.4207 21.933 18.783L20.27 21.1113C19.6356 21.9994 18.5154 22.5232 17.3545 22.2323ZM8.86397 15.136C12.2734 18.5454 16.0358 19.8401 17.8405 20.2923C18.1043 20.3583 18.4232 20.2558 18.6425 19.9488L20.3056 17.6205C20.6299 17.1665 20.5199 16.5348 20.061 16.2171L17.9438 14.7513L17.0479 16.0056C16.6818 16.5182 16.0047 16.9202 15.2163 16.7501C14.2323 16.5378 12.4133 15.8569 10.2782 13.7218C8.1431 11.5867 7.46219 9.7677 7.24987 8.7837C7.07977 7.9953 7.48181 7.31821 7.99439 6.95208L9.24864 6.05618L7.78285 3.93893C7.46521 3.48011 6.83351 3.37005 6.37942 3.6944L4.05117 5.35744C3.74413 5.57675 3.64162 5.89565 3.70771 6.15943C4.15989 7.96418 5.45459 11.7266 8.86397 15.136Z"
                fill="#ffff"
            />
        </svg>
    );

    const fuelSVG = (
        <svg
            fill="#000000"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 mx-auto mb-4"
        >
            <path d="M522.267 910.508c16.962 0 30.72-13.758 30.72-30.72v-736.43c0-16.962-13.758-30.72-30.72-30.72H143.356c-16.962 0-30.72 13.758-30.72 30.72v736.43c0 16.962 13.758 30.72 30.72 30.72h378.911zm0 40.96H143.356c-39.583 0-71.68-32.097-71.68-71.68v-736.43c0-39.583 32.097-71.68 71.68-71.68h378.911c39.583 0 71.68 32.097 71.68 71.68v736.43c0 39.583-32.097 71.68-71.68 71.68zm388.62-678.049v500.265c0 49.412-40.054 89.467-89.467 89.467-49.443 0-89.498-40.054-89.498-89.467 0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48c0 72.034 58.393 130.427 130.427 130.427 72.065 0 130.458-58.393 130.458-130.427V273.419c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48z" />
            <path d="M731.92 779.436V368.648c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48v410.788c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z" />
            <path d="M731.943 365.513v-34.499c0-49.414-40.053-89.467-89.467-89.467-49.415 0-89.477 40.054-89.477 89.467v34.499c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48v-34.499c0-26.789 21.722-48.507 48.517-48.507 26.792 0 48.507 21.715 48.507 48.507v34.499c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48zM942.5 254.981L767.785 80.266c-7.998-7.998-20.965-7.998-28.963 0s-7.998 20.965 0 28.963l174.715 174.715c7.998 7.998 20.965 7.998 28.963 0s7.998-20.965 0-28.963zM438.84 281.52c5.657 0 10.24-4.583 10.24-10.24V225.2c0-5.657-4.583-10.24-10.24-10.24H225.541a10.238 10.238 0 00-10.24 10.24v46.08c0 5.657 4.583 10.24 10.24 10.24H438.84zm0 40.96H225.541c-28.278 0-51.2-22.922-51.2-51.2V225.2c0-28.278 22.922-51.2 51.2-51.2H438.84c28.278 0 51.2 22.922 51.2 51.2v46.08c0 28.278-22.922 51.2-51.2 51.2z" />
            <path d="M928.972 358.832h-48.978c-11.309 0-20.48-9.171-20.48-20.48V191.091c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48v147.261c0 33.931 27.509 61.44 61.44 61.44h48.978c11.311 0 20.48-9.169 20.48-20.48s-9.169-20.48-20.48-20.48z" />
        </svg>
    );

    const closeSVG = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="text-center size-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
            />
        </svg>
    );

    const shareUrl = window.location.href;

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
        )}`,
        x: `https://x.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
    };
    const formattedPrice = Number(vehicle.price).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [runningCostsModal, setRunningCostsModal] = useState(false);

    const openRunningCosts = () => setRunningCostsModal(true);
    const closeRunningCosts = () => setRunningCostsModal(false);

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
                            <h1 className="text-2xl font-extrabold mb-4">
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
                                    onClick={openRunningCosts}
                                >
                                    Running Costs <span>{arrowRight}</span>
                                </a>
                            </div>

                            <Modal show={isModalOpen} onClose={closeModal}>
                                <div className="flex flex-col sm:p-4 p-6">
                                    <div className="flex items-center justify-between">
                                        <h1 className="font-bold text-2xl">
                                            {vehicle.make} {vehicle.model}{" "}
                                            Specifications
                                        </h1>
                                        <span
                                            onClick={closeModal}
                                            className="cursor-pointer"
                                        >
                                            {closeSVG}
                                        </span>
                                    </div>
                                    <div className="w-full p-6 ">
                                        {/* Safety Features Section */}
                                        <SectionHeader
                                            title="Comfort Features"
                                            section="comfort"
                                        />
                                        {expandedSection === "comfort" && (
                                            <CarFeatures
                                                features={comfort_features}
                                                title="Comfort Features"
                                            />
                                        )}

                                        <SectionHeader
                                            title="Safety Features"
                                            section="safety"
                                        />
                                        {expandedSection === "safety" && (
                                            <CarFeatures
                                                features={safety_features}
                                                title="Safety Features"
                                            />
                                        )}
                                    </div>
                                </div>
                            </Modal>
                            <Modal
                                show={runningCostsModal}
                                onClose={closeRunningCosts}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between py-3 px-4">
                                        <h1 className="font-bold text-2xl">
                                            {vehicle.make} {vehicle.model}{" "}
                                            Running Costs
                                        </h1>
                                        <span
                                            onClick={closeRunningCosts}
                                            className="cursor-pointer"
                                        >
                                            {closeSVG}
                                        </span>
                                    </div>
                                    <div className="flex flex-col h-full items-center justify-center p-6 gap-y-3">
                                        <div className="flex flex-col text-center items-center justify-center bg-gray-100 h-1/2 w-full">
                                            {insuranceSVG}
                                            <h2 className="text-2xl font-semibold text-gray-800">
                                                Insurance Costs
                                            </h2>
                                            <p className="text-gray-600 mt-2">
                                                Estimated annual insurance costs
                                                based on average rates.
                                            </p>
                                            <p className="text-xl font-bold t mt-4">
                                                KES: {annual_insurance_cost} /
                                                Annually
                                            </p>{" "}
                                        </div>

                                        <div className="flex flex-col h-1/2 text-center items-center justify-center bg-gray-100 w-full gap-y-2">
                                            <h1 className="flex flex-col items-center text-center justify-center font-bold">
                                                {fuelSVG} Fuel
                                            </h1>
                                            <p>
                                                Highway:{" "}
                                                {highway_fuel_efficiency}{" "}
                                                Km/Litre
                                            </p>
                                            <p>
                                                Urban: {urban_fuel_efficiency}{" "}
                                                Km/Litre
                                            </p>
                                        </div>
                                    </div>
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
                            <div className="mt-6">
                                <p className="text-gray-600 font-semibold mb-2">
                                    Share this:
                                </p>
                                <div className="flex items-center  space-x-10 mt-4">
                                    <a
                                        href={shareLinks.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Share on WhatsApp"
                                    >
                                        <img src="/svgs/whatsapp.svg" alt="Share to whatsapp" srcset="" />
                                    </a>
                                    <a
                                        href={shareLinks.facebook}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Share on Facebook"
                                    >
                                        <img
                                            src="/svgs/facebook.svg"
                                            alt="Facebok"
                                        />
                                    </a>
                                    <a
                                        href={shareLinks.x}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Share on x"
                                    >
                                        <img src="/svgs/x.svg" alt="X" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10"></div>
            </MaxWidthWrapper>
        </GuestLayout>
    );
};

export default Show;
