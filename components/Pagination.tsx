'use client '

import { PaginationComponentProps, PaginationProps, } from "@/types/homeTypes";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Pagination: React.FC<PaginationComponentProps> = ({
  totalItems,
  from,
  to,
  pageNumber,
  pageSize,
  currentPage,
  lastPage,
  setPageNumber,
  setPageSize
}) => {
  
  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between w-full flex-wrap gap-2">
        {/* Previous Button */}
        <button
          className="flex items-center gap-1 px-4 py-2 text-sm border rounded-md shadow-sm border-slate-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          <BsArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex flex-col items-center">
          {/* Current Page */}
          <div className="flex items-center flex-wrap gap-1 justify-center">
                <button 
                  className={`px-3 py-1 text-sm border rounded-md
                       "border-slate-300 text-gray-300"
                  `}
                >
                  {pageNumber}
                </button>
            
          </div>

         
        </div>

        {/* Next Button */}
        <button
          className="flex items-center gap-1 px-4 py-2 text-sm border rounded-md shadow-sm border-slate-300 disabled:opacity-50 cursor-pointer"
          onClick={() => setPageNumber(currentPage + 1)}
          // disabled={currentPage >= totalPages}
        >
          Next
          <BsArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
