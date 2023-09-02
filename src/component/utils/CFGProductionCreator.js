import React, { useState } from 'react';
import ProductionInput from './CFGProductionInput.js';
import { EPSILON_IN_CFG } from '../../core/constants.mjs';

function ProductionCreator({ selectedStartSymbol, alphabet, productions, setProductions }) {
  const [template, setTemplate] = useState({ variable: 'S', expression: EPSILON_IN_CFG });

  const addProduction = () => {
    const isDuplicate = productions.some(
      (transition) =>
        transition.variable === template.variable &&
        transition.expression === template.expression
    );

    let isIsolatedVariable = selectedStartSymbol !== template.variable;
    for (let element of productions) {
      if (element.expression.includes(template.variable)) {
        isIsolatedVariable = false;
        break;
      }
    }

    if (!isDuplicate && !isIsolatedVariable && template.variable !== template.expression) {
      const newProduction = { ...template, editable: false };
      setProductions([...productions, newProduction]);
    } else if (!isDuplicate && !isIsolatedVariable) {
      alert('Variable and expression should not be the same.');
    } else if (!isDuplicate) {
      alert('This production has isolated variable.');
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
      <div className='template-production-container'>
        <ProductionInput
          alphabet={alphabet}
          variable={template.variable}
          expression={template.expression}
          onChange={(field, value) => setTemplate({ ...template, [field]: value })}
          templateEditable
        />
        <div className="center-button">
          <button onClick={addProduction}>Add Production</button>
        </div>
      </div>

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
          <div className="center-button">
            <button onClick={() => removeProduction(index)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductionCreator;
