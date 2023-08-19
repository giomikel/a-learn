import React from 'react';
import '../../css/Dropdown.css';

function Dropdown({ options, selectedOption, onSelect }) {
  return (
    <div className="select-container">
      <select className="select" value={selectedOption} onChange={(e) => onSelect(e.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="select-arrow">&#9660;</div>
    </div>
  );
}

export default Dropdown;
