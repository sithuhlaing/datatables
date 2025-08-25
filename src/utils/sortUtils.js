
const isDate = (value) => {
  if (value instanceof Date) return true;
  if (typeof value === 'string') {
    // Check if string looks like a date
    const datePatterns = [
      /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
      /^\d{2}-\d{2}-\d{4}$/, // MM-DD-YYYY
      /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
      /^\d{1,2}\/\d{1,2}\/\d{4}$/, // M/D/YYYY or MM/DD/YYYY
      /^\w{3}\s\d{1,2},\s\d{4}$/, // Jan 1, 2023
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, // ISO format
    ];

    return datePatterns.some(pattern => pattern.test(value)) && !isNaN(Date.parse(value));
  }
  return false;
};

const parseDate = (value) => {
  if (value instanceof Date) return value;
  if (typeof value === 'string') {
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
};

const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

const compareValues = (aValue, bValue, direction) => {
  // Handle null/undefined values
  if (aValue == null && bValue == null) return 0;
  if (aValue == null) return direction === 'asc' ? 1 : -1;
  if (bValue == null) return direction === 'asc' ? -1 : 1;

  // Check if both values are dates
  if (isDate(aValue) && isDate(bValue)) {
    const dateA = parseDate(aValue);
    const dateB = parseDate(bValue);

    if (dateA && dateB) {
      const comparison = dateA.getTime() - dateB.getTime();
      return direction === 'asc' ? comparison : -comparison;
    }
  }

  // Check if both values are numeric
  if (isNumeric(aValue) && isNumeric(bValue)) {
    const numA = parseFloat(aValue);
    const numB = parseFloat(bValue);
    const comparison = numA - numB;
    return direction === 'asc' ? comparison : -comparison;
  }

  // Default to string comparison
  const strA = String(aValue).toLowerCase();
  const strB = String(bValue).toLowerCase();

  if (strA < strB) return direction === 'asc' ? -1 : 1;
  if (strA > strB) return direction === 'asc' ? 1 : -1;
  return 0;
};

export const sortData = (data, sortConfig) => {
  if (sortConfig.length === 0) {
    return data;
  }

  const sorted = [...data].sort((a, b) => {
    for (const config of sortConfig) {
      const { key, direction } = config;
      const aValue = a[key];
      const bValue = b[key];

      const comparison = compareValues(aValue, bValue, direction);
      if (comparison !== 0) return comparison;
    }
    return 0;
  });

  return sorted;
};

// Helper function to detect column data types
export const detectColumnType = (data, columnKey) => {
  if (!data || data.length === 0) return 'string';

  const sampleSize = Math.min(10, data.length);
  const samples = data.slice(0, sampleSize).map(row => row[columnKey]).filter(val => val != null);

  if (samples.length === 0) return 'string';

  // Check if all samples are dates
  if (samples.every(val => isDate(val))) return 'date';

  // Check if all samples are numbers
  if (samples.every(val => isNumeric(val))) return 'number';

  return 'string';
};
