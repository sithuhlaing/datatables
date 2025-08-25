
import React from 'react';

const ActionButtons = ({ onClearFilters, onResetColumns, hasFilters }) => (
  <>
    {hasFilters && (
      <button
        onClick={onClearFilters}
        className="clear-all-filters-btn"
        title="Clear all filters"
      >
        Clear Filters
      </button>
    )}

    <button
      onClick={onResetColumns}
      className="reset-columns-btn"
      title="Reset column order and visibility"
    >
      Reset Columns
    </button>
  </>
);

export default ActionButtons;
