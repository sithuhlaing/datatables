import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import DraggableColumnHeader from '../DraggableColumnHeader';

const mockProps = {
  column: 'firstName',
  index: 0,
  visibleIndex: 0,
  getSortInfo: jest.fn(() => ({ icon: '↑', order: 1 })),
  handleSort: jest.fn(),
  columnFilters: {},
  updateColumnFilter: jest.fn(),
  clearColumnFilter: jest.fn(),
  moveColumn: jest.fn(),
  allColumns: ['firstName', 'lastName', 'age', 'email'],
  visibleColumns: ['firstName', 'lastName', 'age', 'email']
};

describe('DraggableColumnHeader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders column header with drag handle', () => {
    render(<DraggableColumnHeader {...mockProps} />);
    
    expect(screen.getByText('FirstName')).toBeInTheDocument();
    expect(screen.getByText('⋮⋮')).toBeInTheDocument();
  });

  test('displays sort icon and order', () => {
    render(<DraggableColumnHeader {...mockProps} />);
    
    expect(screen.getByText('↑')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('calls handleSort when header title is clicked', async () => {
    const user = userEvent;
    render(<DraggableColumnHeader {...mockProps} />);
    
    const headerTitle = screen.getByText('FirstName');
    await user.click(headerTitle);
    
    expect(mockProps.handleSort).toHaveBeenCalledWith('firstName');
  });

  test('has draggable attribute set to true', () => {
    render(<DraggableColumnHeader {...mockProps} />);
    
    const header = screen.getByRole('columnheader');
    expect(header).toHaveAttribute('draggable', 'true');
  });

  describe('Drag and Drop Events', () => {
    test('sets dragging state on drag start', () => {
      render(<DraggableColumnHeader {...mockProps} />);
      
      const header = screen.getByRole('columnheader');
      
      // Create a mock dataTransfer object
      const mockDataTransfer = {
        setData: jest.fn(),
        effectAllowed: ''
      };
      
      const dragStartEvent = new Event('dragstart', { bubbles: true });
      Object.defineProperty(dragStartEvent, 'dataTransfer', {
        value: mockDataTransfer
      });
      
      fireEvent(header, dragStartEvent);
      
      expect(mockDataTransfer.setData).toHaveBeenCalledWith(
        'text/plain',
        JSON.stringify({ dragIndex: 0, dragColumn: 'firstName' })
      );
      expect(mockDataTransfer.effectAllowed).toBe('move');
    });

    test('removes dragging state on drag end', () => {
      render(<DraggableColumnHeader {...mockProps} />);
      
      const header = screen.getByRole('columnheader');
      
      // Start drag
      const dragStartEvent = new Event('dragstart', { bubbles: true });
      Object.defineProperty(dragStartEvent, 'dataTransfer', {
        value: { setData: jest.fn(), effectAllowed: '' }
      });
      fireEvent(header, dragStartEvent);
      
      // End drag
      fireEvent.dragEnd(header);
      
      expect(header).not.toHaveClass('dragging');
    });

    test('prevents default on drag over and sets drop effect', () => {
      render(<DraggableColumnHeader {...mockProps} />);
      
      const header = screen.getByRole('columnheader');
      
      const mockDataTransfer = {
        dropEffect: ''
      };
      
      const dragOverEvent = new Event('dragover', { bubbles: true });
      Object.defineProperty(dragOverEvent, 'dataTransfer', {
        value: mockDataTransfer
      });
      
      const preventDefaultSpy = jest.spyOn(dragOverEvent, 'preventDefault');
      
      fireEvent(header, dragOverEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(mockDataTransfer.dropEffect).toBe('move');
    });

    test('calls moveColumn on successful drop', () => {
      render(<DraggableColumnHeader {...mockProps} />);
      
      const header = screen.getByRole('columnheader');
      
      const mockDataTransfer = {
        getData: jest.fn(() => JSON.stringify({ dragIndex: 1, dragColumn: 'lastName' }))
      };
      
      const dropEvent = new Event('drop', { bubbles: true });
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: mockDataTransfer
      });
      
      const preventDefaultSpy = jest.spyOn(dropEvent, 'preventDefault');
      
      fireEvent(header, dropEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
      expect(mockDataTransfer.getData).toHaveBeenCalledWith('text/plain');
      expect(mockProps.moveColumn).toHaveBeenCalledWith(1, 0);
    });

    test('does not call moveColumn when dropping on same column', () => {
      render(<DraggableColumnHeader {...mockProps} />);
      
      const header = screen.getByRole('columnheader');
      
      const mockDataTransfer = {
        getData: jest.fn(() => JSON.stringify({ dragIndex: 0, dragColumn: 'firstName' }))
      };
      
      const dropEvent = new Event('drop', { bubbles: true });
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: mockDataTransfer
      });
      
      fireEvent(header, dropEvent);
      
      expect(mockProps.moveColumn).not.toHaveBeenCalled();
    });

    test('handles invalid drag data gracefully', () => {
      render(<DraggableColumnHeader {...mockProps} />);
      
      const header = screen.getByRole('columnheader');
      
      const mockDataTransfer = {
        getData: jest.fn(() => 'invalid json')
      };
      
      const dropEvent = new Event('drop', { bubbles: true });
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: mockDataTransfer
      });
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      fireEvent(header, dropEvent);
      
      expect(consoleSpy).toHaveBeenCalledWith('Error parsing drag data:', expect.any(Error));
      expect(mockProps.moveColumn).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });

  describe('CSS Classes', () => {
    test('applies dragging class during drag operation', () => {
      render(<DraggableColumnHeader {...mockProps} />);
      
      const header = screen.getByRole('columnheader');
      
      const dragStartEvent = new Event('dragstart', { bubbles: true });
      Object.defineProperty(dragStartEvent, 'dataTransfer', {
        value: { setData: jest.fn(), effectAllowed: '' }
      });
      
      fireEvent(header, dragStartEvent);
      
      expect(header).toHaveClass('dragging');
    });

    test('applies drag-over class during drag over', () => {
      render(<DraggableColumnHeader {...mockProps} />);
      
      const header = screen.getByRole('columnheader');
      
      const dragOverEvent = new Event('dragover', { bubbles: true });
      Object.defineProperty(dragOverEvent, 'dataTransfer', {
        value: { dropEffect: '' }
      });
      
      fireEvent(header, dragOverEvent);
      
      expect(header).toHaveClass('drag-over');
    });

    test('removes drag-over class on drag leave', () => {
      render(<DraggableColumnHeader {...mockProps} />);
      
      const header = screen.getByRole('columnheader');
      
      // First trigger drag over
      const dragOverEvent = new Event('dragover', { bubbles: true });
      Object.defineProperty(dragOverEvent, 'dataTransfer', {
        value: { dropEffect: '' }
      });
      fireEvent(header, dragOverEvent);
      
      // Then trigger drag leave
      fireEvent.dragLeave(header);
      
      expect(header).not.toHaveClass('drag-over');
    });
  });

  describe('With Hidden Columns', () => {
    const hiddenColumnProps = {
      ...mockProps,
      index: 2, // Original index in full column array
      visibleIndex: 1, // Index in visible columns array
      allColumns: ['firstName', 'lastName', 'age', 'email'],
      visibleColumns: ['firstName', 'age', 'email'] // lastName is hidden
    };

    test('uses original index for drag operations with hidden columns', () => {
      render(<DraggableColumnHeader {...hiddenColumnProps} />);
      
      const header = screen.getByRole('columnheader');
      
      const mockDataTransfer = {
        setData: jest.fn(),
        effectAllowed: ''
      };
      
      const dragStartEvent = new Event('dragstart', { bubbles: true });
      Object.defineProperty(dragStartEvent, 'dataTransfer', {
        value: mockDataTransfer
      });
      
      fireEvent(header, dragStartEvent);
      
      expect(mockDataTransfer.setData).toHaveBeenCalledWith(
        'text/plain',
        JSON.stringify({ dragIndex: 2, dragColumn: 'firstName' })
      );
    });

    test('correctly handles drop with original indices', () => {
      render(<DraggableColumnHeader {...hiddenColumnProps} />);
      
      const header = screen.getByRole('columnheader');
      
      const mockDataTransfer = {
        getData: jest.fn(() => JSON.stringify({ dragIndex: 0, dragColumn: 'firstName' }))
      };
      
      const dropEvent = new Event('drop', { bubbles: true });
      Object.defineProperty(dropEvent, 'dataTransfer', {
        value: mockDataTransfer
      });
      
      fireEvent(header, dropEvent);
      
      expect(mockProps.moveColumn).toHaveBeenCalledWith(0, 2);
    });
  });
});
