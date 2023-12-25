const createPageRange = (currentPage, totalPages) => {
    const rangeSize = 3;
    const range = [];

    for (let i = Math.max(2, currentPage - rangeSize); i <= Math.min(totalPages - 1, currentPage + rangeSize); i++) {
      range.push(i);
    }

    if (currentPage - rangeSize > 2) {
      range.unshift("...");
    }
    if (currentPage + rangeSize < totalPages - 1) {
      range.push("...");
    }

    if (currentPage - rangeSize > 1) {
      range.unshift(1);
    }
    if (currentPage + rangeSize < totalPages) {
      range.push(totalPages);
    }

    return range;
  };

  const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const pageRange = createPageRange(currentPage, totalPages);

    const handlePageChange = (newPage) => {
      if (newPage === "...") {
        return;
      }
      onPageChange(newPage);
    };

    return (
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {pageRange.map((page, index) => (
          <button key={index} onClick={() => handlePageChange(page)} className={page === currentPage ? "active" : ""}>
            {page}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };

  export default PaginationComponent;