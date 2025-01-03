export const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex items-center justify-center space-x-4 mt-8">
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
                Next Page
            </button>
            <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => onPageChange(index + 1)}
                        className={`w-10 h-10 rounded-full ${
                            currentPage === index + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        } transition-colors`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
