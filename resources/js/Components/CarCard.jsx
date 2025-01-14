import React from "react";

const Feature = ({ Icon, value }) => (
    <div className="flex flex-col gap-y-1 items-center">
        <div className="h-6 w-6 mb-1">
            <Icon />
        </div>
        <p className="text-sm text-center font-figtree">{value}</p>
    </div>
);

const CarCard = ({ car }) => {
    const formatPrice = (price) => {
        if (price >= 1_000_000) {
            return (price / 1_000_000).toFixed(1).toLowerCase() + "M";
        } else if (price >= 1_000) {
            return (price / 1_000).toFixed(1).toLowerCase() + "K";
        } else {
            return price.toString();
        }
    };

    return (
        <div className=" my-3 border rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-[264px] md:w-[300px]">
            <div className="relative">
                <img
                    src={`https://kai-and-karo.ams3.cdn.digitaloceanspaces.com/media/vehicles/images/adc4d701-726e-471d-bdfb-daa6267246ca.jpeg`}
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

                <div className="flex items-center">
                    <p className="text-lg  font-extrabold">
                        KSH {formatPrice(car.price)}
                    </p>
                </div>
                <a
                    href={`/cars/${car.id}`}
                    className="flex items-center justify-center border border-primary rounded-lg w-full py-2 text-primary"
                >
                    View car details
                </a>
            </div>
        </div>
    );
};

export default CarCard;
