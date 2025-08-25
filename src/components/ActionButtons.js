import React from 'react';

const ActionButtons = ({ onClearFilters, onResetColumns, hasFilters, onShowAll, onHideAll, canShowAll, canHideAll }) => (
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
      onClick={onShowAll}
      disabled={!canShowAll}
      className="nhsuk-button nhsuk-button--secondary"
    >
      Show All
    </button>
    <button
      onClick={onHideAll}
      disabled={!canHideAll}
      className="nhsuk-button nhsuk-button--secondary"
    >
      Hide All
    </button>
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
