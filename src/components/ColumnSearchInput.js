
import React from 'react';

const ColumnSearchInput = ({ column, value, onChange, onClear }) => {
  // Prevent drag events from bubbling up to the header
  const handleMouseDown = (e) => {
    e.stopPropagation();
  };

  const handleDragStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      className="column-search"
      onMouseDown={handleMouseDown}
      onDragStart={handleDragStart}
    >
      <input
        type="text"
        placeholder={`Search ${column}...`}
        value={value || ''}
        onChange={(e) => onChange(column, e.target.value)}
        className="column-search-input"
        draggable={false}
      />
      {value && (
        <button
          onClick={() => onClear(column)}
          className="clear-filter-btn"
          title="Clear filter"
          draggable={false}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ColumnSearchInput;
