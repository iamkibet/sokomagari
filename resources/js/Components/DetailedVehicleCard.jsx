import React from "react";

const DetailedVehicleCard = ({ car }) => {
    const formatPrice = (price) => {
        if (price >= 1_000_000) {
            return (price / 1_000_000).toFixed(1).toLowerCase() + "M";
        } else if (price >= 1_000) {
            return (price / 1_000).toFixed(1).toLowerCase() + "K";
        } else {
            return price.toString();
        }
    };

    const arrowRight = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-4 w-4"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
        </svg>
    );

    const locationIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-4 w-4"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
        </svg>
    );

    return (
        <div className=" my-3 border rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-full">
            <div className="relative">
                <img
                    src={car.thumbnail}
                    alt={`${car.make} ${car.model}`}
                    className="w-full  object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold ">
                    {car.condition}
                </div>
            </div>

            <div className="flex flex-col gap-y-2 p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-bold ">
                        {car.make} {car.model}
                    </h3>
                    <span className="text-sm font-medium ">{car.year}</span>
                </div>
                <div className="flex gap-x-3 items-center">
                    <p className="flex items-center text-sm text-gray-500">
                        {car.mileage}{" "}
                    </p>
                    <span className=" flex items-center justify-center h-1 w-1 rounded-full  bg-black dark:bg-primary"></span>

                    <p className="text-sm text-gray-500">{car.transmission}</p>
                    <span className=" flex items-center justify-center h-1 w-1 rounded-full bg-black dark:bg-primary"></span>
                    <p className="text-sm text-gray-500">{car.fuel_type}</p>
                </div>

                <div className="flex items-center">
                    <p className="text-lg  font-extrabold">
                        KSH {formatPrice(car.price)}
                    </p>
                </div>
                <a
                    href={`/vehicles/${car.slug}`}
                    className="flex items-center  w-full py-2 text-primary font-bold "
                >
                    View more details {arrowRight}
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{locationIcon}</span> {car.location}
                </div>
            </div>
        </div>
    );
};

export default DetailedVehicleCard;
