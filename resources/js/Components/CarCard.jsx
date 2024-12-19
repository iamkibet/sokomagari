import React from "react";
import { Speedometer } from "./svgs/Speedometer";
import { FuelPump } from "./svgs/FuelPump";
import { Transmission } from "./svgs/Transmission";
import BorderHover from "./BorderHover";

const Feature = ({ Icon, value }) => (
    <div className="flex flex-col gap-y-1 items-center">
        <div className="h-6 w-6 mb-1">
            <Icon  />
        </div>
        <p className="text-sm text-gray-600 text-center font-figtree">{value}</p>
    </div>
);

const CarCard = ({ car }) => {
    console.log(car);

    return (
        <div className=" bg-[#8fafd6]/10 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="relative">
                <img
                    src={`https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/vehicles/images/adc4d701-726e-471d-bdfb-daa6267246ca.jpeg`}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                    {car.condition}
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                        {car.make} {car.model}
                    </h3>
                    <span className="text-sm font-medium text-gray-600">
                        {car.year}
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 mb-4">
                    <Feature
                        Icon={Speedometer}
                        value={`${car.mileage.toLocaleString()} km`}
                    />
                    <Feature Icon={FuelPump} value={car.fuel_type} />
                    <Feature Icon={Transmission} value={car.transmission} />
                </div>

                <div className="flex justify-between items-center">
                    <p className="text-xl font-figtree font-extrabold">
                        KSH{" "}
                        {Number(car.price).toLocaleString("en-KE", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </p>

                    <BorderHover>
                        <a href={`/cars/${car.id}`} className="text-[#57c18a]">
                            View Details
                        </a>
                    </BorderHover>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
