
import React from 'react';

const DropdownHeader = ({ title, subtitle }) => (
  <div className="dropdown-header">
    <h4>{title}</h4>
    {subtitle && <p className="dropdown-subtitle">{subtitle}</p>}
  </div>
);

export default DropdownHeader;
