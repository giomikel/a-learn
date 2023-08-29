import React, { useState, useEffect } from 'react';
import '../../css/TMSimulation.css';
import TMForm from '../utils/TMForm';
import TuringTransition from '../../core/structures/turing-transition.mjs';
import TuringMachine from '../../core/structures/turing-machine.mjs';
import TMSimulator from '../../core/tm-simulation/tm-simulation.mjs';
import GraphVisualization from '../utils/GraphVisualization';

function TMSimulation() {
  const [numStates, setNumStates] = useState(1);
  const [transitions, setTransitions] = useState([]);
  const [resetForm, setResetForm] = useState(false);
  const [graph, setGraph] = useState(null);
  const [simulator, setSimulator] = useState(null);
  const [currentNode, setCurrentNode] = useState([]);
  const [input, setInput] = useState('');
  const [simulationStatus, setSimulationStatus] = useState('Idle');
  const [step, setStep] = useState(0);
  const [resultText, setResultText] = useState('');

  const handleCreateTM = () => {
    const transitionObjects = transitions.map((transition) => {
      return new TuringTransition(
        parseInt(transition.source, 10),
        transition.readSymbol,
        parseInt(transition.destination, 10),
        transition.writeSymbol,
        transition.move
      );
    });

    const tm = new TuringMachine(transitionObjects, numStates);

    const tmSimulator = new TMSimulator(tm);

    setSimulator(tmSimulator);
    setCurrentNode(tmSimulator.currentState);
    setInput('');
    setStep(0);
    setResultText('');

    const graph = tm.toGraph();

    setGraph(graph);
  };

  const states = Array.from({ length: numStates }, (_, i) => i);

  useEffect(() => {
    if (resetForm) {
      setTransitions([]);
      setResetForm(false);
      setGraph(null);
      setResultText('');
    }
  }, [resetForm]);

  useEffect(() => {
    setGraph(null);
    setSimulator(null);
    setCurrentNode([]);
    setInput('');
    setSimulationStatus('Idle');
    setStep(0);
    setResultText('');
  }, [transitions]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    if (simulator) {
      simulator.setInput(event.target.value);
    }
    setStep(0);
  };

  const handleStepSimulation = () => {
    // ---
  };

  const handleSimulate = () => {
    // ---
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

  return (
    <div className='tm-simulation-container'>
      <h2 className="section-title">TM Simulation</h2>
      <p className="section-description">Turing Machine Simulation</p>
      <div className='side-by-side-container'>
        <div className='tm-form'>
          <TMForm
            numStates={numStates}
            setNumStates={setNumStates}
            transitions={transitions}
            setTransitions={setTransitions}
            setResetForm={setResetForm}
            states={states}
          />
          <button onClick={handleCreateTM}>Create TM</button>
        </div>
        <div className='simulation-view'>
          <div className="simulation-controls">
            <input
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

export default TMSimulation;