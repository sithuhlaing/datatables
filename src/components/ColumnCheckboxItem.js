
import React from 'react';

const ColumnCheckboxItem = ({ column, isVisible, isDisabled, onToggle }) => {
  const displayName = column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1');

  return (
    <button
      className={`dropdown-item ${isDisabled ? 'disabled' : ''}`}
      onClick={onToggle}
      disabled={isDisabled}
      role="menuitemcheckbox"
      aria-checked={isVisible}
      title={isDisabled ? "Cannot hide the last visible column" : `Toggle ${displayName} column`}
    >
      <input
        type="checkbox"
        checked={isVisible}
        onChange={() => {}} // Controlled by parent
        className="column-checkbox"
        tabIndex={-1}
        disabled={isDisabled}
      />
      <span className="column-label">{displayName}</span>
    </button>
  );
};

export default ColumnCheckboxItem;
