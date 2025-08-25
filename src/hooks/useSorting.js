
import { useReducer, useCallback } from 'react';

const sortReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_SORT': {
      const { column } = action.payload;
      const existingIndex = state.findIndex(item => item.key === column);

      if (existingIndex === -1) {
        // Add new sort
        return [...state, { key: column, direction: 'asc' }];
      } else {
        const currentDirection = state[existingIndex].direction;
        if (currentDirection === 'asc') {
          // Change to desc
          return state.map((item, index) =>
            index === existingIndex
              ? { ...item, direction: 'desc' }
              : item
          );
        } else {
          // Remove sort
          return state.filter((_, index) => index !== existingIndex);
        }
      }
    }
    case 'CLEAR_SORT':
      return [];
    default:
      return state;
  }
};

export const useSorting = () => {
  const [sortConfig, dispatch] = useReducer(sortReducer, []);

  const handleSort = useCallback((column) => {
    dispatch({ type: 'TOGGLE_SORT', payload: { column } });
  }, []);

  const clearSort = useCallback(() => {
    dispatch({ type: 'CLEAR_SORT' });
  }, []);

  const getSortInfo = useCallback((column) => {
    const sortItem = sortConfig.find(item => item.key === column);
    if (!sortItem) {
      return { icon: '', order: null };
    }

    const order = sortConfig.findIndex(item => item.key === column) + 1;
    const icon = sortItem.direction === 'asc' ? '↑' : '↓';

    return { icon, order };
  }, [sortConfig]);

  return {
    sortConfig,
    handleSort,
    clearSort,
    getSortInfo
  };
};
