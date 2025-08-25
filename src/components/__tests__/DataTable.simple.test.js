import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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
  }
];

describe('DataTable Component - Basic Tests', () => {
  test('renders DataTable with data', () => {
    render(<DataTable data={mockData} />);
    
    expect(screen.getByText('Data Table')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  test('renders empty state when no data provided', () => {
    render(<DataTable data={[]} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('displays correct number of results', () => {
    render(<DataTable data={mockData} />);
    
    expect(screen.getByText(/Showing 2 of 2 results/)).toBeInTheDocument();
  });

  test('renders column visibility button', () => {
    render(<DataTable data={mockData} />);
    
    expect(screen.getByRole('button', { name: /columns/i })).toBeInTheDocument();
  });

  test('opens column visibility dropdown when button is clicked', () => {
    render(<DataTable data={mockData} />);
    
    const columnButton = screen.getByRole('button', { name: /columns/i });
    fireEvent.click(columnButton);
    
    expect(screen.getByText('Show/Hide Columns')).toBeInTheDocument();
    expect(screen.getByText('Show All')).toBeInTheDocument();
    expect(screen.getByText('Hide All')).toBeInTheDocument();
  });

  test('filters data based on search term', () => {
    render(<DataTable data={mockData} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  test('sorts data when column header is clicked', () => {
    render(<DataTable data={mockData} />);
    
    const ageHeader = screen.getByText('Age');
    fireEvent.click(ageHeader);
    
    const rows = screen.getAllByRole('row');
    // First row should be header, second should be Jane (age 25)
    expect(rows[1]).toHaveTextContent('Jane');
  });

  test('has proper ARIA attributes for dropdown', () => {
    render(<DataTable data={mockData} />);
    
    const columnButton = screen.getByRole('button', { name: /columns/i });
    expect(columnButton).toHaveAttribute('aria-expanded', 'false');
    expect(columnButton).toHaveAttribute('aria-haspopup', 'true');
    
    fireEvent.click(columnButton);
    
    expect(columnButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('table has proper semantic structure', () => {
    render(<DataTable data={mockData} />);
    
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(8); // All columns
    expect(screen.getAllByRole('row')).toHaveLength(3); // Header + 2 data rows
  });

  test('handles null data gracefully', () => {
    render(<DataTable data={null} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('handles undefined data gracefully', () => {
    render(<DataTable data={undefined} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});
