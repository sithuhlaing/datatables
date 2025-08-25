
import { useState, useCallback } from 'react';

export const useColumnOrder = (initialColumns) => {
  const [columnOrder, setColumnOrder] = useState(initialColumns);

  const moveColumn = useCallback((dragIndex, hoverIndex) => {
    setColumnOrder(prevOrder => {
      const newOrder = [...prevOrder];
      const draggedColumn = newOrder[dragIndex];

      // Remove the dragged column
      newOrder.splice(dragIndex, 1);
      // Insert it at the new position
      newOrder.splice(hoverIndex, 0, draggedColumn);

      return newOrder;
    });
  }, []);

  const resetColumnOrder = useCallback(() => {
    setColumnOrder(initialColumns);
  }, [initialColumns]);

  return {
    columnOrder,
    moveColumn,
    resetColumnOrder
  };
};
