
export const getColumns = (data) => {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]);
};

export const formatCellValue = (value) => {
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return value?.toString() || '';
};
