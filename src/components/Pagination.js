
import React from 'react';
import ItemsPerPageSelector from './ItemsPerPageSelector';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  handlePageChange, 
  itemsPerPage, 
  handleItemsPerPageChange, 
  totalItems 
}) => {
  if (totalPages <= 1 && totalItems <= 10) return null;

  return (
    <div className="pagination">
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        totalItems={totalItems}
      />
      
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
