
import React from 'react';
import ColumnCheckboxItem from './ColumnCheckboxItem';

const ColumnCheckboxList = ({
  columns,
  hiddenColumns,
  toggleColumnVisibility,
  visibleCount
}) => (
  <div className="dropdown-items" role="group" aria-label="Column list">
    {columns.map((column) => (
      <ColumnCheckboxItem
        key={column}
        column={column}
        isVisible={!hiddenColumns.has(column)}
        isDisabled={!hiddenColumns.has(column) && visibleCount === 1}
        onToggle={() => toggleColumnVisibility(column)}
      />
    ))}
  </div>
);

export default ColumnCheckboxList;
