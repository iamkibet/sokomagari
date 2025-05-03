import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import GuestLayout from "@/Layouts/GuestLayout";
import Modal from "@/Components/Modal";
import MaxWidthWrapper from "@/Components/MaxWidthWrapper";
import CarFeatures from "@/Components/CarFeatures";
import {
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Share2,
    Phone,
    MessageSquare,
    Shield,
    Clipboard,
    Gauge,
    Zap,
    MapPin,
    Calendar,
    Hash,
    CarIcon,
    GaugeIcon,
    ClipboardCheckIcon,
    RocketIcon,
    ZapIcon,
    CarFrontIcon,
} from "lucide-react";

const Show = () => {
    const {
        vehicle: { data: vehicle },
        similarcars,
    } = usePage().props;

    const [expandedSection, setExpandedSection] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [runningCostsModal, setRunningCostsModal] = useState(false);
    const [activeTab, setActiveTab] = useState("specifications");
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const {
        make,
        model,
        year,
        location,
        mileage,
        condition,
        type,
        engine_size,
        transmission,
        torque,
        acceleration,
        description,
        price,
        image_urls,
        comfort_features,
        safety_features,
        annual_insurance_cost,
        highway_fuel_efficiency,
        urban_fuel_efficiency,
        fuel_type,
    } = vehicle;

    const images = vehicle.image_urls
        ? vehicle.image_urls.map((url) => ({
              original: url,
              thumbnail: url,
          }))
        : [];

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const SectionHeader = ({ title, section, icon }) => (
        <div
            className="flex justify-between items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-md"
            onClick={() => toggleSection(section)}
        >
            <div className="flex items-center space-x-3">
                {icon}
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            {expandedSection === section ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
        </div>
    );

    const MetricCard = ({ label, value, icon }) => (
        <div className="p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {label}
                </span>
                <div className="p-1.5 bg-opacity-10 rounded-md">{icon}</div>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {value}
            </p>
        </div>
    );

    const formattedPrice = Number(vehicle.price).toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    const vehicleSpecs = [
        {
            label: "Year",
            value: year,
            icon: <Calendar className="w-5 h-5 text-gray-500" />,
        },
        {
            label: "Mileage",
            value: `${mileage.toLocaleString()} km`,
            icon: <Gauge className="w-5 h-5 text-gray-500" />,
        },
        {
            label: "Fuel Type",
            value: fuel_type,
            icon: <Zap className="w-5 h-5 text-gray-500" />,
        },
        {
            label: "Transmission",
            value: transmission,
            icon: <Clipboard className="w-5 h-5 text-gray-500" />,
        },
        {
            label: "Engine",
            value: `${engine_size} CC`,
            icon: <Zap className="w-5 h-5 text-gray-500" />,
        },
        {
            label: "Location",
            value: location,
            icon: <MapPin className="w-5 h-5 text-gray-500" />,
        },
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openRunningCosts = () => setRunningCostsModal(true);
    const closeRunningCosts = () => setRunningCostsModal(false);
    const toggleShareModal = () => setShareModalOpen(!shareModalOpen);

    const shareUrl = window.location.href;
    const shareMessage = `Hi, I'm interested in this ${make} ${model} ${year} vehicle: ${shareUrl}`;

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(shareMessage)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
        )}`,
        x: `https://x.com/intent/tweet?text=${encodeURIComponent(
            shareMessage
        )}`,
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareMessage).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <GuestLayout>
            <div className="bg-gray-50 dark:bg-gray-900 py-4 sm:py-6 md:py-10">
                <MaxWidthWrapper>
                    {/* Breadcrumb */}
                    <nav className="text-sm mb-4 sm:mb-6">
                        <ol className="list-none p-0 inline-flex flex-wrap gap-2">
                            <li className="flex items-center">
                                <a
                                    href="/"
                                    className="text-gray-500 hover:text-primary"
                                >
                                    Home
                                </a>
                                <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                            </li>
                            <li className="flex items-center">
                                <a
                                    href="/vehicles"
                                    className="text-gray-500 hover:text-primary"
                                >
                                    Vehicles
                                </a>
                                <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                            </li>
                            <li className="text-gray-700 dark:text-gray-300 truncate max-w-[200px] sm:max-w-none">
                                {make} {model}
                            </li>
                        </ol>
                    </nav>

                    {/* Vehicle Title & Quick Actions */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8">
                        <div className="mb-4 md:mb-0">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                                {make} {model} {year}
                            </h1>
                            <div className="flex items-center text-gray-600 dark:text-gray-400 flex-wrap gap-2">
                                <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{location}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3 w-full md:w-auto">
                            <button
                                onClick={toggleShareModal}
                                className="flex-1 md:flex-none flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-full p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <a
                                href="tel:+254720449012"
                                className="flex-1 md:flex-none flex items-center justify-center bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-full p-2 sm:p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                            <a
                                href="https://wa.me/+254720449012"
                                className="flex-1 md:flex-none flex items-center justify-center bg-green-500 text-white rounded-full p-2 sm:p-3 hover:bg-green-600"
                            >
                                <MessageSquare className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Left Column - Gallery & Price Card */}
                        <div className="col-span-1 lg:col-span-2">
                            {/* Image Gallery */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6 sm:mb-8">
                                <ImageGallery
                                    items={images}
                                    showThumbnails={true}
                                    showPlayButton={false}
                                    showFullscreenButton={true}
                                    showNav={true}
                                    lazyLoad={true}
                                    additionalClass="vehicle-gallery"
                                />
                            </div>

                            {/* Tabs Navigation */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
                                <div className="relative border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex overflow-x-auto pb-[1px] scrollbar-hide">
                                        {" "}
                                        {/* Hide scrollbar while allowing scroll */}
                                        <nav
                                            className="flex w-full"
                                            role="tablist"
                                            aria-label="Vehicle details navigation"
                                        >
                                            {[
                                                "specifications",
                                                "features",
                                                "costs",
                                            ].map((tab) => (
                                                <button
                                                    key={tab}
                                                    role="tab"
                                                    aria-selected={
                                                        activeTab === tab
                                                    }
                                                    className={`
            flex-1 min-w-[120px] py-3 px-4 sm:py-4 sm:px-6 
            text-sm sm:text-base font-medium text-center 
            transition-colors duration-200
            ${
                activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            }
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
          `}
                                                    onClick={() =>
                                                        setActiveTab(tab)
                                                    }
                                                >
                                                    {tab
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        tab
                                                            .slice(1)
                                                            .replace("_", " ")}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {activeTab === "specifications" && (
                                        <div className="space-y-8">
                                            {/* Technical Specifications */}
                                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-l-4 border-primary pl-4">
                                                    Technical Specifications
                                                </h3>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {vehicleSpecs.map(
                                                        (spec, index) => (
                                                            <div
                                                                key={index}
                                                                className="p-4 group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                            >
                                                                <div className="flex flex-col space-y-1">
                                                                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide">
                                                                        {
                                                                            spec.label
                                                                        }
                                                                    </span>
                                                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                                        {
                                                                            spec.value
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="mt-2 h-px bg-gray-100 dark:bg-gray-800 group-hover:bg-transparent transition-colors" />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Performance Metrics */}
                                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                                                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-l-4 border-primary pl-4">
                                                    Performance Details
                                                </h3>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                                    <div className="p-4 space-y-2">
                                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                                                            Condition
                                                        </span>
                                                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                            {condition}
                                                        </p>
                                                    </div>

                                                    <div className="p-4 space-y-2">
                                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                                                            Vehicle Type
                                                        </span>
                                                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                            {type}
                                                        </p>
                                                    </div>

                                                    <div className="p-4 space-y-2">
                                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                                                            Torque
                                                        </span>
                                                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                            {torque}
                                                        </p>
                                                    </div>

                                                    <div className="p-4 space-y-2">
                                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 block">
                                                            Acceleration
                                                        </span>
                                                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                                            {acceleration}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "features" && (
                                        <div>
                                            <SectionHeader
                                                title="Safety Features"
                                                section="safety"
                                                icon={
                                                    <Shield className="w-5 h-5 text-gray-500" />
                                                }
                                            />
                                            {expandedSection === "safety" && (
                                                <div className="p-4">
                                                    <CarFeatures
                                                        features={
                                                            safety_features
                                                        }
                                                        title="Safety Features"
                                                    />
                                                </div>
                                            )}

                                            <SectionHeader
                                                title="Comfort Features"
                                                section="comfort"
                                                icon={
                                                    <Clipboard className="w-5 h-5 text-gray-500" />
                                                }
                                            />
                                            {expandedSection === "comfort" && (
                                                <div className="p-4">
                                                    <CarFeatures
                                                        features={
                                                            comfort_features
                                                        }
                                                        title="Comfort Features"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === "costs" && (
                                        <div>
                                            <h3 className="text-xl font-semibold mb-6">
                                                Estimated Running Costs
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="flex items-center">
                                                            <Shield className="w-6 h-6 text-primary mr-3" />
                                                            <h4 className="text-lg font-medium">
                                                                Insurance
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                                        Estimated annual
                                                        insurance costs based on
                                                        average rates.
                                                    </p>
                                                    <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                                                        KES{" "}
                                                        {Number(
                                                            annual_insurance_cost
                                                        ).toLocaleString()}{" "}
                                                        <span className="text-sm font-normal text-gray-500">
                                                            /year
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                                                    <div className="flex justify-between items-center mb-4">
                                                        <div className="flex items-center">
                                                            <Zap className="w-6 h-6 text-primary mr-3" />
                                                            <h4 className="text-lg font-medium">
                                                                Fuel Efficiency
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                                                Highway
                                                            </p>
                                                            <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                                {
                                                                    highway_fuel_efficiency
                                                                }{" "}
                                                                <span className="text-sm font-normal text-gray-500">
                                                                    Km/Litre
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-600 dark:text-gray-400 mb-1">
                                                                Urban
                                                            </p>
                                                            <div className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                                                {
                                                                    urban_fuel_efficiency
                                                                }{" "}
                                                                <span className="text-sm font-normal text-gray-500">
                                                                    Km/Litre
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-4">
                                        Description
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Price & Contact */}
                        <div className="col-span-1">
                            {/* Price Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-4 sm:p-6 mb-6 sticky top-6">
                                <div className="mb-4 sm:mb-6">
                                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                                        Price
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        KES {formattedPrice}
                                    </h2>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <a
                                        href="https://wa.me/+254720449012"
                                        className="flex items-center justify-center gap-2 py-2 sm:py-3 px-4 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors w-full"
                                    >
                                        <MessageSquare className="w-5 h-5" />{" "}
                                        WhatsApp Inquiry
                                    </a>

                                    <a
                                        href="tel:+254720449012"
                                        className="flex items-center justify-center gap-2 py-2 sm:py-3 px-4 rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors w-full"
                                    >
                                        <Phone className="w-5 h-5" /> Call
                                        Dealer
                                    </a>
                                </div>
                            </div>

                            {/* Similar Vehicles */}
                            {similarcars && similarcars.length > 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-4 sm:p-6">
                                    <h3 className="text-xl font-semibold mb-4 sm:mb-6">
                                        Similar Vehicles
                                    </h3>
                                    <div className="space-y-3 sm:space-y-4">
                                        {similarcars
                                            .slice(0, 3)
                                            .map((car, index) => (
                                                <a
                                                    key={index}
                                                    href={`/vehicles/${car.id}`}
                                                    className="flex items-center space-x-3 sm:space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    <div className="w-16 sm:w-20 h-12 sm:h-16 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                                                        <img
                                                            src={
                                                                car
                                                                    .image_urls?.[0] ||
                                                                "/placeholder.jpg"
                                                            }
                                                            alt={`${car.make} ${car.model}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                                            {car.make}{" "}
                                                            {car.model}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            KES{" "}
                                                            {Number(
                                                                car.price
                                                            ).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </a>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </MaxWidthWrapper>
            </div>

            {/* CTA Section */}
            <div className="bg-gray-900 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark px-4 sm:px-6 py-12 sm:py-16 text-center shadow-2xl rounded-3xl">
                        <h2 className="mx-auto max-w-2xl text-2xl sm:text-3xl font-bold text-white">
                            Ready for Exceptional Mobility?
                        </h2>
                        <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-8 text-gray-100">
                            Discover your ideal vehicle through Africa's most
                            trusted automotive platform
                        </p>
                        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-x-4 sm:gap-x-6">
                            <a
                                href={route("public.showroom.index")}
                                className="flex items-center gap-2 rounded-xl bg-white px-4 sm:px-6 py-2.5 sm:py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary transition-all"
                            >
                                Browse Inventory
                                <ArrowRight
                                    className="w-4 h-4"
                                    strokeWidth={2.5}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            <Modal show={shareModalOpen} onClose={toggleShareModal}>
                <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 className="text-xl font-semibold">
                            Share this vehicle
                        </h3>
                        <button
                            onClick={toggleShareModal}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Share message:
                            </p>
                            <div className="flex items-center gap-2">
                                <p className="flex-1 text-gray-900 dark:text-gray-100 break-words">
                                    {shareMessage}
                                </p>
                                <button
                                    onClick={copyToClipboard}
                                    className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <Clipboard className="w-5 h-5" />
                                </button>
                            </div>
                            {copied && (
                                <p className="text-sm text-green-500 mt-2">
                                    Copied to clipboard!
                                </p>
                            )}
                        </div>

                        <a
                            href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 sm:p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                        >
                            <div className="bg-green-500 text-white p-2 rounded-full mr-3 sm:mr-4">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.6 6.31999C16.8426 5.5512 15.9344 4.94335 14.9351 4.53177C13.9357 4.12019 12.8684 3.91595 11.79 3.93C7.66003 3.93 4.31003 7.28001 4.31003 11.42C4.31003 12.86 4.71003 14.27 5.48003 15.47L4.25003 20L8.79003 18.79C9.95003 19.5 11.32 19.87 12.71 19.87C16.84 19.87 20.19 16.52 20.19 12.38C20.19 10.19 19.23 8.14001 17.6 6.31999Z" />
                                </svg>
                            </div>
                            <span className="font-medium text-gray-900">
                                Share on WhatsApp
                            </span>
                        </a>

                        <a
                            href={shareLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 sm:p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                            <div className="bg-blue-500 text-white p-2 rounded-full mr-3 sm:mr-4">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" />
                                </svg>
                            </div>
                            <span className="font-medium text-gray-900">
                                Share on Facebook
                            </span>
                        </a>

                        <a
                            href={shareLinks.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 sm:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="bg-gray-900 text-white p-2 rounded-full mr-3 sm:mr-4">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.19 14.41 4.53 14.42 3.9 14.26C4.16 15.1 4.69 15.84 5.41 16.37C6.13 16.89 6.99 17.17 7.89 17.17C6.37 18.35 4.49 19 2.56 18.99C2.22 18.99 1.88 18.97 1.54 18.93C3.44 20.15 5.7 20.85 8 20.85C16 20.85 20.33 14.26 20.33 8.59C20.33 8.4 20.33 8.21 20.32 8.01C21.16 7.41 21.88 6.66 22.46 5.79V6Z" />
                                </svg>
                            </div>
                            <span className="font-medium text-gray-900">
                                Share on X
                            </span>
                        </a>
                    </div>
                </div>
            </Modal>
        </GuestLayout>
    );
};

export default Show;
