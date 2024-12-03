import React from "react";
import { JSX } from "react/jsx-runtime";

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange,}) => {
    const pages: JSX.Element[] = []
    const handlePageClick = (page: number) =>{
        onPageChange(page)
    }
    const renderPageNumbers = () => {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 mx-1 ${
                        currentPage === i
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                    } rounded`}>
                    {i}
                </button>
            )
        }
        return pages
    }
    return (

        <div className="flex justify-center items-center mt-4">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
            >
                {currentPage}
                Previous
            </button>
            {renderPageNumbers()}
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
