
import React, { useEffect, useRef } from 'react';

const ColumnContextMenu = ({
  isVisible = true,
  position,
  onClose,
  column,
  columns = [], // Add columns prop
  hiddenColumns,
  toggleColumnVisibility,
  showAllColumns,
  hideAllColumns
}) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const visibleCount = columns.length - hiddenColumns.size;
  const canHideMore = visibleCount > 1;

  return (
    <div
      ref={menuRef}
      className="column-context-menu"
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        zIndex: 1000
      }}
    >
      <div className="context-menu-header">
        <h4>Column Visibility</h4>
      </div>

      <div className="context-menu-actions">
        <button
          onClick={showAllColumns}
          className="context-menu-action"
          disabled={hiddenColumns.size === 0}
        >
          Show All Columns
        </button>
        <button
          onClick={hideAllColumns}
          className="context-menu-action"
          disabled={!canHideMore}
        >
          Hide All Columns
        </button>
      </div>

      <div className="context-menu-divider"></div>

      <div className="context-menu-columns">
        {columns.map(col => {
          const isVisible = !hiddenColumns.has(col);
          const canToggle = isVisible ? canHideMore : true;

          return (
            <label
              key={col}
              className={`context-menu-column ${!canToggle ? 'disabled' : ''}`}
            >
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => canToggle && toggleColumnVisibility(col)}
                disabled={!canToggle}
              />
              <span className="column-name">
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </span>
              <span className="column-status">
                {isVisible ? 'Visible' : 'Hidden'}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default ColumnContextMenu;
