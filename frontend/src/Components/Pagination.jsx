import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

const Pagination = ({
  currentPage,
  totalPages,
  totalRecords,
  itemsPerPage,
  setItemsPerPage,
  handlePageChange,
}) => {
  const [inputValue, setInputValue] = useState(itemsPerPage);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setInputValue(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const value = Number(inputValue);
      if (value > 0 && value <= 999) {
        setItemsPerPage(value);
      } else {
        setInputValue(itemsPerPage);
        toast.error("Please enter a value between 1 and 999");
      }
    }
  };

  const renderPaginationLinks = () => {
    const paginationArray = [];
    const showCompact = windowWidth < 640; // sm breakpoint

    paginationArray.push(
      <button
        key={1}
        className={`relative rounded-lg mx-0.5 sm:mx-1 flex items-center justify-center h-9 sm:h-10 w-9 sm:w-10 text-sm sm:text-base font-medium transition-colors duration-200 ${
          currentPage === 1
            ? "z-10 bg-primary text-white"
            : "text-primary bg-main border border-gray-300 hover:bg-hover focus:z-20 cursor-pointer"
        }`}
        onClick={() => currentPage !== 1 && handlePageChange(1)}
      >
        1
      </button>
    );
    if (currentPage > (showCompact ? 2 : 3)) {
      paginationArray.push(
        <span key="ellipsis1" className="px-1 sm:px-3 text-primary">
          ...
        </span>
      );
    }
    const startPage = showCompact
      ? Math.max(2, currentPage - 1)
      : Math.max(2, currentPage - 1);
    const endPage = showCompact
      ? Math.min(totalPages - 1, currentPage + 1)
      : Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      paginationArray.push(
        <button
          key={i}
          className={`relative rounded-lg mx-0.5 sm:mx-1 flex items-center justify-center h-9 sm:h-10 w-9 sm:w-10 text-sm sm:text-base font-medium transition-colors duration-200 ${
            i === currentPage
              ? "z-10 bg-primary text-white"
              : "text-primary bg-main border border-gray-300 hover:bg-hover focus:z-20 cursor-pointer"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if needed after middle pages
    if (currentPage < totalPages - (showCompact ? 2 : 3)) {
      paginationArray.push(
        <span key="ellipsis2" className="px-1 sm:px-3 text-primary">
          ...
        </span>
      );
    }

    // Show last page if there's more than 1 page
    if (totalPages > 1) {
      paginationArray.push(
        <button
          key={totalPages}
          className={`relative rounded-lg mx-0.5 sm:mx-1 flex items-center justify-center h-9 sm:h-10 w-9 sm:w-10 text-sm sm:text-base font-medium transition-colors duration-200 ${
            currentPage === totalPages
              ? "z-10 bg-primary text-white"
              : "text-primary bg-main border border-gray-300 hover:bg-hover focus:z-20 cursor-pointer"
          }`}
          onClick={() =>
            currentPage !== totalPages && handlePageChange(totalPages)
          }
        >
          {totalPages}
        </button>
      );
    }

    return paginationArray;
  };

  return (
    <div className="w-full bg-main px-2 sm:px-4 py-3 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Records per page control - centered on mobile */}
        <div className="order-1 sm:order-none flex items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
          <span className="text-sm sm:text-base text-secondary whitespace-nowrap">
            Records per page:
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-16 sm:w-20 py-1.5 px-3 rounded-md bg-main text-primary border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
            placeholder="1-999"
            maxLength={3}
          />
        </div>

        {/* Pagination controls */}
        <div className="order-2 sm:order-none flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-center mb-2 sm:mb-0">
          <button
            disabled={currentPage === 1}
            className={`relative inline-flex items-center rounded-md border border-gray-300 px-2 py-1.5 sm:px-3 sm:py-2 text-sm font-medium ${
              currentPage === 1
                ? "bg-main text-gray-400 cursor-not-allowed"
                : "bg-main text-primary hover:bg-hover cursor-pointer"
            }`}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          >
            <ChevronLeft />
          </button>

          <nav className="isolate inline-flex rounded-md shadow-sm">
            {renderPaginationLinks()}
          </nav>

          <button
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center rounded-md border border-gray-300 px-2 py-1.5 sm:px-3 sm:py-2 text-sm font-medium ${
              currentPage === totalPages
                ? "bg-main text-gray-400 cursor-not-allowed"
                : "bg-main text-primary hover:bg-hover cursor-pointer"
            }`}
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
          >
            <ChevronRight />
          </button>
        </div>

        {/* Total records - centered on mobile */}
        <div className="order-3 sm:order-none flex items-center justify-center sm:justify-start w-full sm:w-auto">
          <span className="text-sm sm:text-base text-secondary px-3 py-1.5 rounded-md bg-main">
            Total Records: {totalRecords.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
