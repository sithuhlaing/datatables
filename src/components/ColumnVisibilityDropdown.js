
import React, { useState, useRef, useEffect } from 'react';

const ColumnVisibilityDropdown = ({
  columns,
  hiddenColumns,
  toggleColumnVisibility,
  showAllColumns,
  hideAllColumns
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const visibleCount = columns.length - hiddenColumns.size;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const canHideMore = visibleCount > 1;

  return (
    <div className="column-visibility-dropdown" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="column-visibility-btn"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="btn-icon">👁</span>
        <span className="btn-text">Columns ({visibleCount}/{columns.length})</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <h4>Show/Hide Columns</h4>
          </div>

          <div className="dropdown-actions">
            <button
              onClick={() => {
                showAllColumns();
                setIsOpen(false);
              }}
              className="dropdown-action-btn"
              disabled={hiddenColumns.size === 0}
            >
              Show All
            </button>
            <button
              onClick={() => {
                hideAllColumns();
                setIsOpen(false);
              }}
              className="dropdown-action-btn"
              disabled={!canHideMore}
            >
              Hide All
            </button>
          </div>

          <div className="dropdown-divider"></div>

          <div className="dropdown-items">
            {columns.map(column => {
              const isVisible = !hiddenColumns.has(column);
              const canToggle = isVisible ? canHideMore : true;

              return (
                <label
                  key={column}
                  className={`dropdown-item ${!canToggle ? 'disabled' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => canToggle && toggleColumnVisibility(column)}
                    disabled={!canToggle}
                    className="column-checkbox"
                  />
                  <span className="column-label">
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnVisibilityDropdown;
