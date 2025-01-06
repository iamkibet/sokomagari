import React, { useRef, useEffect, useState } from "react";
import { ArrowRight } from "../svgs/ArrowRight";
import { ArrowLeft } from "../svgs/ArrowLeft";
import CarCard from "../CarCard";

const Slider = ({ cars }) => {
    const sliderRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [isNearEnd, setIsNearEnd] = useState(false);

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

    return (
        <section>
            
                <div className="relative">
                    <div
                        ref={sliderRef}
                        className="flex space-x-4 gap-4 overflow-x-auto scrollbar-hide"
                        style={{ scrollSnapType: "x mandatory" }}
                    >
                        {cars.map((car) => (
                            <div
                                key={car.id}
                                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0"
                                style={{ scrollSnapAlign: "start" }}
                            >
                                <CarCard car={car} />
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
        </section>
    );
};

export default Slider;
