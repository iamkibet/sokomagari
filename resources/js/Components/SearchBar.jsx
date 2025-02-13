import React, { useEffect, useState } from "react";

const SearchBar = () => {
    // Track focus to trigger the expansion of the search field
    const [isFocused, setIsFocused] = useState(false);
    //component state
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //debounce
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (query.length > 2) {
                fetchResults();
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const fetchResults = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `/vehicles/search?query=${encodeURIComponent(query)}`
            );
            setResults(response.data);
            setShowResults(true);
        } catch (error) {
            console.error("Search error:", error);
        }
        setIsLoading(false);
    };

    const handleViewAll = () => {
        router.get(route("vehicles.search", { search: query }));
    };

    const DownSvg = (
        <svg
            className="w-2.5 h-2.5 ms-2.5 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            viewBox="0 0 10 6"
        >
            <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
            />
        </svg>
    );
    return (
        <form className="max-w-md w-full flex items-center">
            <div className="flex w-full">
                {/* "All" Button */}
                <button
                    type="button"
                    className="flex-shrink-0 z-10 inline-flex items-center gap-2 py-2 px-4 text-sm font-medium border  rounded-l-full 
                      focus:outline-none focus:ring-2 "
                >
                    All
                    {DownSvg}
                </button>

                {/* Search Input Container */}
                <div
                    className={`relative transition-all duration-300 ease-in-out dark:bg-gray-800 rounded-r-full border border-gray-300 dark:border-gray-600 ${
                        isFocused ? "w-full" : "w-72"
                    }`}
                >
                    {/* Search Input */}
                    <input
                        type="search"
                        placeholder="Search for Vehicles or Bikes"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setShowResults(true)}
                        onBlur={() =>
                            setTimeout(() => setShowResults(false), 200)
                        }
                        className="block pl-10 pr-14 py-2.5 w-full text-sm text-gray-900 placeholder-gray-500 bg-transparent border-0 focus:outline-none focus:ring-0 dark:text-white"
                    />

                    {/* Search Icon */}
                    <svg
                        className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>

                    {/* Search Results Dropdown */}
                    {showResults && query.length > 2 && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                            {isLoading ? (
                                <div className="p-4 text-gray-500">
                                    Searching...
                                </div>
                            ) : results.length > 0 ? (
                                <>
                                    {results.map((car) => (
                                        <a
                                            key={car.id}
                                            href={route(
                                                "vehicles.show",
                                                car.slug
                                            )}
                                            className="block p-3 hover:bg-gray-50 border-b last:border-0 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={car.thumbnail}
                                                    alt={car.make}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                                <div>
                                                    <div className="font-medium">
                                                        {car.make} {car.model}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {car.year} •{" "}
                                                        {car.price.toLocaleString()}
                                                        $
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                    <div className="p-3 bg-gray-50 border-t">
                                        <button
                                            onClick={handleViewAll}
                                            className="w-full text-center text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            View All {results.length}+ Results
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="p-4 text-gray-500">
                                    No results found
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
