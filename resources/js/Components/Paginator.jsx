export const Paginator = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-4">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-1 mx-1 ${
                        page === currentPage
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300"
                    }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};
