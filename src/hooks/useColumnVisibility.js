
import { useState, useCallback } from 'react';

export const useColumnVisibility = (initialColumns) => {
  const [hiddenColumns, setHiddenColumns] = useState(new Set());

  const toggleColumnVisibility = useCallback((column) => {
    setHiddenColumns(prev => {
      const newHidden = new Set(prev);
      if (newHidden.has(column)) {
        newHidden.delete(column);
      } else {
        // Don't allow hiding the last visible column
        const visibleCount = initialColumns.length - newHidden.size;
        if (visibleCount > 1) {
          newHidden.add(column);
        }
      }
      return newHidden;
    });
  }, [initialColumns.length]);

  const showAllColumns = useCallback(() => {
    setHiddenColumns(new Set());
  }, []);

  const hideAllColumns = useCallback(() => {
    // Keep at least one column visible
    const newHidden = new Set(initialColumns.slice(1));
    setHiddenColumns(newHidden);
  }, [initialColumns]);

  const visibleColumns = initialColumns.filter(column => !hiddenColumns.has(column));

  return {
    hiddenColumns,
    visibleColumns,
    toggleColumnVisibility,
    showAllColumns,
    hideAllColumns
  };
};
