import React from 'react';

const ItemsPerPageSelector = ({ itemsPerPage, onItemsPerPageChange, totalItems }) => {
  const options = [5, 10, 25, 50, 100];
  
  return (
    <div className="items-per-page-selector">
      <label htmlFor="items-per-page" className="items-per-page-label">
        Show
      </label>
      <select
        id="items-per-page"
        value={itemsPerPage}
        onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
        className="items-per-page-select"
        aria-label="Number of entries per page"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="items-per-page-text">
        entries per page
      </span>
    </div>
  );
};

export default ItemsPerPageSelector;
