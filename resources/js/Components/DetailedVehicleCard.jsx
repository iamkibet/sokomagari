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

    return (
        <div className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-lg font-bold mb-2">
                {car.make} {car.model} ({car.year})
            </h2>
            <p>Price: {formatPrice(car.price)}</p>
            <p>Condition: {car.condition}</p>
            <p>Mileage: {car.mileage} km</p>
            <p>Location: {car.location}</p>
        </div>
    );
};

export default DetailedVehicleCard;
