import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ColumnVisibilityDropdown from '../ColumnVisibilityDropdown';

const mockProps = {
  columns: ['firstName', 'lastName', 'age', 'email', 'phone'],
  hiddenColumns: new Set(['phone']),
  toggleColumnVisibility: jest.fn(),
  showAllColumns: jest.fn(),
  hideAllColumns: jest.fn()
};

describe('ColumnVisibilityDropdown Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders column visibility button with correct count', () => {
    render(<ColumnVisibilityDropdown {...mockProps} />);
    
    expect(screen.getByText('👁')).toBeInTheDocument();
    expect(screen.getByText('Columns (4/5)')).toBeInTheDocument();
    expect(screen.getByText('▼')).toBeInTheDocument();
  });

  test('opens dropdown when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ColumnVisibilityDropdown {...mockProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Show/Hide Columns')).toBeInTheDocument();
      expect(screen.getByText('Show All')).toBeInTheDocument();
      expect(screen.getByText('Hide All')).toBeInTheDocument();
    });
  });

  test('closes dropdown when clicked outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <ColumnVisibilityDropdown {...mockProps} />
        <div data-testid="outside">Outside element</div>
      </div>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Show/Hide Columns')).toBeInTheDocument();
    });
    
    const outsideElement = screen.getByTestId('outside');
    await user.click(outsideElement);
    
    await waitFor(() => {
      expect(screen.queryByText('Show/Hide Columns')).not.toBeInTheDocument();
    });
  });

  test('closes dropdown when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(<ColumnVisibilityDropdown {...mockProps} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('Show/Hide Columns')).toBeInTheDocument();
    });
    
    await user.keyboard('{Escape}');
    
    await waitFor(() => {
      expect(screen.queryByText('Show/Hide Columns')).not.toBeInTheDocument();
    });
  });

  test('rotates arrow icon when dropdown is open', async () => {
    const user = userEvent.setup();
    render(<ColumnVisibilityDropdown {...mockProps} />);
    
    const button = screen.getByRole('button');
    const arrow = screen.getByText('▼');
    
    expect(arrow).not.toHaveClass('open');
    
    await user.click(button);
    
    await waitFor(() => {
      expect(arrow).toHaveClass('open');
    });
  });

  describe('Column Checkboxes', () => {
    test('displays all columns with correct checked state', async () => {
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...mockProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByLabelText(/firstname/i)).toBeChecked();
        expect(screen.getByLabelText(/lastname/i)).toBeChecked();
        expect(screen.getByLabelText(/age/i)).toBeChecked();
        expect(screen.getByLabelText(/email/i)).toBeChecked();
        expect(screen.getByLabelText(/phone/i)).not.toBeChecked();
      });
    });

    test('calls toggleColumnVisibility when checkbox is clicked', async () => {
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...mockProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      const firstNameCheckbox = screen.getByLabelText(/firstname/i);
      await user.click(firstNameCheckbox);
      
      expect(mockProps.toggleColumnVisibility).toHaveBeenCalledWith('firstName');
    });

    test('prevents hiding last visible column', async () => {
      const singleColumnProps = {
        ...mockProps,
        hiddenColumns: new Set(['lastName', 'age', 'email', 'phone'])
      };
      
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...singleColumnProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      const firstNameCheckbox = screen.getByLabelText(/firstname/i);
      expect(firstNameCheckbox).toBeDisabled();
      
      await user.click(firstNameCheckbox);
      expect(mockProps.toggleColumnVisibility).not.toHaveBeenCalled();
    });

    test('allows showing hidden columns', async () => {
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...mockProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      const phoneCheckbox = screen.getByLabelText(/phone/i);
      expect(phoneCheckbox).not.toBeDisabled();
      
      await user.click(phoneCheckbox);
      expect(mockProps.toggleColumnVisibility).toHaveBeenCalledWith('phone');
    });
  });

  describe('Action Buttons', () => {
    test('Show All button is disabled when all columns are visible', async () => {
      const allVisibleProps = {
        ...mockProps,
        hiddenColumns: new Set()
      };
      
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...allVisibleProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      const showAllButton = screen.getByText('Show All');
      expect(showAllButton).toBeDisabled();
    });

    test('Show All button calls showAllColumns and closes dropdown', async () => {
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...mockProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      const showAllButton = screen.getByText('Show All');
      await user.click(showAllButton);
      
      expect(mockProps.showAllColumns).toHaveBeenCalled();
      
      await waitFor(() => {
        expect(screen.queryByText('Show/Hide Columns')).not.toBeInTheDocument();
      });
    });

    test('Hide All button is disabled when only one column is visible', async () => {
      const singleColumnProps = {
        ...mockProps,
        hiddenColumns: new Set(['lastName', 'age', 'email', 'phone'])
      };
      
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...singleColumnProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      const hideAllButton = screen.getByText('Hide All');
      expect(hideAllButton).toBeDisabled();
    });

    test('Hide All button calls hideAllColumns and closes dropdown', async () => {
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...mockProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      const hideAllButton = screen.getByText('Hide All');
      await user.click(hideAllButton);
      
      expect(mockProps.hideAllColumns).toHaveBeenCalled();
      
      await waitFor(() => {
        expect(screen.queryByText('Show/Hide Columns')).not.toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('button has correct ARIA attributes', () => {
      render(<ColumnVisibilityDropdown {...mockProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
    });

    test('button ARIA expanded changes when dropdown opens', async () => {
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...mockProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(button).toHaveAttribute('aria-expanded', 'true');
      });
    });

    test('checkboxes have proper labels', async () => {
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...mockProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        expect(screen.getByLabelText('FirstName')).toBeInTheDocument();
        expect(screen.getByLabelText('LastName')).toBeInTheDocument();
        expect(screen.getByLabelText('Age')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone')).toBeInTheDocument();
      });
    });
  });

  describe('Visual States', () => {
    test('disabled items have correct styling classes', async () => {
      const singleColumnProps = {
        ...mockProps,
        hiddenColumns: new Set(['lastName', 'age', 'email', 'phone'])
      };
      
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...singleColumnProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        const firstNameLabel = screen.getByLabelText(/firstname/i).closest('label');
        expect(firstNameLabel).toHaveClass('disabled');
      });
    });

    test('dropdown has proper CSS classes', async () => {
      const user = userEvent.setup();
      render(<ColumnVisibilityDropdown {...mockProps} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      await waitFor(() => {
        const dropdown = screen.getByText('Show/Hide Columns').closest('.dropdown-menu');
        expect(dropdown).toBeInTheDocument();
        expect(dropdown).toHaveClass('dropdown-menu');
      });
    });
  });
});
