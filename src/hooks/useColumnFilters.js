
import { useState, useCallback } from 'react';

export const useColumnFilters = () => {
  const [columnFilters, setColumnFilters] = useState({});

  const updateColumnFilter = useCallback((column, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }));
  }, []);

  const clearColumnFilter = useCallback((column) => {
    setColumnFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setColumnFilters({});
  }, []);

  return {
    columnFilters,
    updateColumnFilter,
    clearColumnFilter,
    clearAllFilters
  };
};
