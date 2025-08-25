
import React, { useMemo, useEffect } from 'react';
import { useSorting } from '../hooks/useSorting';
import { useSearch } from '../hooks/useSearch';
import { useColumnSearch } from '../hooks/useColumnSearch';
import { useColumnOrder } from '../hooks/useColumnOrder';
import { useColumnVisibility } from '../hooks/useColumnVisibility';
import { usePagination } from '../hooks/usePagination';
import { sortData } from '../utils/sortUtils';
import { getColumns } from '../utils/tableUtils';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import SearchInput from './SearchInput';
import Pagination from './Pagination';
import ColumnVisibilityButton from './ColumnVisibilityButton';
import './DataTable.css';

const DataTable = ({ data, itemsPerPage = 10 }) => {
  // Get initial columns from data
  const initialColumns = useMemo(() => getColumns(data), [data]);

  // Custom hooks for different concerns
  const { sortConfig, handleSort, getSortInfo } = useSorting();
  const { searchTerm, setSearchTerm, filteredData: globalFilteredData } = useSearch(data);
  const {
    columnFilters,
    updateColumnFilter,
    clearColumnFilter,
    clearAllFilters,
    filteredData: columnFilteredData
  } = useColumnSearch(globalFilteredData);
  const { columnOrder, moveColumn, resetColumnOrder } = useColumnOrder(initialColumns);
  const {
    hiddenColumns,
    visibleColumns,
    toggleColumnVisibility,
    showAllColumns,
    hideAllColumns
  } = useColumnVisibility(columnOrder);

  // Update column order when data changes
  useEffect(() => {
    const newColumns = getColumns(data);
    if (JSON.stringify(newColumns) !== JSON.stringify(initialColumns)) {
      resetColumnOrder();
    }
  }, [data, initialColumns, resetColumnOrder]);

  // Get visible columns in the correct order
  const orderedVisibleColumns = columnOrder.filter(column => !hiddenColumns.has(column));

  // Sort the filtered data
  const sortedData = useMemo(() => {
    return sortData(columnFilteredData, sortConfig);
  }, [columnFilteredData, sortConfig]);

  // Pagination
  const { currentPage, totalPages, paginatedData, handlePageChange } = usePagination(sortedData, itemsPerPage);

  // Early return for empty data
  if (!data || data.length === 0) {
    return <div className="data-table-empty">No data available</div>;
  }

  const hasActiveFilters = searchTerm || Object.keys(columnFilters).length > 0;

  return (
    <div className="data-table-container">
      <div className="data-table-header">
        <h2>Data Table</h2>
        <div className="data-table-controls">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchTerm('');
                clearAllFilters();
              }}
              className="clear-all-filters-btn"
            >
              Clear All Filters
            </button>
          )}
          <ColumnVisibilityButton
            columns={columnOrder}
            hiddenColumns={hiddenColumns}
            toggleColumnVisibility={toggleColumnVisibility}
            showAllColumns={showAllColumns}
            hideAllColumns={hideAllColumns}
          />
          <button
            onClick={resetColumnOrder}
            className="reset-columns-btn"
            title="Reset column order"
          >
            Reset Columns
          </button>
          <span className="results-count">
            Showing {paginatedData.length} of {sortedData.length} results
          </span>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <TableHeader
            columns={orderedVisibleColumns}
            getSortInfo={getSortInfo}
            handleSort={handleSort}
            columnFilters={columnFilters}
            updateColumnFilter={updateColumnFilter}
            clearColumnFilter={clearColumnFilter}
            moveColumn={moveColumn}
          />
          <TableBody data={paginatedData} columns={orderedVisibleColumns} />
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default DataTable;
