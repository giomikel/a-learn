import React, { useState, useEffect } from 'react';
import FSMForm from '../utils/FSMForm';
import { Transition } from '../../core/structures/fsm-transition.mjs';
import { FiniteStateMachine } from '../../core/structures/fsm.mjs';
import { EPSILON_SYMBOL } from '../../core/constants.mjs';
import { DFASimulator } from '../../core/dfa-simulation/dfa-simulation.mjs';
import GraphVisualization from '../utils/GraphVisualization';
import '../../css/DFASimulation.css';

function NFASimulation() {

  const [numStates, setNumStates] = useState(1);
  const [selectedAcceptState, setSelectedAcceptState] = useState("");
  const [acceptStates, setAcceptStates] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [resetForm, setResetForm] = useState(false);
  const [graph, setGraph] = useState(null);
  const [input, setInput] = useState('');
  const [simulationStatus, setSimulationStatus] = useState('Idle');
  const [simulator, setSimulator] = useState(null);
  const [currentNode, setCurrentNode] = useState([]);
  const [step, setStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [resultText, setResultText] = useState('');

  const states = Array.from({ length: numStates }, (_, i) => i);

  const handleCreateFSM = () => {
    const transitionObjects = transitions.map((transition) => {
      return new Transition(parseInt(transition.source, 10), transition.symbol === '' ? EPSILON_SYMBOL : transition.symbol, parseInt(transition.destination, 10));
    });

    const acceptStatesParsed = acceptStates.map((acceptState) => {
      return parseInt(acceptState, 10)
    });

    const fsm = new FiniteStateMachine(states, transitionObjects, acceptStatesParsed);

    if (!fsm.isDFA) {
      setErrorMessage("This Finite State Machine is not a DFA");
      setGraph(null);
    } else {
      const dfaSimulator = new DFASimulator(fsm);

      setSimulator(dfaSimulator);
      setCurrentNode(dfaSimulator.currentState);
      setInput('');
      setStep(0);

      const graph = fsm.toGraph();

      setGraph(graph);
      setErrorMessage("");
    }
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
    if (simulator) {
      simulator.setInput(event.target.value);
    }
    setStep(0);
  };

  const handleStepSimulation = () => {
    if (simulator) {
      const result = simulator.step();
      setSimulationStatus(result ? 'Simulating' : 'Simulation Complete');
      setCurrentNode(simulator.currentState);
      setInput((prevInput) => result ? prevInput.substring(1) : prevInput);
      if (result)
        setStep(step + 1);
    }
  };

  const handleSimulate = () => {
    if (simulator) {
      setSimulationStatus('Simulating');
      const simulateInterval = setInterval(() => {
        const result = simulator.step();
        setCurrentNode(simulator.currentState);
        setStep((prevStep) => result ? prevStep + 1 : prevStep);
        setInput((prevInput) => result ? prevInput.substring(1) : prevInput);
        if (!result) {
          clearInterval(simulateInterval);
          setSimulationStatus('Simulation Complete');
        }
      }, 500);
    }
  };

  const getResultColor = () => {
    if (resultText === 'Accepts') {
      return 'accepts-text';
    } else if (resultText === 'Rejects') {
      return 'rejects-text';
    } else {
      return '';
    }
  }

  useEffect(() => {
    if (resetForm) {
      setSelectedAcceptState("");
      setAcceptStates([]);
      setTransitions([]);
      setResetForm(false);
      setGraph(null);
      setErrorMessage("");
    }
  }, [resetForm]);

  useEffect(() => {
    if (simulationStatus === 'Simulation Complete') {
      if (simulator.isAcceptState() && input.length === 0) {
        setResultText('Accepts');
      } else if (step !== 0 || (step === 0 && !simulator.isAcceptState())) {
        setResultText('Rejects');
      } else {
        setResultText('');
      }
    } else {
      setResultText('');
    }
  }, [simulationStatus, input.length, simulator, step]);

  useEffect(() => {
    setGraph(null);
    setSimulator(null);
    setErrorMessage("");
    setInput('');
    setSimulationStatus('Idle');
    setCurrentNode([]);
    setStep(0);

  }, [transitions, acceptStates]);

  return (
    <div className='container'>
      <h2 className='section-title'>DFA Simulation</h2>
      <p className="section-description">DFA Simulation</p>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        </div>
        <div className='simulation-view'>
          <div className="simulation-controls">
            <input className='simulation-input'
              type="text"
              placeholder="Enter input..."
              value={input}
              onChange={(e) => handleInputChange(e)}
            />
            <button onClick={handleStepSimulation}>Step</button>
            <button onClick={handleSimulate}>Simulate</button>
            <div className="simulation-info">
              <div className="status">
                <p>Current Input: {input}</p>
                <p>Step: {step}</p>
                <p>Simulation Status: {simulationStatus}</p>
                <p>Current State: {currentNode}</p>
                <p className={getResultColor()}>{resultText}</p>
              </div>
            </div>
          </div>
          <div className="graph-visualization-scroll-container" id='graph-visualization-scroll-container' style={{ maxHeight: '90vh' }}>
            <div className="graph-visualization-container">
              {graph && <GraphVisualization graph={graph} currentNodes={currentNode === null ? [] : [currentNode]} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFASimulation;
