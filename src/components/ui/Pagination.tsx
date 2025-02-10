import React, {useEffect, useMemo} from "react";

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange,}) => {
    // const pages: JSX.Element[] = []
    const handlePageClick = (page: number) => {
        onPageChange(page)
    }
    useEffect(() => {
        console.log(totalPages, currentPage)
    }, [totalPages, currentPage]);
    console.log("totalPages:", totalPages, "currentPage:", currentPage);
    const renderPageNumbers = () => {
        return Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
            <button
                key={`pagination-${page}`}
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 mx-1 ${
                    currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                } rounded`}>
                {page}
            </button>
        ));
    }
    return (

        <div className="flex justify-center items-center mt-4">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
                Prev
            </button>
            {totalPages !== undefined && currentPage !== undefined ?
                Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                    <button
                        key={`pagination-${page}`}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 mx-1 ${
                            currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        } rounded`}>
                        {page}
                    </button>
                ))
                : ('')}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
