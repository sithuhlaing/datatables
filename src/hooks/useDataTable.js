
import { useMemo } from 'react';
import { useSearch } from './useSearch';
import { useColumnFilters } from './useColumnFilters';
import { useColumnVisibility } from './useColumnVisibility';
import { useColumnReordering } from './useColumnReordering';
import { useSorting } from './useSorting';
import { usePagination } from './usePagination';
import { applyFilters, applySorting } from '../utils/dataProcessing';

export const useDataTable = (data, itemsPerPage) => {
  // Extract columns from data
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  // Initialize hooks
  const { searchTerm, setSearchTerm } = useSearch();
  const {
    columnFilters,
    updateColumnFilter,
    clearColumnFilter,
    clearAllFilters
  } = useColumnFilters();

  const {
    hiddenColumns,
    visibleColumns: baseVisibleColumns,
    toggleColumnVisibility,
    showAllColumns,
    hideAllColumns
  } = useColumnVisibility(columns);

  const {
    orderedColumns,
    moveColumn,
    resetColumns
  } = useColumnReordering(columns);

  const {
    sortConfig,
    handleSort,
    getSortInfo,
    clearSort
  } = useSorting();

  // Get visible columns in the correct order
  const visibleColumns = useMemo(() => {
    return orderedColumns.filter(column => !hiddenColumns.has(column));
  }, [orderedColumns, hiddenColumns]);

  // Apply filters and sorting
  const filteredData = useMemo(() => {
    let result = applyFilters(data, searchTerm, columnFilters);
    result = applySorting(result, sortConfig);
    return result;
  }, [data, searchTerm, columnFilters, sortConfig]);

  // Pagination
  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    startIndex,
    endIndex
  } = usePagination(filteredData, itemsPerPage);

  return {
    // Data and filtering
    filteredData,
    paginatedData,
    searchTerm,
    setSearchTerm,
    columnFilters,
    updateColumnFilter,
    clearColumnFilter,
    clearAllFilters,

    // Columns and visibility
    columns: orderedColumns,
    visibleColumns,
    hiddenColumns,
    toggleColumnVisibility,
    showAllColumns,
    hideAllColumns,
    moveColumn,
    resetColumns,

    // Sorting
    sortConfig,
    handleSort,
    getSortInfo,
    clearSort,

    // Pagination
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    startIndex,
    endIndex
  };
};
