import React, { useState, useEffect } from 'react';
import FSMForm from '../utils/FSMForm'
import { Transition } from '../../core/structures/fsm-transition.mjs';
import { FiniteStateMachine } from '../../core/structures/fsm.mjs'
import { EPSILON_SYMBOL } from '../../core/constants.mjs';
import FSMVisualization from '../utils/FSMVisualization';
import { convertNFAToDFA } from '../../core/nfa-to-dfa/nfa-to-dfa.mjs';
import '../../css/NFAToDFA.css'

function NFAToDFA() {
  const [numStates, setNumStates] = useState(1);
  const [selectedAcceptState, setSelectedAcceptState] = useState("");
  const [acceptStates, setAcceptStates] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [resetForm, setResetForm] = useState(false);
  const [dfa, setDFA] = useState(null);

  const states = Array.from({ length: numStates }, (_, i) => i);

  const handleCreateFSM = () => {
    const transitionObjects = transitions.map((transition) => {
      return new Transition(parseInt(transition.source, 10), transition.symbol === '' ? EPSILON_SYMBOL : transition.symbol, parseInt(transition.destination, 10));
    });

    const acceptStatesParsed = acceptStates.map((acceptState) => {
      return parseInt(acceptState, 10)
    });

    const fsm = new FiniteStateMachine(states, transitionObjects, acceptStatesParsed);
    const dfa = convertNFAToDFA(fsm);
    // console.log(fsm);
    // console.log(dfa);
    setDFA(dfa);
  };

  useEffect(() => {
    if (resetForm) {
      setSelectedAcceptState("");
      setAcceptStates([]);
      setTransitions([]);
      setResetForm(false);
      setDFA(null);
    }
  }, [resetForm]);

  useEffect(() => {
    setDFA(null);
  }, [transitions, acceptStates]);

  return (
    <div className='container'>
      <h1>NFA to DFA Conversion</h1>
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
          <button onClick={handleCreateFSM}>Create FSM</button>
        </div>
        <div className="fsm-visualization-scroll-container" id='fsm-visualization-scroll-container' style={{ maxHeight: '90vh' }}>
          <div className="fsm-visualization-container">
            {dfa && <FSMVisualization fsm={dfa} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFAToDFA;
