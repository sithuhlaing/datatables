import { renderHook, act } from '@testing-library/react';
import { useColumnOrder } from '../useColumnOrder';

describe('useColumnOrder Hook', () => {
  const initialColumns = ['firstName', 'lastName', 'age', 'email', 'phone'];

  test('initializes with provided columns', () => {
    const { result } = renderHook(() => useColumnOrder(initialColumns));
    
    expect(result.current.columnOrder).toEqual(initialColumns);
  });

  test('moves column from one position to another', () => {
    const { result } = renderHook(() => useColumnOrder(initialColumns));
    
    act(() => {
      // Move firstName (index 0) to position 2
      result.current.moveColumn(0, 2);
    });
    
    expect(result.current.columnOrder).toEqual([
      'lastName', 'age', 'firstName', 'email', 'phone'
    ]);
  });

  test('moves column from end to beginning', () => {
    const { result } = renderHook(() => useColumnOrder(initialColumns));
    
    act(() => {
      // Move phone (index 4) to position 0
      result.current.moveColumn(4, 0);
    });
    
    expect(result.current.columnOrder).toEqual([
      'phone', 'firstName', 'lastName', 'age', 'email'
    ]);
  });

  test('moves column from beginning to end', () => {
    const { result } = renderHook(() => useColumnOrder(initialColumns));
    
    act(() => {
      // Move firstName (index 0) to position 4
      result.current.moveColumn(0, 4);
    });
    
    expect(result.current.columnOrder).toEqual([
      'lastName', 'age', 'email', 'phone', 'firstName'
    ]);
  });

  test('handles moving column to same position', () => {
    const { result } = renderHook(() => useColumnOrder(initialColumns));
    
    act(() => {
      // Move firstName (index 0) to position 0
      result.current.moveColumn(0, 0);
    });
    
    expect(result.current.columnOrder).toEqual(initialColumns);
  });

  test('resets column order to initial state', () => {
    const { result } = renderHook(() => useColumnOrder(initialColumns));
    
    // First, change the order
    act(() => {
      result.current.moveColumn(0, 2);
    });
    
    expect(result.current.columnOrder).not.toEqual(initialColumns);
    
    // Then reset
    act(() => {
      result.current.resetColumnOrder();
    });
    
    expect(result.current.columnOrder).toEqual(initialColumns);
  });

  test('handles multiple column moves', () => {
    const { result } = renderHook(() => useColumnOrder(initialColumns));
    
    act(() => {
      // Move firstName to position 2
      result.current.moveColumn(0, 2);
    });
    
    act(() => {
      // Move email (now at index 3) to position 0
      result.current.moveColumn(3, 0);
    });
    
    expect(result.current.columnOrder).toEqual([
      'email', 'lastName', 'age', 'firstName', 'phone'
    ]);
  });

  test('maintains column integrity during moves', () => {
    const { result } = renderHook(() => useColumnOrder(initialColumns));
    
    act(() => {
      result.current.moveColumn(1, 3);
    });
    
    // Check that all original columns are still present
    const sortedOriginal = [...initialColumns].sort();
    const sortedResult = [...result.current.columnOrder].sort();
    
    expect(sortedResult).toEqual(sortedOriginal);
    expect(result.current.columnOrder).toHaveLength(initialColumns.length);
  });

  test('handles edge case with single column', () => {
    const singleColumn = ['onlyColumn'];
    const { result } = renderHook(() => useColumnOrder(singleColumn));
    
    act(() => {
      result.current.moveColumn(0, 0);
    });
    
    expect(result.current.columnOrder).toEqual(singleColumn);
  });

  test('handles edge case with empty array', () => {
    const emptyColumns = [];
    const { result } = renderHook(() => useColumnOrder(emptyColumns));
    
    expect(result.current.columnOrder).toEqual([]);
    
    act(() => {
      result.current.resetColumnOrder();
    });
    
    expect(result.current.columnOrder).toEqual([]);
  });

  test('updates when initial columns change', () => {
    const { result, rerender } = renderHook(
      ({ columns }) => useColumnOrder(columns),
      { initialProps: { columns: initialColumns } }
    );
    
    expect(result.current.columnOrder).toEqual(initialColumns);
    
    const newColumns = ['newCol1', 'newCol2'];
    rerender({ columns: newColumns });
    
    act(() => {
      result.current.resetColumnOrder();
    });
    
    expect(result.current.columnOrder).toEqual(newColumns);
  });
});
