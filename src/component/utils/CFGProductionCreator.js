import React, { useState } from 'react';
import ProductionInput from './CFGProductionInput.js';
import { EPSILON_IN_CFG } from '../../core/constants.mjs';

function ProductionCreator({ alphabet, productions, setProductions }) {
  const [template, setTemplate] = useState({ variable: 'S', expression: EPSILON_IN_CFG});

  const addProduction = () => {
    const isDuplicate = productions.some(
      (transition) =>
        transition.variable === template.variable &&
        transition.expression === template.expression
    );

    if (!isDuplicate) {
      const newProduction = { ...template, editable: false };
      setProductions([...productions, newProduction]);
    } else {
      alert('This production already exists.');
    }
  };

  const removeProduction = (index) => {
    const updatedProoductions = [...productions];
    updatedProoductions.splice(index, 1);
    setProductions(updatedProoductions);
  };

  return (
    <div>
      <ProductionInput
        alphabet={alphabet}
        variable={template.variable}
        expression={template.expression}
        onChange={(field, value) => setTemplate({ ...template, [field]: value })}
        templateEditable
      />
      <button onClick={addProduction}>Add Production</button>

      <h3>Productions:</h3>

      {productions.map((production, index) => (
        <div key={index} className="production-container">
          <ProductionInput
            alphabet={alphabet}
            variable={production.variable}
            expression={production.expression}
            onChange={() => { }}
            disabled={!production.editable} 
          />
          <button onClick={() => removeProduction(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default ProductionCreator;
