import React, { useState } from 'react';
import TransitionInput from './FSMTransitionInput';

function TransitionCreator({ states, transitions, setTransitions }) {
  const [template, setTemplate] = useState({ source: '0', destination: '0', symbol: '' });

  const addTransition = () => {
    const isDuplicate = transitions.some(
      (transition) =>
        transition.source === template.source &&
        transition.destination === template.destination &&
        transition.symbol === template.symbol
    );

    if (!isDuplicate) {
      const newTransition = { ...template, editable: false };
      setTransitions([...transitions, newTransition]);
    } else {
      alert('This transition already exists.');
    }
  };

  const removeTransition = (index) => {
    const updatedTransitions = [...transitions];
    updatedTransitions.splice(index, 1);
    setTransitions(updatedTransitions);
  };

  return (
    <div>
      <TransitionInput
        states={states}
        source={template.source}
        destination={template.destination}
        symbol={template.symbol}
        onChange={(field, value) => setTemplate({ ...template, [field]: value })}
        templateEditable
      />
      <button onClick={addTransition}>Add Transition</button>

      <h3>Transitions:</h3>

      {transitions.map((transition, index) => (
        <div key={index} className="transition-container">
          <TransitionInput
            states={states}
            source={transition.source}
            destination={transition.destination}
            symbol={transition.symbol}
            onChange={() => { }}
            disabled={!transition.editable} // Transition inputs are non-editable
          />
          <button onClick={() => removeTransition(index)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default TransitionCreator;
