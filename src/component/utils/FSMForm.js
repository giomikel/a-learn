import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import TransitionCreator from './FSMTransitionCreator';
import '../../css/FSMForm.css';
import { FiniteStateMachine } from '../../core/structures/fsm.mjs'
import { Transition } from '../../core/structures/fsm-transition.mjs'
import { EPSILON_SYMBOL } from '../../core/constants.mjs';

function FSMForm() {
  const [numStates, setNumStates] = useState(1);
  const [selectedAcceptState, setSelectedAcceptState] = useState("");
  const [acceptStates, setAcceptStates] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [resetForm, setResetForm] = useState(false);

  const states = Array.from({ length: numStates }, (_, i) => i);

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

  const handleCreateFSM = () => {
    const transitionObjects = transitions.map((transition) => {
      return new Transition(parseInt(transition.source, 10), transition.symbol === '' ? EPSILON_SYMBOL : transition.symbol, parseInt(transition.destination, 10));
    });

    const acceptStatesParsed = acceptStates.map((acceptState) => {
      return parseInt(acceptState, 10)
    });

    const fsm = new FiniteStateMachine(states, transitionObjects, acceptStatesParsed);
    console.log(fsm);
  };

  useEffect(() => {
    if (resetForm) {
      setSelectedAcceptState("");
      setAcceptStates([]);
      setTransitions([]);
      setResetForm(false);
    }
  }, [resetForm]);

  return (
    <div className="form-container">
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
          options={['Select accept state', ...states]}
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
      <button onClick={handleCreateFSM}>Create FSM</button>
    </div>
  );
}

export default FSMForm;
