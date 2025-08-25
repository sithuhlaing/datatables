# React DataTable

> A modern, feature-rich data table component for React applications

[![npm version](https://img.shields.io/npm/v/react-datatable.svg)](https://www.npmjs.com/package/react-datatable)
[![Build Status](https://img.shields.io/github/workflow/status/username/datatables/CI)](https://github.com/username/datatables/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A powerful and flexible data table component built with React, featuring advanced sorting, filtering, column management, and drag-and-drop functionality.

## Features

- 🔍 **Global and column-specific search/filtering**
- 🔄 **Multi-column sorting with visual indicators**
- 👁️ **Column visibility management with modern dropdown**
- 🎯 **Drag and drop column reordering**
- 📄 **Built-in pagination**
- 🎨 **Modern, responsive design**
- ♿ **Accessibility-first approach**
- 🧪 **Comprehensive test coverage**
- 📱 **Mobile-friendly interface**

## Installation

```bash
npm install react-datatable
```

## Quick Start

```jsx
import React from 'react';
import { DataTable } from 'react-datatable';

const data = [
  { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  // ... more data
];

function App() {
  return (
    <DataTable 
      data={data} 
      itemsPerPage={10} 
    />
  );
}
```

## API Reference

### DataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array<Object>` | `[]` | Array of data objects to display |
| `itemsPerPage` | `number` | `10` | Number of items per page |

### Column Configuration

Columns are automatically detected from your data structure. Each object key becomes a column.

```jsx
const data = [
  {
    firstName: 'John',    // Column: "First Name"
    lastName: 'Doe',      // Column: "Last Name"
    age: 30,              // Column: "Age"
    isActive: true        // Column: "Is Active"
  }
];
```

## Advanced Usage

### Custom Styling

The component uses CSS classes that can be customized:

```css
.data-table-container {
  /* Main container styles */
}

.column-visibility-btn {
  /* Column visibility button styles */
}

.draggable-header {
  /* Draggable column header styles */
}
```

### Programmatic Control

```jsx
import { DataTable, useDataTable } from 'react-datatable';

function AdvancedExample() {
  const {
    filteredData,
    sortConfig,
    hiddenColumns,
    // ... other state
  } = useDataTable(data);

  return (
    <DataTable 
      data={data}
      // Additional props for advanced control
    />
  );
}
```

## Development

### Prerequisites

- Node.js 14+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/username/datatables.git
cd datatables

# Install dependencies
npm install

# Start development server
npm start
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test DataTable.test.js
```

### Building

```bash
# Build for production
npm run build

# Analyze bundle size
npm run analyze
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Architecture

The component follows SOLID principles with a modular architecture:

- **Hooks**: Separate concerns (sorting, filtering, pagination)
- **Components**: Small, focused, reusable components
- **Utils**: Pure functions for data processing
- **Tests**: Comprehensive test coverage

## License

MIT © [Your Name](https://github.com/username)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for details.

---

**Made with ❤️ by [Your Name](https://github.com/username)**
