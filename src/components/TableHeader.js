
import React from 'react';
import DraggableHeaderCell from './DraggableHeaderCell';

const TableHeader = ({
  columns,
  getSortInfo,
  handleSort,
  columnFilters,
  updateColumnFilter,
  clearColumnFilter,
  moveColumn
}) => {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <DraggableHeaderCell
            key={column}
            column={column}
            index={index}
            getSortInfo={getSortInfo}
            handleSort={handleSort}
            columnFilter={columnFilters[column] || ''}
            updateColumnFilter={updateColumnFilter}
            clearColumnFilter={clearColumnFilter}
            moveColumn={moveColumn}
          />
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
