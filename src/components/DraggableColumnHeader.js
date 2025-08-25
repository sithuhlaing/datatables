
import React, { useState } from 'react';
import ColumnSearchInput from './ColumnSearchInput';

const DraggableColumnHeader = ({
  column,
  index,
  getSortInfo,
  handleSort,
  columnFilters,
  updateColumnFilter,
  clearColumnFilter,
  moveColumn
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { icon, order } = getSortInfo(column);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);

    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const hoverIndex = index;

    if (dragIndex !== hoverIndex) {
      moveColumn(dragIndex, hoverIndex);
    }
  };

  return (
    <th
      className={`sortable-header draggable-header ${isDragging ? 'dragging' : ''} ${dragOver ? 'drag-over' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="header-content">
        <div className="header-title-container">
          <div className="drag-handle">⋮⋮</div>
          <div
            className="header-title"
            onClick={() => handleSort(column)}
          >
            {column.charAt(0).toUpperCase() + column.slice(1)}
            <span className="sort-icon">{icon}</span>
            {order && <span className="sort-order">{order}</span>}
          </div>
        </div>
        <ColumnSearchInput
          column={column}
          value={columnFilters[column]}
          onChange={updateColumnFilter}
          onClear={clearColumnFilter}
        />
      </div>
    </th>
  );
};

export default DraggableColumnHeader;
