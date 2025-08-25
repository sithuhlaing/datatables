
import { useState, useMemo } from 'react';

export const useColumnSearch = (data) => {
  const [columnFilters, setColumnFilters] = useState({});

  const updateColumnFilter = (column, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }));
  };

  const clearColumnFilter = (column) => {
    setColumnFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[column];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setColumnFilters({});
  };

  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    if (Object.keys(columnFilters).length === 0) return data;

    return data.filter(item => {
      return Object.entries(columnFilters).every(([column, filterValue]) => {
        if (!filterValue) return true;

        const cellValue = item[column];
        return String(cellValue)
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    });
  }, [data, columnFilters]);

  return {
    columnFilters,
    updateColumnFilter,
    clearColumnFilter,
    clearAllFilters,
    filteredData
  };
};
