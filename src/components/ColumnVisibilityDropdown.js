
import React, { forwardRef } from 'react';
import DropdownHeader from './DropdownHeader';
import DropdownActions from './DropdownActions';
import ColumnCheckboxList from './ColumnCheckboxList';

const ColumnVisibilityDropdown = forwardRef(({
  position,
  columns,
  hiddenColumns,
  toggleColumnVisibility,
  showAllColumns,
  hideAllColumns,
  onClose
}, ref) => {
  const visibleCount = columns.length - hiddenColumns.size;
  const canHideAll = visibleCount > 1;

  return (
    <div
      ref={ref}
      className="dropdown-menu"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 1000
      }}
      role="menu"
      aria-label="Column visibility options"
    >
      <DropdownHeader
        title="Column Visibility"
        subtitle={`${visibleCount} of ${columns.length} visible`}
      />

      <DropdownActions
        onShowAll={showAllColumns}
        onHideAll={hideAllColumns}
        canHideAll={canHideAll}
        visibleCount={visibleCount}
        totalCount={columns.length}
      />

      <div className="dropdown-divider" />

      <ColumnCheckboxList
        columns={columns}
        hiddenColumns={hiddenColumns}
        toggleColumnVisibility={toggleColumnVisibility}
        visibleCount={visibleCount}
      />
    </div>
  );
});

ColumnVisibilityDropdown.displayName = 'ColumnVisibilityDropdown';

export default ColumnVisibilityDropdown;
