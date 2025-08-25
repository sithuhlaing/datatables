
import { useState, useCallback } from 'react';

export const useColumnReordering = (initialColumns) => {
  const [orderedColumns, setOrderedColumns] = useState(initialColumns);

  const moveColumn = useCallback((fromIndex, toIndex) => {
    setOrderedColumns(prev => {
      const newColumns = [...prev];
      const [movedColumn] = newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, movedColumn);
      return newColumns;
    });
  }, []);

  const resetColumns = useCallback(() => {
    setOrderedColumns(initialColumns);
  }, [initialColumns]);

  return {
    orderedColumns,
    moveColumn,
    resetColumns
  };
};
