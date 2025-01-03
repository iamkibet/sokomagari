import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import { Paginator } from "./Paginator";

const PaginatedCars = ({ cars }) => {
    const [carList, setCarList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const carsPerPage = 10;

    useEffect(() => {
        if (cars && cars.data) {
            setCarList(cars.data);
            setTotalPages(Math.ceil(cars.data.length / carsPerPage));
        }
    }, [cars]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!cars || !cars.data) {
        return <div>Loading...</div>;
    }

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = carList.slice(indexOfFirstCar, indexOfLastCar);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>

            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default PaginatedCars;
