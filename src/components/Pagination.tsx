import React from "react";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center py-4 space-x-2 font-semibold">
      {currentPage > 1 && (
        <button
          className="px-4 py-2 rounded bg-[#F9F1E7] hover:bg-[#feebd5] text-black"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
      )}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded ${
            currentPage === index + 1
              ? "bg-[#B88E2F] hover:bg-[#b99746] text-white"
              : "bg-[#F9F1E7] hover:bg-[#feebd5] text-black"
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className="px-4 py-2 rounded bg-[#F9F1E7] hover:bg-[#feebd5] text-black"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
