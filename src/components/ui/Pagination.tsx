import React, {useEffect, useMemo} from "react";

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange,}) => {
    const handlePageClick = (page: number) => {
        onPageChange(page)
    }
    return (

        <div className="flex justify-center items-center mt-4">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-white text-gray-800 dark:bg-black dark:text-gray-400 rounded disabled:opacity-20"
            >
                Prev
            </button>
            {totalPages !== undefined && currentPage !== undefined ?
                Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                    <button
                        key={`pagination-${page}`}
                        onClick={() => onPageChange(page)}
                        disabled={currentPage === page}
                        className={`px-3 py-1 mx-1 ${
                            currentPage === page
                                ? "bg-gray-200 text-black dark:bg-white dark:text-black"
                                : "bg-white text-gray-700 dark:bg-black dark:text-gray-500"
                        } rounded`}>
                        {page}
                    </button>
                ))
                : ('')}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-white text-gray-800 dark:bg-black dark:text-gray-400 rounded disabled:opacity-20"
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
