
import React from 'react';
import DraggableColumnHeader from './DraggableColumnHeader';

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
          <DraggableColumnHeader
            key={column}
            column={column}
            index={index}
            getSortInfo={getSortInfo}
            handleSort={handleSort}
            columnFilters={columnFilters}
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
