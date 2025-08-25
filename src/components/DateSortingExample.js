import React from 'react';
import DataTable from './DataTable';

const DateSortingExample = () => {
  const sampleData = [
    {
      id: 1,
      name: 'John Doe',
      birthDate: new Date('1990-05-15'),
      joinDate: '2023-01-15',
      salary: 75000,
      active: true
    },
    {
      id: 2,
      name: 'Jane Smith',
      birthDate: new Date('1985-12-03'),
      joinDate: '2022-06-20',
      salary: 82000,
      active: false
    },
    {
      id: 3,
      name: 'Bob Johnson',
      birthDate: new Date('1992-08-22'),
      joinDate: '2023-03-10',
      salary: 68000,
      active: true
    },
    {
      id: 4,
      name: 'Alice Brown',
      birthDate: new Date('1988-02-14'),
      joinDate: '2021-11-05',
      salary: 95000,
      active: true
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      birthDate: new Date('1995-07-30'),
      joinDate: '2023-08-01',
      salary: 72000,
      active: false
    }
  ];

  return (
    <div>
      <h1>Date Sorting Example</h1>
      <p>This table demonstrates proper sorting of Date objects and date strings:</p>
      <ul>
        <li><strong>birthDate</strong>: Date objects</li>
        <li><strong>joinDate</strong>: Date strings (YYYY-MM-DD format)</li>
        <li><strong>salary</strong>: Numbers</li>
        <li><strong>active</strong>: Booleans</li>
      </ul>
      <DataTable data={sampleData} itemsPerPage={5} />
    </div>
  );
};

export default DateSortingExample;