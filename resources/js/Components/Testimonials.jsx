import { motion, useScroll, useTransform } from "framer-motion";

const Testimonials = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section className="py-16 bg-gray-900 text-white overflow-hidden">
            <div className="container mx-auto relative">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 opacity-10"
                >
                    <img
                        src="/assets/testimonial-bg.jpg"
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <h2 className="text-4xl font-bold text-center mb-12 relative z-10">
                    What Our Customers Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{
                                opacity: 0,
                                x: index % 2 === 0 ? -50 : 50,
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white/10 p-6 rounded-lg backdrop-blur-sm"
                        >
                            <p className="text-lg mb-4">{testimonial.quote}</p>
                            <p className="font-semibold">{testimonial.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
