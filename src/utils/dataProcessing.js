
export const applyFilters = (data, searchTerm, columnFilters) => {
  if (!data) return [];

  return data.filter(item => {
    // Global search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesGlobalSearch = Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchLower)
      );
      if (!matchesGlobalSearch) return false;
    }

    // Column-specific filters
    for (const [column, filterValue] of Object.entries(columnFilters)) {
      if (filterValue) {
        const cellValue = String(item[column]).toLowerCase();
        const filterLower = filterValue.toLowerCase();
        if (!cellValue.includes(filterLower)) {
          return false;
        }
      }
    }

    return true;
  });
};

export const applySorting = (data, sortConfig) => {
  if (!sortConfig || sortConfig.length === 0) return data;

  return [...data].sort((a, b) => {
    for (const { key, direction } of sortConfig) {
      const aValue = a[key];
      const bValue = b[key];

      let comparison = 0;

      // Handle different data types
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        // String comparison
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        comparison = aStr.localeCompare(bStr);
      }

      if (comparison !== 0) {
        return direction === 'asc' ? comparison : -comparison;
      }
    }

    return 0;
  });
};

export const formatCellValue = (value, column) => {
  if (value === null || value === undefined) return '';

  // Format specific column types
  switch (column) {
    case 'salary':
      return typeof value === 'number'
        ? `$${value.toLocaleString()}`
        : value;

    case 'startDate':
      return value instanceof Date
        ? value.toLocaleDateString()
        : value;

    case 'isActive':
      return typeof value === 'boolean'
        ? (value ? '✅ Active' : '❌ Inactive')
        : value;

    case 'email':
      return value;

    default:
      return String(value);
  }
};
