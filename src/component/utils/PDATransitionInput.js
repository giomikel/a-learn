import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import '../../css/PDATransitionInput.css';

function TransitionInput({
  states,
  source,
  destination,
  inputSymbol,
  popSymbol,
  pushSymbol,
  onChange,
  templateEditable
}) {
  const [selectedSource, setSelectedSource] = useState(source);
  const [selectedDestination, setSelectedDestination] = useState(destination);

  useEffect(() => {
    setSelectedSource(source);
    setSelectedDestination(destination);
  }, [source, destination]);

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
          value={inputSymbol}
          onChange={(e) => handleInputChange(e, 'inputSymbol')}
          className="small-input"
          maxLength={1}
          disabled={!templateEditable}
        />
        <input
          type="text"
          value={popSymbol}
          onChange={(e) => handleInputChange(e, 'popSymbol')}
          className="small-input"
          maxLength={1}
          disabled={!templateEditable}
        />
        <input
          type="text"
          value={pushSymbol}
          onChange={(e) => handleInputChange(e, 'pushSymbol')}
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
