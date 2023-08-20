import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import '../../css/CFGProductionInput.css';

function ProductionInput({
    alphabet,
    variable,
    expression,
    onChange,
    templateEditable
  }) {
    const [selectedVariable, setSelectedVariable] = useState(variable);
  
    useEffect(() => {
      setSelectedVariable(variable);
    }, [variable]);
  
    const handleInputChange = (e, field) => {
      if (!templateEditable) {
        return;
      }
  
      if (field === 'variable') {
        setSelectedVariable(e.target.value);
      }
  
      onChange(field, e.target.value);
    };
  
    return (
      <div className="production-input-container">
        <div className="production-input-row">
          <Dropdown
            options={alphabet}
            selectedOption={selectedVariable}
            onSelect={(value) => handleInputChange({ target: { value } }, 'variable')}
            className="production-dropdown"
            disabled={!templateEditable}
          />
          <input
            type="text"
            value={expression}
            onChange={(e) => handleInputChange(e, 'expression')}
            className="expression-input"
            maxLength={10}
            disabled={!templateEditable}
          />
        </div>
      </div>
    );
}

export default ProductionInput;
