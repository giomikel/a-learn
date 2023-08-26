import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import '../../css/TMTransitionInput.css';

function TransitionInput({
  states,
  source,
  destination,
  writeSymbol,
  readSymbol,
  move,
  onChange,
  templateEditable
}) {
  const [selectedSource, setSelectedSource] = useState(source);
  const [selectedDestination, setSelectedDestination] = useState(destination);
  const [selectedMove, setSelectedMove] = useState(move);

  useEffect(() => {
    setSelectedSource(source);
    setSelectedDestination(destination);
    setSelectedMove(move);
  }, [source, destination, move]);

  const handleInputChange = (e, field) => {
    if (!templateEditable) {
      return;
    }

    if (field === 'source') {
      setSelectedSource(e.target.value);
    } else if (field === 'destination') {
      setSelectedDestination(e.target.value);
    }else if (field === 'move') {
      setSelectedMove(e.target.value);
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
          value={writeSymbol}
          onChange={(e) => handleInputChange(e, 'writeSymbol')}
          className="small-input"
          maxLength={1}
          disabled={!templateEditable}
        />
        <input
          type="text"
          value={readSymbol}
          onChange={(e) => handleInputChange(e, 'readSymbol')}
          className="small-input"
          maxLength={1}
          disabled={!templateEditable}
        />
        <Dropdown
          options={["R", "L"]}
          selectedOption={selectedMove}
          onSelect={(value) =>
            handleInputChange({ target: { value } }, 'move')
          }
          className="transition-dropdown"
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
