import React, { useState, useEffect } from 'react';
import FSMForm from '../utils/FSMForm'
import { Transition } from '../../core/structures/fsm-transition.mjs';
import { FiniteStateMachine } from '../../core/structures/fsm.mjs'
import { EPSILON_SYMBOL } from '../../core/constants.mjs';
import { convertDFAToRegex } from '../../core/dfa-to-regex/dfa-to-regex.mjs'
import '../../css/DFAToRegex.css'

function DFAToRegex() {
  const [numStates, setNumStates] = useState(1);
  const [selectedAcceptState, setSelectedAcceptState] = useState("");
  const [acceptStates, setAcceptStates] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [resetForm, setResetForm] = useState(false);
  const [regex, setRegex] = useState("");

  const states = Array.from({ length: numStates }, (_, i) => i);

  const handleCreateFSM = () => {
    const transitionObjects = transitions.map((transition) => {
      return new Transition(parseInt(transition.source, 10), transition.symbol === '' ? EPSILON_SYMBOL : transition.symbol, parseInt(transition.destination, 10));
    });

    const acceptStatesParsed = acceptStates.map((acceptState) => {
      return parseInt(acceptState, 10)
    });

    const fsm = new FiniteStateMachine(states, transitionObjects, acceptStatesParsed);
    let result;
    if (!fsm.isDFA) {
      result = "This Finite State Machine is not a DFA";
    } else {
      const convertedRegex = convertDFAToRegex(fsm);
      result = convertedRegex == null ? "This Finite State Machine cannot be converted to Regex" : convertedRegex;
    }
    // console.log(fsm);
    // console.log(convertedRegex);
    setRegex(result);
  };

  useEffect(() => {
    if (resetForm) {
      setSelectedAcceptState("");
      setAcceptStates([]);
      setTransitions([]);
      setResetForm(false);
      setRegex("");
    }
  }, [resetForm]);

  useEffect(() => {
    setRegex("");
  }, [transitions, acceptStates]);

  return (
    <div className='container'>
      <h2 className='section-title'>DFA To Regex</h2>
      <p className="section-description">DFA to Regex</p>
      <div className='side-by-side-container'>
        <div className='fsm-form'>
          <FSMForm
            numStates={numStates}
            setNumStates={setNumStates}
            selectedAcceptState={selectedAcceptState}
            setSelectedAcceptState={setSelectedAcceptState}
            acceptStates={acceptStates}
            setAcceptStates={setAcceptStates}
            transitions={transitions}
            setTransitions={setTransitions}
            setResetForm={setResetForm}
            states={states}
          />
          <div className="center-button">
            <button onClick={handleCreateFSM}>Create FSM</button>
          </div>
        </div>
        <div className="regex-container">
          <pre className="regex-pattern">
            {regex}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default DFAToRegex;
