
import React from 'react';

const DropdownActions = ({
  onShowAll,
  onHideAll,
  canHideAll,
  visibleCount,
  totalCount
}) => (
  <div className="dropdown-actions">
    <button
      onClick={onShowAll}
      className="dropdown-action-btn"
      disabled={visibleCount === totalCount}
      title="Show all columns"
    >
      Show All
    </button>
    <button
      onClick={onHideAll}
      className="dropdown-action-btn"
      disabled={!canHideAll}
      title={canHideAll ? "Hide all but one column" : "Cannot hide all columns"}
    >
      Hide All
    </button>
  </div>
);

export default DropdownActions;
