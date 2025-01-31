import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import CarCard from "./CarCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowLeft } from "./svgs/ArrowLeft";
import { ArrowRight } from "./svgs/ArrowRight";
import { Oops } from "./svgs/Oops";




const arrowRight = (
    <svg
        className="flex w-6 h-6 pl-2"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>arrow-right-circle</title>
        <g fill="#f75d34">
            <path d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z" />
        </g>
    </svg>
);

const oopsSvg = (
    <svg
        className="flex w-6 h-6 pl-2"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>arrow-right-circle</title>
        <g fill="#f75d34">
            <path d="M332.535,1105.88 L326.879,1111.54 C326.488,1111.93 325.855,1111.93 325.465,1111.54 C325.074,1111.15 325.074,1110.51 325.465,1110.12 L329.586,1106 L319,1106 C318.447,1106 318,1105.55 318,1105 C318,1104.45 318.447,1104 319,1104 L329.586,1104 L325.465,1099.88 C325.074,1099.49 325.074,1098.86 325.465,1098.46 C325.855,1098.07 326.488,1098.07 326.879,1098.46 L332.535,1104.12 C332.775,1104.36 332.85,1104.69 332.795,1105 C332.85,1105.31 332.775,1105.64 332.535,1105.88 Z M326,1089 C317.163,1089 310,1096.16 310,1105 C310,1113.84 317.163,1121 326,1121 C334.837,1121 342,1113.84 342,1105 C342,1096.16 334.837,1089 326,1089 L326,1089 Z" />
        </g>
    </svg>
);

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
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
                setIsNearEnd(scrollLeft + clientWidth > scrollWidth - 300);
            }
        };

        const handleResize = () => {
            handleScroll();
        };

        sliderRef.current?.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            sliderRef.current?.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const scroll = (direction) => {
        if (sliderRef.current) {
            const { clientWidth, scrollWidth, scrollLeft } = sliderRef.current;
            const scrollAmount = direction * clientWidth * 0.8;
            const newScrollPosition = scrollLeft + scrollAmount;

            if (newScrollPosition + clientWidth >= scrollWidth - 10) {
                sliderRef.current.scrollTo({
                    left: scrollWidth - clientWidth,
                    behavior: "smooth",
                });
            } else {
                sliderRef.current.scrollBy({
                    left: scrollAmount,
                    behavior: "smooth",
                });
            }
        }
    };

    const filteredItems = filterFn(items, selectedCategory);

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

                    {!isLoading && filteredItems.length === 0 && (
                        <div className=" flex flex-col items-center justify-center py-8 px-4 text-center bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
                            <svg
                                class="w-12 h-12 dark:text-gray-400 text-gray-700"
                                stroke="currentColor"
                                fill="currentColor"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                height="200px"
                                width="200px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="File_Off">
                                    <g>
                                        <path d="M4,3.308a.5.5,0,0,0-.7.71l.76.76v14.67a2.5,2.5,0,0,0,2.5,2.5H17.44a2.476,2.476,0,0,0,2.28-1.51l.28.28c.45.45,1.16-.26.7-.71Zm14.92,16.33a1.492,1.492,0,0,1-1.48,1.31H6.56a1.5,1.5,0,0,1-1.5-1.5V5.778Z"></path>
                                        <path d="M13.38,3.088v2.92a2.5,2.5,0,0,0,2.5,2.5h3.07l-.01,6.7a.5.5,0,0,0,1,0V8.538a2.057,2.057,0,0,0-.75-1.47c-1.3-1.26-2.59-2.53-3.89-3.8a3.924,3.924,0,0,0-1.41-1.13,6.523,6.523,0,0,0-1.71-.06H6.81a.5.5,0,0,0,0,1Zm4.83,4.42H15.88a1.5,1.5,0,0,1-1.5-1.5V3.768Z"></path>
                                    </g>
                                </g>
                            </svg>
                            <h3 class="text-xl font-medium mt-4 text-gray-700 dark:text-gray-200">
                                Oops! No vehicles in this category
                            </h3>
                            <p class="text-gray-500 dark:text-gray-400 mt-2">
                                The items you are looking for could not be
                                located.
                            </p>
                            <button
                                className="flex items-center my-3 bg-primary py-2 px-4 rounded-md text-white text-lg"
                                href="/vehicles"
                            >
                                {" "}
                                Browse More Vehicles
                            </button>
                        </div>
                    )}

                    {!isLoading && filteredItems.length > 0 && (
                        <div className="relative px-4 pb-6 ">
                            <div
                                ref={sliderRef}
                                className="flex gap-x-2 md:gap-x-6 overflow-x-auto scrollbar-hide"
                                style={{
                                    scrollSnapType: "x mandatory",
                                    scrollPadding: "0 24px",
                                }}
                            >
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
                                    className={`flex items-center justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 transition-opacity duration-300 ${
                                        isNearEnd ? "opacity-100" : "opacity-0"
                                    }`}
                                >
                                    <a
                                        href="/all-cars"
                                        className="bg-black/15  px-6 py-3 rounded-full text-lg font-medium hover:bg-black/20 transition-colors duration-300"
                                    >
                                        View All Cars
                                    </a>
                                </div>
                            </div>
                            {showLeftArrow && (
                                <button
                                    onClick={() => scroll(-1)}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/15 p-2 rounded-full shadow-md hover:bg-black/20 transition-colors duration-300"
                                    aria-label="Scroll left"
                                >
                                    <div className="h-6 w-6 sm:h-8 sm:w-8">
                                        <ArrowLeft />
                                    </div>
                                </button>
                            )}
                            {showRightArrow && (
                                <button
                                    onClick={() => scroll(1)}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/15 p-2 rounded-full shadow-md hover:bg-black/20 transition-colors duration-300"
                                    aria-label="Scroll right"
                                >
                                    <div className="h-6 w-6 sm:h-8 sm:w-8">
                                        <ArrowRight />
                                    </div>
                                </button>
                            )}
                        </div>
                    )}

                    {!isLoading && (
                        <div className="px-6 pb-4">
                            <a
                                className="flex items-center text-md text-primary font-semibold"
                                href={viewMoreLink}
                            >
                                View More
                                {selectedCategory !== "all"
                                    ? ` ${selectedCategory}`
                                    : " Items"}
                                {arrowRight}
                            </a>
                        </div>
                    )}
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
