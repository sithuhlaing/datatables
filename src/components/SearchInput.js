
import React from 'react';

const SearchInput = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="search-input-container">
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="search-input"
      aria-label="Search table data"
    />
  </div>
);

export default SearchInput;
