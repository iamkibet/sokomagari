import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import React from "react";

const About = () => {
    return (
        <GuestLayout>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col items-center gap-y-3 ">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-black dark:text-gray-300">
                        Meet the Team
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 text-center leading-7">
                        Sokomagari is one of the best platforms to buy and sell
                        your cars in kenya. We are a team of car enthusiasts who
                        are passionate about cars and technology. We aim to
                        bring you the best cars in the market, and connect you
                        with the car of your dreams.
                    </p>
                    <div className="flex gap-x-2">
                        <PrimaryButton className="w-32 py-3">
                            Contact us
                        </PrimaryButton>
                        <SecondaryButton className="w-32 py-3">
                            Get started
                        </SecondaryButton>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
};

export default About;
