import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

const FAQ = () => {
    const faqItems = [
        {
            question: "How can I import a car from overseas?",
            answer: "We help you navigate the entire import process. First, select your desired vehicle, and we'll assist with shipping, customs clearance, and all necessary documentation. Typically, the import process takes 4-8 weeks depending on the origin country and specific vehicle.",
        },
        {
            question: "What are the total costs involved in car importation?",
            answer: "Import costs include the vehicle price, shipping fees, customs duties, taxes, and clearance charges. We provide a transparent breakdown of all expenses upfront, ensuring no hidden costs. Expect total additional costs to range from 20-45% of the vehicle's base price.",
        },
        {
            question: "How long does car importation typically take?",
            answer: "The entire importation process usually takes 6-10 weeks. This includes vehicle selection, shipping, customs clearance, and final registration. Factors like vehicle origin, shipping route, and customs processing can affect the total timeline.",
        },
        {
            question: "What types of vehicles can be imported?",
            answer: "We specialize in importing a wide range of vehicles including sedans, SUVs, luxury cars, and commercial vehicles. We can source vehicles from Japan, USA, UK, and other major automotive markets, ensuring quality and reliability.",
        },
        {
            question: "Are there any restrictions on imported vehicles?",
            answer: "Vehicle imports must comply with local safety and emission standards. We handle all compliance checks and can advise on specific requirements. Some restrictions may apply based on vehicle age, modification status, and local regulations.",
        },
    ];

    const FAQItem = ({ question, answer }) => (
        <div className="py-8 first:pt-0 last:pb-0">
            <div className="flex gap-x-5">
                <svg
                    className="shrink-0 mt-1 size-6 text-[#57c18a] dark:text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                </svg>
                <div className="grow">
                    <h3 className="md:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                        {question}
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-neutral-500">
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <GuestLayout>
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="max-w-2xl mx-auto mb-10 lg:mb-14">
                    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
                        You might be wondering...
                    </h2>
                </div>

                <div className="max-w-2xl mx-auto divide-y divide-gray-200 dark:divide-neutral-700">
                    {faqItems.map((item, index) => (
                        <FAQItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                        />
                    ))}
                </div>
            </div>
        </GuestLayout>
    );
};

export default FAQ;
