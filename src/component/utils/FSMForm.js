import React from 'react';
import Dropdown from './Dropdown';
import TransitionCreator from './FSMTransitionCreator';
import '../../css/FSMForm.css';

function FSMForm(props) {

  const {
    numStates,
    setNumStates,
    selectedAcceptState,
    setSelectedAcceptState,
    acceptStates,
    setAcceptStates,
    transitions,
    setTransitions,
    setResetForm,
    states,
  } = props;

  const handleNumStatesChange = (value) => {
    setNumStates(parseInt(value, 10));
    setResetForm(true);
  };

  const handleAcceptStateChange = (value) => {
    setSelectedAcceptState(value);
  };

  const handleAddAcceptState = () => {
    if (selectedAcceptState !== "" && !acceptStates.includes(selectedAcceptState)) {
      setAcceptStates([...acceptStates, selectedAcceptState]);
      setSelectedAcceptState("");
    }
  };

  const handleRemoveAcceptState = (stateToRemove) => {
    const updatedAcceptStates = acceptStates.filter((state) => state !== stateToRemove);
    setAcceptStates(updatedAcceptStates);
  };

  return (
    <div className="form-container-fsm">
      <h2 className="form-title">Finite State Machine</h2>
      <div className="input-group">
        <label className="input-label">Select the number of states:</label>
        <Dropdown
          options={Array.from({ length: 100 }, (_, i) => i + 1)}
          selectedOption={numStates}
          onSelect={handleNumStatesChange}
        />
      </div>
      <div className="input-group">
        <label className="input-label">Select Accept State:</label>
        <Dropdown
          options={['', ...states]}
          selectedOption={selectedAcceptState}
          onSelect={handleAcceptStateChange}
        />
        <button onClick={handleAddAcceptState}>Select</button>
      </div>
      <div className="accept-states">
        <h3>Selected Accept States:</h3>
        <ul className="accept-states-list">
          {acceptStates.map((state) => (
            <li key={state} className="accept-state-item">
              State {state}
              <button onClick={() => handleRemoveAcceptState(state)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="input-group">
        <label className="input-label">Define transitions:</label>
        <TransitionCreator states={states} transitions={transitions} setTransitions={setTransitions} />
      </div>
    </div>
  );
}

export default FSMForm;
