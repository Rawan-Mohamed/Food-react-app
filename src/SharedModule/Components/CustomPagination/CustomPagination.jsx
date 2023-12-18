import React from 'react';

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const visiblePageLimit = 5; // Number of visible pages
  const halfVisiblePageLimit = Math.floor(visiblePageLimit / 2);

  const startPage = Math.max(1, currentPage - halfVisiblePageLimit);
  const endPage = Math.min(totalPages, startPage + visiblePageLimit - 1);

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center pagination-sm">
        {currentPage > 1 && (
          <li className="page-item" onClick={() => onPageChange(currentPage - 1)}>
            <a className="page-link">Previous</a>
          </li>
        )}

        {pages.map((page) => (
          <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`} onClick={() => onPageChange(page)}>
            <a className="page-link">{page}</a>
          </li>
        ))}

        {currentPage < totalPages && (
          <li className="page-item" onClick={() => onPageChange(currentPage + 1)}>
            <a className="page-link">Next</a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default CustomPagination;