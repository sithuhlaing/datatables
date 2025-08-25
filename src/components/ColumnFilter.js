import React from 'react';

const ColumnFilter = ({
  column,
  value,
  onChange,
  onClear
}) => {
  const handleChange = (e) => {
    onChange(column, e.target.value);
  };

  const handleClear = () => {
    onClear(column);
  };

  return (
    <div className="column-filter">
      <input
        type="text"
        value={value || ''}
        onChange={handleChange}
        placeholder={`Filter ${column}...`}
        className="column-filter-input"
      />
      {value && (
        <button
          onClick={handleClear}
          className="column-filter-clear"
          title="Clear filter"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ColumnFilter;
