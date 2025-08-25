
import React from 'react';
import SearchInput from './SearchInput';
import ColumnVisibilityButton from './ColumnVisibilityButton';
import ActionButtons from './ActionButtons';

const DataTableHeader = ({
  searchTerm,
  onSearchChange,
  columns,
  hiddenColumns,
  toggleColumnVisibility,
  showAllColumns,
  hideAllColumns,
  clearAllFilters,
  resetColumns,
  filteredDataLength,
  totalDataLength
}) => {
  const hasFilters = searchTerm || Object.keys({}).length > 0; // columnFilters would be passed if needed

  return (
    <div className="data-table-header">
      <h2>Employee Data</h2>
      <div className="data-table-controls">
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search all columns..."
        />

        <ColumnVisibilityButton
          columns={columns}
          hiddenColumns={hiddenColumns}
          toggleColumnVisibility={toggleColumnVisibility}
          showAllColumns={showAllColumns}
          hideAllColumns={hideAllColumns}
        />

        <ActionButtons
          onClearFilters={clearAllFilters}
          onResetColumns={resetColumns}
          hasFilters={hasFilters}
        />

        <div className="results-count">
          Showing {filteredDataLength} of {totalDataLength} records
        </div>
      </div>
    </div>
  );
};

export default DataTableHeader;
