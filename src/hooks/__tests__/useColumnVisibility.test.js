import { renderHook, act } from '@testing-library/react';
import { useColumnVisibility } from '../useColumnVisibility';

describe('useColumnVisibility Hook', () => {
  const columns = ['firstName', 'lastName', 'age', 'email', 'phone'];

  test('initializes with all columns visible', () => {
    const { result } = renderHook(() => useColumnVisibility(columns));
    
    expect(result.current.hiddenColumns.size).toBe(0);
    expect(result.current.visibleColumns).toEqual(columns);
  });

  test('toggles column visibility', () => {
    const { result } = renderHook(() => useColumnVisibility(columns));
    
    act(() => {
      result.current.toggleColumnVisibility('firstName');
    });
    
    expect(result.current.hiddenColumns.has('firstName')).toBe(true);
    expect(result.current.visibleColumns).toEqual(['lastName', 'age', 'email', 'phone']);
  });

  test('toggles hidden column back to visible', () => {
    const { result } = renderHook(() => useColumnVisibility(columns));
    
    // Hide column
    act(() => {
      result.current.toggleColumnVisibility('firstName');
    });
    
    // Show column again
    act(() => {
      result.current.toggleColumnVisibility('firstName');
    });
    
    expect(result.current.hiddenColumns.has('firstName')).toBe(false);
    expect(result.current.visibleColumns).toEqual(columns);
  });

  test('shows all columns', () => {
    const { result } = renderHook(() => useColumnVisibility(columns));
    
    // Hide some columns first
    act(() => {
      result.current.toggleColumnVisibility('firstName');
      result.current.toggleColumnVisibility('age');
    });
    
    expect(result.current.hiddenColumns.size).toBe(2);
    
    // Show all columns
    act(() => {
      result.current.showAllColumns();
    });
    
    expect(result.current.hiddenColumns.size).toBe(0);
    expect(result.current.visibleColumns).toEqual(columns);
  });

  test('hides all columns except one', () => {
    const { result } = renderHook(() => useColumnVisibility(columns));
    
    act(() => {
      result.current.hideAllColumns();
    });
    
    expect(result.current.hiddenColumns.size).toBe(4);
    expect(result.current.visibleColumns).toHaveLength(1);
    expect(result.current.visibleColumns[0]).toBe('firstName'); // First column should remain visible
  });

  test('maintains column order in visibleColumns', () => {
    const { result } = renderHook(() => useColumnVisibility(columns));
    
    act(() => {
      result.current.toggleColumnVisibility('lastName');
      result.current.toggleColumnVisibility('phone');
    });
    
    expect(result.current.visibleColumns).toEqual(['firstName', 'age', 'email']);
  });

  test('handles non-existent column toggle gracefully', () => {
    const { result } = renderHook(() => useColumnVisibility(columns));
    
    act(() => {
      result.current.toggleColumnVisibility('nonExistentColumn');
    });
    
    expect(result.current.hiddenColumns.has('nonExistentColumn')).toBe(true);
    expect(result.current.visibleColumns).toEqual(columns);
  });

  test('updates when columns array changes', () => {
    const { result, rerender } = renderHook(
      ({ cols }) => useColumnVisibility(cols),
      { initialProps: { cols: columns } }
    );
    
    // Hide a column
    act(() => {
      result.current.toggleColumnVisibility('firstName');
    });
    
    expect(result.current.hiddenColumns.has('firstName')).toBe(true);
    
    // Change columns array
    const newColumns = ['newCol1', 'newCol2', 'newCol3'];
    rerender({ cols: newColumns });
    
    expect(result.current.visibleColumns).toEqual(newColumns);
    expect(result.current.hiddenColumns.size).toBe(0);
  });

  test('handles empty columns array', () => {
    const { result } = renderHook(() => useColumnVisibility([]));
    
    expect(result.current.hiddenColumns.size).toBe(0);
    expect(result.current.visibleColumns).toEqual([]);
    
    act(() => {
      result.current.showAllColumns();
    });
    
    expect(result.current.visibleColumns).toEqual([]);
  });

  test('handles single column array', () => {
    const singleColumn = ['onlyColumn'];
    const { result } = renderHook(() => useColumnVisibility(singleColumn));
    
    expect(result.current.visibleColumns).toEqual(singleColumn);
    
    // Try to hide the only column
    act(() => {
      result.current.toggleColumnVisibility('onlyColumn');
    });
    
    expect(result.current.hiddenColumns.has('onlyColumn')).toBe(true);
    expect(result.current.visibleColumns).toEqual([]);
    
    // Hide all should still work
    act(() => {
      result.current.hideAllColumns();
    });
    
    expect(result.current.visibleColumns).toEqual(['onlyColumn']);
  });
});
