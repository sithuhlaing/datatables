
import React from 'react';
import ColumnVisibilityDropdown from './ColumnVisibilityDropdown';

const ColumnVisibilityButton = ({
  columns,
  hiddenColumns,
  toggleColumnVisibility,
  showAllColumns,
  hideAllColumns
}) => {
  return (
    <ColumnVisibilityDropdown
      columns={columns}
      hiddenColumns={hiddenColumns}
      toggleColumnVisibility={toggleColumnVisibility}
      showAllColumns={showAllColumns}
      hideAllColumns={hideAllColumns}
    />
  );
};

export default ColumnVisibilityButton;
