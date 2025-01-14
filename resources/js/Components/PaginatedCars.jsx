import React, { useState, useEffect } from "react";
import CarCard from "./CarCard";
import { Paginator } from "./Paginator";

const PaginatedCars = ({ cars }) => {
    const [carList, setCarList] = useState(cars.data || []); // Cars data from Laravel
    const [currentPage, setCurrentPage] = useState(cars.current_page || 1); // Current page
    const [totalPages, setTotalPages] = useState(cars.last_page || 1); // Total pages

    const fetchPage = async (pageNumber) => {
        try {
            const response = await axios.get(`/vehicles?page=${pageNumber}`);
            setCarList(response.data.data);
            setCurrentPage(response.data.current_page);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error("Failed to fetch cars:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        fetchPage(pageNumber);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {carList.map((car) => (
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
