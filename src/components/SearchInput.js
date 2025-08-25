
import React from 'react';

const SearchInput = ({ searchTerm, setSearchTerm, placeholder = "Search..." }) => (
  <div className="search-input-container">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder={placeholder}
      className="search-input"
      aria-label="Search table data"
    />
  </div>
);

export default SearchInput;
