import React, { useEffect, useState } from 'react';
import TransitionInput from '../utils/TMTransitionInput';

function TransitionCreator({ states, transitions, setTransitions }) {
  const [template, setTemplate] = useState({ source: '0', destination: '0', writeSymbol: '', readSymbol: '', move: 'R' });

  useEffect(() => {
    setTemplate({ source: '0', destination: '0', writeSymbol: '', readSymbol: '', move: 'R' });
  }, [states]);

  const addTransition = () => {

    const isDuplicate = transitions.some(
      (transition) =>
        transition.fromState === template.source &&
        transition.toState === template.destination &&
        transition.writeSymbol === template.writeSymbol &&
        transition.readSymbol === template.readSymbol &&
        transition.move === template.move
    );

    const isEmptyWriteRead = template.writeSymbol === '' || template.readSymbol === '';

    if (!isDuplicate && !isEmptyWriteRead) {
      const newTransition = { ...template, editable: false };
      setTransitions([...transitions, newTransition]);
    } else if (!isDuplicate) {
      alert('This transition contains empty symbol.');
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
        readSymbol={template.readSymbol}
        writeSymbol={template.writeSymbol}
        move={template.move}
        onChange={(field, value) => setTemplate({ ...template, [field]: value })}
        templateEditable
      />
      {/* <button onClick={addTransition}>Add Transition</button> */}
      <div className="center-button">
         <button onClick={addTransition}>Add Transition</button>
      </div>

      <h3>Transitions:</h3>

      {transitions.map((transition, index) => (
        <div key={index} className="transition-container">
          <TransitionInput
            states={states}
            source={transition.source}
            destination={transition.destination}
            readSymbol={transition.readSymbol}
            writeSymbol={transition.writeSymbol}
            move={transition.move}
            onChange={() => { }}
            disabled={!transition.editable}
          />
          <div className="center-button">
             <button onClick={() => removeTransition(index)}>Remove</button>
         </div>
        </div>
      ))}
    </div>
  );
}

export default TransitionCreator;
