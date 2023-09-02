import React, { useState, useEffect } from 'react';
import FSMForm from '../utils/FSMForm'
import { Transition } from '../../core/structures/fsm-transition.mjs';
import { FiniteStateMachine } from '../../core/structures/fsm.mjs'
import { EPSILON_SYMBOL } from '../../core/constants.mjs';
import GraphVisualization from '../utils/GraphVisualization';
import { convertNFAToDFA } from '../../core/nfa-to-dfa/nfa-to-dfa.mjs';
import '../../css/NFAToDFA.css'

function NFAToDFA() {
  const [numStates, setNumStates] = useState(1);
  const [selectedAcceptState, setSelectedAcceptState] = useState("");
  const [acceptStates, setAcceptStates] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [resetForm, setResetForm] = useState(false);
  const [graph, setGraph] = useState(null);

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
    const graph = dfa.toGraph();

    setGraph(graph);
  };

  useEffect(() => {
    if (resetForm) {
      setSelectedAcceptState("");
      setAcceptStates([]);
      setTransitions([]);
      setResetForm(false);
      setGraph(null);
    }
  }, [resetForm]);

  useEffect(() => {
    setGraph(null);
  }, [transitions, acceptStates]);

  return (
    <div className='container'>
      <div className='description-container'>
        <h2 className='section-title'>NFA to DFA Conversion</h2>
        <p className='section-description'>Create valid non-deterministic finite automaton by specifying states, accept states, transitions. Selected accept states must contain at least one member which is reachable from start state. After clicking "Create FSM" button, valid NFA is transformed into DFA and is displayed on the screen</p>
      </div>
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
        <div className='graph-view'>
          <div className='graph-top' />
          <div className="graph-visualization-scroll-container" id='graph-visualization-scroll-container' style={{ maxHeight: '90vh' }}>
            <div className="graph-visualization-container">
              {graph && <GraphVisualization graph={graph} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFAToDFA;
