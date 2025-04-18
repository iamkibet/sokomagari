import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import CarCard from "./CarCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowLeft } from "./svgs/ArrowLeft";
import { ArrowRight } from "./svgs/ArrowRight";
import { Oops } from "./svgs/Oops";

const VehicleSlider = ({
    title,
    items,
    categories,
    filterFn = (items, category) => items,
    viewMoreLink = "/",
}) => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const sliderRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isNearEnd, setIsNearEnd] = useState(false);

    // Calculate filteredItems before any effects
    const filteredItems = filterFn(items, selectedCategory);

    useEffect(() => {
        const timeout = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (sliderRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } =
                    sliderRef.current;
                const hasOverflow = scrollWidth > clientWidth;
                const isAtStart = scrollLeft <= 0;
                const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10;

                // Only show arrows if there's overflow and we're not at the respective ends
                setShowLeftArrow(hasOverflow && !isAtStart);
                setShowRightArrow(hasOverflow && !isAtEnd);
                setIsNearEnd(scrollLeft + clientWidth > scrollWidth - 300);
            }
        };

        const handleResize = () => {
            handleScroll();
        };

        // Add smooth scroll behavior to the slider
        if (sliderRef.current) {
            sliderRef.current.style.scrollBehavior = "smooth";
        }

        // Initial check
        handleScroll();

        sliderRef.current?.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            sliderRef.current?.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [filteredItems]); // Now filteredItems is properly defined

    const scroll = (direction) => {
        if (sliderRef.current) {
            const { clientWidth, scrollWidth, scrollLeft } = sliderRef.current;
            const cardWidth = 320; // Approximate width of a car card including gap
            const scrollAmount = direction * (cardWidth * 2); // Scroll exactly 2 cards

            // Calculate the new scroll position
            let newScrollPosition = scrollLeft + scrollAmount;

            
            const maxScroll = scrollWidth - clientWidth;
            newScrollPosition = Math.max(
                0,
                Math.min(newScrollPosition, maxScroll)
            );

            // Smooth scroll to the new position
            sliderRef.current.scrollTo({
                left: newScrollPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="w-full pt-6">
            <MaxWidthWrapper>
                <div className="border shadow-md rounded-2xl">
                    <h2 className="text-xl font-semibold px-6 pt-4">{title}</h2>

                    {categories && (
                        <div className="flex flex-wrap justify-start px-4 space-x-4 mb-4 pt-3 w-full border-b">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`px-4 py-2 text-sm ${
                                        selectedCategory === category.id
                                            ? "border-b-[3px] border-primary font-bold"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {isLoading && (
                        <div className="text-center py-10">
                            <span className="text-primary font-semibold text-lg">
                                Loading items...
                            </span>
                        </div>
                    )}

                    <div className="relative px-4 pb-6">
                        <div
                            ref={sliderRef}
                            className="flex gap-x-2 md:gap-x-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                            style={{
                                scrollSnapType: "x mandatory",
                                scrollPadding: "0 24px",
                                scrollBehavior: "smooth",
                            }}
                        >
                            {!isLoading && filteredItems.length === 0 ? (
                                <div className="flex items-center justify-center w-full min-h-[300px] bg-gradient-to-br from-gray-50/50 to-gray-100/50 rounded-xl border border-gray-200/50 backdrop-blur-sm">
                                    <div className="flex flex-col items-center space-y-6 px-6">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary/5 rounded-full blur-lg"></div>
                                            <div className="relative bg-white p-5 rounded-full shadow-sm ring-1 ring-gray-100">
                                                <Oops className="h-14 w-14 text-primary/60" />
                                            </div>
                                        </div>
                                        <div className="text-center space-y-3">
                                            <h3 className="text-xl font-semibold text-gray-800 tracking-tight">
                                                No Vehicles Found
                                            </h3>
                                            <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
                                                We couldn't find any vehicles
                                                matching your criteria. Try
                                                adjusting your filters or check
                                                back later for new listings.
                                            </p>
                                            {categories &&
                                                categories.length > 1 && (
                                                    <button
                                                        onClick={() =>
                                                            setSelectedCategory(
                                                                "all"
                                                            )
                                                        }
                                                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                                                    >
                                                        Reset Filters
                                                        <svg
                                                            className="w-4 h-4 ml-2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                            />
                                                        </svg>
                                                    </button>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {filteredItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex space-x-3 flex-shrink-0"
                                            style={{
                                                scrollSnapAlign: "start",
                                            }}
                                        >
                                            <CarCard car={item} />
                                        </div>
                                    ))}
                                    <div
                                        className={`flex items-center justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 transition-all duration-500 ease-out ${
                                            isNearEnd
                                                ? "opacity-100 translate-x-0"
                                                : "opacity-0 translate-x-8"
                                        }`}
                                        style={{
                                            scrollSnapAlign: "start",
                                            transitionProperty:
                                                "opacity, transform",
                                            transitionTimingFunction:
                                                "cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                    >
                                        <a
                                            href={viewMoreLink}
                                            className="group relative inline-flex items-center justify-center px-8 py-4 text-primary font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                                        >
                                            <span className="relative z-10">
                                                View All Cars
                                            </span>
                                            <div className="absolute inset-0 bg-primary/10 rounded-xl transition-all duration-300 group-hover:bg-primary/20" />
                                            <svg
                                                className="w-5 h-5 ml-2 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </>
                            )}
                        </div>

                        {showLeftArrow && filteredItems.length > 0 && (
                            <button
                                onClick={() => scroll(-1)}
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group backdrop-blur-sm"
                                aria-label="Scroll left"
                            >
                                <div className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700 group-hover:text-primary transition-colors duration-300">
                                    <ArrowLeft />
                                </div>
                            </button>
                        )}
                        {showRightArrow && filteredItems.length > 0 && (
                            <button
                                onClick={() => scroll(1)}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group backdrop-blur-sm"
                                aria-label="Scroll right"
                            >
                                <div className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700 group-hover:text-primary transition-colors duration-300">
                                    <ArrowRight />
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    );
};

VehicleSlider.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    categories: PropTypes.array,
    filterFn: PropTypes.func,
    viewMoreLink: PropTypes.string,
};

export default VehicleSlider;
