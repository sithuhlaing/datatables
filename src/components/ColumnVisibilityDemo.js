
import React from 'react';
import DataTable from './DataTable';

const ColumnVisibilityDemo = () => {
  const sampleData = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: 30,
      department: 'Engineering',
      salary: 75000,
      startDate: '2023-01-15',
      isActive: true,
      phone: '+1-555-0123'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      age: 28,
      department: 'Marketing',
      salary: 68000,
      startDate: '2022-06-20',
      isActive: true,
      phone: '+1-555-0124'
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      age: 35,
      department: 'Sales',
      salary: 72000,
      startDate: '2021-03-10',
      isActive: false,
      phone: '+1-555-0125'
    },
    {
      id: 4,
      firstName: 'Alice',
      lastName: 'Brown',
      email: 'alice.brown@example.com',
      age: 32,
      department: 'Engineering',
      salary: 85000,
      startDate: '2020-11-05',
      isActive: true,
      phone: '+1-555-0126'
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Wilson',
      email: 'charlie.wilson@example.com',
      age: 29,
      department: 'HR',
      salary: 62000,
      startDate: '2023-08-01',
      isActive: true,
      phone: '+1-555-0127'
    },
    {
      id: 6,
      firstName: 'Diana',
      lastName: 'Miller',
      email: 'diana.miller@example.com',
      age: 27,
      department: 'Design',
      salary: 70000,
      startDate: '2023-02-14',
      isActive: true,
      phone: '+1-555-0128'
    },
    {
      id: 7,
      firstName: 'Edward',
      lastName: 'Davis',
      email: 'edward.davis@example.com',
      age: 33,
      department: 'Engineering',
      salary: 82000,
      startDate: '2022-09-12',
      isActive: true,
      phone: '+1-555-0129'
    },
    {
      id: 8,
      firstName: 'Fiona',
      lastName: 'Garcia',
      email: 'fiona.garcia@example.com',
      age: 26,
      department: 'Marketing',
      salary: 65000,
      startDate: '2023-05-20',
      isActive: false,
      phone: '+1-555-0130'
    }
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          textAlign: 'center',
          color: '#495057',
          marginBottom: '10px',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          Modern Data Table
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#6c757d',
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}>
          Clean, responsive data table with column visibility controls
        </p>

        <div style={{
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            color: '#495057',
            fontSize: '1.2rem',
            fontWeight: '600'
          }}>
            ✨ Features
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '15px',
            fontSize: '14px',
            color: '#6c757d'
          }}>
            <div>
              <strong style={{ color: '#495057' }}>👁 Column Visibility:</strong> Click the "Columns" button to show/hide columns with checkboxes
            </div>
            <div>
              <strong style={{ color: '#495057' }}>🔄 Drag & Drop:</strong> Drag column headers to reorder them
            </div>
            <div>
              <strong style={{ color: '#495057' }}>🔍 Search & Filter:</strong> Global search and individual column filters
            </div>
            <div>
              <strong style={{ color: '#495057' }}>📊 Multi-Sort:</strong> Click column headers to sort by multiple columns
            </div>
          </div>
        </div>

        <DataTable data={sampleData} itemsPerPage={5} />
      </div>
    </div>
  );
};

export default ColumnVisibilityDemo;
