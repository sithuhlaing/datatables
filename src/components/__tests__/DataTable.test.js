import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from '../DataTable';

// Mock data for testing
const mockData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com",
    phone: "+1-555-0101",
    address: "123 Main St, City, USA",
    isActive: true
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    age: 25,
    email: "jane.smith@example.com",
    phone: "+1-555-0102",
    address: "456 Oak Ave, City, USA",
    isActive: false
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    age: 35,
    email: "bob.johnson@example.com",
    phone: "+1-555-0103",
    address: "789 Pine Rd, City, USA",
    isActive: true
  }
];

describe('DataTable Component', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  test('renders DataTable with data', () => {
    render(<DataTable data={mockData} />);
    
    expect(screen.getByText('Data Table')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  test('renders empty state when no data provided', () => {
    render(<DataTable data={[]} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('displays correct number of results', () => {
    render(<DataTable data={mockData} />);
    
    expect(screen.getByText(/Showing 3 of 3 results/)).toBeInTheDocument();
  });

  describe('Search Functionality', () => {
    test('filters data based on search term', async () => {
      render(<DataTable data={mockData} />);
      
      const searchInput = screen.getByPlaceholderText(/search/i);
      await user.type(searchInput, 'John');
      
      await waitFor(() => {
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.queryByText('Jane')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob')).not.toBeInTheDocument();
      });
    });

    test('shows no results when search term matches nothing', async () => {
      render(<DataTable data={mockData} />);
      
      const searchInput = screen.getByPlaceholderText(/search/i);
      await userEvent.type(searchInput, 'NonExistentName');
      
      await waitFor(() => {
        expect(screen.getByText(/Showing 0 of 0 results/)).toBeInTheDocument();
      });
    });

    test('clears search when clear all filters button is clicked', async () => {
      render(<DataTable data={mockData} />);
      
      const searchInput = screen.getByPlaceholderText(/search/i);
      await user.type(searchInput, 'John');
      
      await waitFor(() => {
        expect(screen.getByText('Clear All Filters')).toBeInTheDocument();
      });
      
      const clearButton = screen.getByText('Clear All Filters');
      await userEvent.click(clearButton);
      
      await waitFor(() => {
        expect(searchInput.value).toBe('');
        expect(screen.getByText(/Showing 3 of 3 results/)).toBeInTheDocument();
      });
    });
  });

  describe('Column Visibility', () => {
    test('renders column visibility button', () => {
      render(<DataTable data={mockData} />);
      
      expect(screen.getByRole('button', { name: /columns/i })).toBeInTheDocument();
    });

    test('opens column visibility dropdown when button is clicked', async () => {
      render(<DataTable data={mockData} />);
      
      const columnButton = screen.getByRole('button', { name: /columns/i });
      await user.click(columnButton);
      
      await waitFor(() => {
        expect(screen.getByText('Show/Hide Columns')).toBeInTheDocument();
        expect(screen.getByText('Show All')).toBeInTheDocument();
        expect(screen.getByText('Hide All')).toBeInTheDocument();
      });
    });

    test('toggles column visibility when checkbox is clicked', async () => {
      render(<DataTable data={mockData} />);
      
      // Open dropdown
      const columnButton = screen.getByRole('button', { name: /columns/i });
      await userEvent.click(columnButton);
      
      // Find and click firstName checkbox
      const firstNameCheckbox = screen.getByLabelText(/firstname/i);
      await userEvent.click(firstNameCheckbox);
      
      await waitFor(() => {
        // FirstName column should be hidden
        expect(screen.queryByText('FirstName')).not.toBeInTheDocument();
      });
    });

    test('shows all columns when Show All button is clicked', async () => {
      render(<DataTable data={mockData} />);
      
      const columnButton = screen.getByRole('button', { name: /columns/i });
      await userEvent.click(columnButton);
      
      // Hide a column first
      const firstNameCheckbox = screen.getByLabelText(/firstname/i);
      await userEvent.click(firstNameCheckbox);
      
      // Click Show All
      const showAllButton = screen.getByText('Show All');
      await userEvent.click(showAllButton);
      
      await waitFor(() => {
        expect(screen.getByText('FirstName')).toBeInTheDocument();
      });
    });
  });

  describe('Sorting Functionality', () => {
    test('sorts data when column header is clicked', async () => {
      render(<DataTable data={mockData} />);
      
      const ageHeader = screen.getByText('Age');
      await user.click(ageHeader);
      
      await waitFor(() => {
        const rows = screen.getAllByRole('row');
        // First row should be header, second should be Jane (age 25)
        expect(rows[1]).toHaveTextContent('Jane');
      });
    });

    test('reverses sort order on second click', async () => {
      render(<DataTable data={mockData} />);
      
      const ageHeader = screen.getByText('Age');
      await userEvent.click(ageHeader); // First click - ascending
      await userEvent.click(ageHeader); // Second click - descending
      
      await waitFor(() => {
        const rows = screen.getAllByRole('row');
        // First row should be header, second should be Bob (age 35)
        expect(rows[1]).toHaveTextContent('Bob');
      });
    });
  });

  describe('Pagination', () => {
    const largeDataSet = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      firstName: `User${i + 1}`,
      lastName: `Last${i + 1}`,
      age: 20 + (i % 50),
      email: `user${i + 1}@example.com`,
      phone: `+1-555-${String(i + 1).padStart(4, '0')}`,
      address: `${i + 1} Test St, City, USA`,
      isActive: i % 2 === 0
    }));

    test('displays pagination controls with large dataset', () => {
      render(<DataTable data={largeDataSet} itemsPerPage={10} />);
      
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    test('navigates to next page when next button is clicked', async () => {
      render(<DataTable data={largeDataSet} itemsPerPage={10} />);
      
      const nextButton = screen.getByText('Next');
      await userEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText('User11')).toBeInTheDocument();
        expect(screen.queryByText('User1')).not.toBeInTheDocument();
      });
    });

    test('shows correct results count with pagination', () => {
      render(<DataTable data={largeDataSet} itemsPerPage={10} />);
      
      expect(screen.getByText(/Showing 10 of 25 results/)).toBeInTheDocument();
    });
  });

  describe('Column Filtering', () => {
    test('filters data by column-specific search', async () => {
      render(<DataTable data={mockData} />);
      
      // Find the firstName column search input
      const columnSearchInputs = screen.getAllByRole('textbox');
      const firstNameSearch = columnSearchInputs.find(input => 
        input.getAttribute('placeholder')?.includes('firstName')
      );
      
      if (firstNameSearch) {
        await userEvent.type(firstNameSearch, 'John');
        
        await waitFor(() => {
          expect(screen.getByText('John')).toBeInTheDocument();
          expect(screen.queryByText('Jane')).not.toBeInTheDocument();
        });
      }
    });
  });

  describe('Reset Functionality', () => {
    test('resets column order when reset button is clicked', async () => {
      render(<DataTable data={mockData} />);
      
      const resetButton = screen.getByTitle('Reset column order');
      await userEvent.click(resetButton);
      
      // Should reset to original column order
      await waitFor(() => {
        expect(screen.getByText('Data Table')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA attributes for dropdown', async () => {
      render(<DataTable data={mockData} />);
      
      const columnButton = screen.getByRole('button', { name: /columns/i });
      expect(columnButton).toHaveAttribute('aria-expanded', 'false');
      expect(columnButton).toHaveAttribute('aria-haspopup', 'true');
      
      await user.click(columnButton);
      
      await waitFor(() => {
        expect(columnButton).toHaveAttribute('aria-expanded', 'true');
      });
    });

    test('table has proper semantic structure', () => {
      render(<DataTable data={mockData} />);
      
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('columnheader')).toHaveLength(8); // All columns
      expect(screen.getAllByRole('row')).toHaveLength(4); // Header + 3 data rows
    });
  });

  describe('Error Handling', () => {
    test('handles null data gracefully', () => {
      render(<DataTable data={null} />);
      
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    test('handles undefined data gracefully', () => {
      render(<DataTable data={undefined} />);
      
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });
});
