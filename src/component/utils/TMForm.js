import React from 'react';
import Dropdown from './Dropdown';
import TransitionCreator from '../utils/TMTransitionCreator';
import '../../css/TMForm.css';

function TMForm(props) {
  const {
    numStates,
    setNumStates,
    transitions,
    setTransitions,
    setResetForm,
    states,
  } = props;

  const handleNumStatesChange = (value) => {
    setNumStates(parseInt(value, 10));
    setResetForm(true);
  };

  return (
    <div className="form-container-tm">
      <h2 className="form-title">Turing Machine</h2>
      <div className="input-group">
        <label className="input-label">Select the number of states:</label>
        <Dropdown
          options={Array.from({ length: 100 }, (_, i) => i + 1)}
          selectedOption={numStates}
          onSelect={handleNumStatesChange}
        />
      </div>
      <div className="input-group">
        <label className="input-label">Define transitions (src, read, write, move, dest):</label>
        <TransitionCreator states={states} transitions={transitions} setTransitions={setTransitions} />
      </div>
    </div>
  );
}

export default TMForm;
