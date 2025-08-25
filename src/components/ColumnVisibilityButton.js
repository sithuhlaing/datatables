
import React, { useState, useRef, useEffect } from 'react';
import ColumnVisibilityDropdown from './ColumnVisibilityDropdown';
import { useClickOutside } from '../hooks/useClickOutside';

const ColumnVisibilityButton = ({
  columns,
  hiddenColumns,
  toggleColumnVisibility,
  showAllColumns,
  hideAllColumns
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useClickOutside([buttonRef, dropdownRef], () => setIsOpen(false));

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.bottom + 8
      });
      setIsOpen(!isOpen);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const visibleCount = columns.length - hiddenColumns.size;

  return (
    <div className="column-visibility-dropdown">
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        className="column-visibility-btn"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Show/Hide Columns"
      >
        <span className="btn-icon">👁️</span>
        <span className="btn-text">
          Columns ({visibleCount}/{columns.length})
        </span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <ColumnVisibilityDropdown
          ref={dropdownRef}
          position={position}
          columns={columns}
          hiddenColumns={hiddenColumns}
          toggleColumnVisibility={toggleColumnVisibility}
          showAllColumns={showAllColumns}
          hideAllColumns={hideAllColumns}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ColumnVisibilityButton;
