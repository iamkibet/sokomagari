import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";

const CarInfoScroll = () => {
    const [currentCar, setCurrentCar] = useState(0);
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const cars = [
        {
            name: "Mercedes-Benz GLE",
            image: "https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/vehicles/images/WhatsApp_Image_2024-11-08_at_10.50.59.jpeg",
            categories: [
                {
                    title: "Luxury & Performance",
                    facts: [
                        "Often called the 'Swiss Army Knife' of SUVs",
                        "Blends luxury, performance, and versatility",
                        "Handles everything from school runs to off-road adventures",
                    ],
                },
                {
                    title: "Fuel Economy",
                    facts: [
                        "19 MPG in the city and 26 MPG on the highway",
                        "Owners joke about filling up more often than their coffee cups!",
                    ],
                },
                // ... more categories
            ],
            joke: "Why did the Mercedes-Benz GLE break up with its girlfriend? Because she said it was too 'high maintenance'!",
            comparison:
                "When comparing the GLE to other luxury SUVs, it's like your posh friend who always dresses to impress.",
        },
        {
            name: "Toyota Crown",
            image: "https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/vehicles/images/1000604381.jpg",
            categories: [
                {
                    title: "Luxury & Performance",
                    facts: [
                        "Often called the 'Swiss Army Knife' of SUVs",
                        "Blends luxury, performance, and versatility",
                        "Handles everything from school runs to off-road adventures",
                    ],
                },
                {
                    title: "Fuel Economy",
                    facts: [
                        "19 MPG in the city and 26 MPG on the highway",
                        "Owners joke about filling up more often than their coffee cups!",
                    ],
                },
                // ... more categories
            ],
            joke: "Why did the Mercedes-Benz GLE break up with its girlfriend? Because she said it was too 'high maintenance'!",
            comparison:
                "When comparing the GLE to other luxury SUVs, it's like your posh friend who always dresses to impress.",
        },
    ];

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const rotateX = useTransform(scrollYProgress, [0, 1], ["10deg", "-10deg"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const newCarIndex =
                Math.floor(scrollPosition / window.innerHeight) % cars.length;
            setCurrentCar(newCarIndex);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.section
            ref={sectionRef}
            className="h-[200vh] relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-700"
            style={{ perspective: "1000px" }}
        >
            <motion.div
                className="sticky top-20 h-screen flex items-center justify-center"
                style={{ y }}
            >
                <motion.div
                    className="max-w-6xl w-full mx-auto p-8 flex items-center relative"
                    style={{
                        rotateX,
                        scale,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <motion.div
                        className="w-1/2 h-[60vh] rounded-lg overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={cars[currentCar].image}
                            alt={cars[currentCar].name}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <motion.div className="w-1/2 pl-12">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentCar}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-4xl font-bold my-6 text-white">
                                    {cars[currentCar].name}
                                </h2>
                                <div className="space-y-8">
                                    {cars[currentCar].categories.map(
                                        (category, catIndex) => (
                                            <div
                                                key={catIndex}
                                                className="bg-white bg-opacity-10 rounded-lg p-6"
                                            >
                                                <h3 className="text-2xl font-bold text-blue-400 mb-4">
                                                    {category.title}
                                                </h3>
                                                <ul className="space-y-4">
                                                    {category.facts.map(
                                                        (fact, factIndex) => (
                                                            <li
                                                                key={factIndex}
                                                                className="flex items-start text-white"
                                                            >
                                                                <span className="w-6 h-6 bg-blue-500 rounded-full mr-3 flex-shrink-0 flex items-center justify-center text-white font-bold">
                                                                    {factIndex +
                                                                        1}
                                                                </span>
                                                                <p className="text-sm">
                                                                    {fact}
                                                                </p>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )
                                    )}

                                    <div className="bg-yellow-500 bg-opacity-20 rounded-lg p-6">
                                        <h3 className="text-2xl font-bold text-yellow-300 mb-4">
                                            Joke Time!
                                        </h3>
                                        <p className="text-white italic">
                                            {cars[currentCar].joke}
                                        </p>
                                    </div>

                                    <div className="bg-green-500 bg-opacity-20 rounded-lg p-6">
                                        <h3 className="text-2xl font-bold text-green-300 mb-4">
                                            Car Comparison
                                        </h3>
                                        <p className="text-white">
                                            {cars[currentCar].comparison}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default CarInfoScroll;
