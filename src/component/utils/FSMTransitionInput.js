import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import '../../css/FSMTransitionInput.css';

function TransitionInput({
  states,
  source,
  destination,
  symbol,
  onChange,
  defaultSource,
  defaultDestination,
  templateEditable
}) {
  const [selectedSource, setSelectedSource] = useState(source || defaultSource);
  const [selectedDestination, setSelectedDestination] = useState(
    destination || defaultDestination
  );

  useEffect(() => {
    setSelectedSource(source || defaultSource);
    setSelectedDestination(destination || defaultDestination);
  }, [source, destination, defaultSource, defaultDestination]);

  const handleInputChange = (e, field) => {
    if (!templateEditable) {
      return;
    }

    if (field === 'source') {
      setSelectedSource(e.target.value);
    } else if (field === 'destination') {
      setSelectedDestination(e.target.value);
    }
    onChange(field, e.target.value);
  };

  return (
    <div className="transition-input-container">
      <div className="transition-input-row">
        <Dropdown
          options={states}
          selectedOption={selectedSource}
          onSelect={(value) => handleInputChange({ target: { value } }, 'source')}
          className="transition-dropdown"
          disabled={!templateEditable}
        />
        <input
          type="text"
          value={symbol}
          onChange={(e) => handleInputChange(e, 'symbol')}
          className="small-input"
          maxLength={1}
          disabled={!templateEditable}
        />
        <Dropdown
          options={states}
          selectedOption={selectedDestination}
          onSelect={(value) =>
            handleInputChange({ target: { value } }, 'destination')
          }
          className="transition-dropdown"
          disabled={!templateEditable}
        />
      </div>
    </div>
  );
}

export default TransitionInput;
