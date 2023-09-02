import React, { useState, useEffect } from 'react';
import '../../css/TMSimulation.css';
import TMForm from '../utils/TMForm';
import TuringTransition from '../../core/structures/turing-transition.mjs';
import TuringMachine from '../../core/structures/turing-machine.mjs';
import TMSimulator from '../../core/tm-simulation/tm-simulation.mjs';
import GraphVisualization from '../utils/GraphVisualization';
import TapeVisualizer from '../utils/TapeVisualizer';

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
  const [pointer, setPointer] = useState(-1);
  const [tape, setTape] = useState('');
  const [simulateInterval, setSimulateInterval] = useState(null);

  const handleCreateTM = () => {
    clearSimulateInterval();
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
    setTape('');
    setStep(0);
    setResultText('');
    setPointer(-1);
    setSimulationStatus('Idle');

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
    setTape('');
    setSimulationStatus('Idle');
    setStep(0);
    setResultText('');
    setPointer(-1);
    clearSimulateInterval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitions]);

  const clearSimulateInterval = () => {
    if (simulateInterval) {
      clearInterval(simulateInterval);
      setSimulationStatus('Idle');
      setSimulateInterval(null);
    }
  };

  const handleInputChange = (event) => {
    clearSimulateInterval();
    setInput(event.target.value);
    if (simulator) {
      simulator.setInput(event.target.value);
      setCurrentNode(simulator.currentState);
      setPointer(simulator.pointer);
    }
    setStep(0);
    setTape(event.target.value);
    setSimulationStatus('Idle');
    setResultText('');
  };

  const handleStepSimulation = () => {
    if (simulator) {
      const result = simulator.step();
      setSimulationStatus(result === 0 ? 'Simulating' : 'Simulation Complete');
      setCurrentNode(simulator.currentState);
      setTape(simulator.turingMachine.tape.join(''));
      setStep(simulator.currentStepNum);
      setPointer(simulator.pointer);
    }
  };

  const handleSimulate = () => {
    if (simulator) {
      if (simulateInterval) {
        clearInterval(simulateInterval)
      }
      simulator.setInput(input);
      setSimulationStatus('Simulating');
      setStep(0);
      setCurrentNode(simulator.currentState);
      setPointer(simulator.pointer);
      const newSimulateInterval = setInterval(() => {
        const result = simulator.step();
        setCurrentNode(simulator.currentState);
        setStep(simulator.currentStepNum);
        setPointer(simulator.pointer);
        setTape(simulator.turingMachine.tape.join(''));
        if (result !== 0) {
          clearInterval(newSimulateInterval);
          setSimulationStatus('Simulation Complete');
        }
      }, 500);
      setSimulateInterval(newSimulateInterval);
    }
  };

  useEffect(() => {
    if (simulationStatus === 'Simulation Complete') {
      if (simulator.isAccepted()) {
        setResultText('Accepts');
      } else if (step !== 0) {
        setResultText('Rejects');
      } else {
        setResultText('');
      }
    } else {
      setResultText('');
    }
  }, [simulationStatus, simulator, step, input.length]);

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
      <div className='description-container'>
        <h2 className="section-title">TM Simulation</h2>
        <p className="section-description">
          Create valid Turing Machine by specifying states, accept states, transitions.
          After clicking "Create TM" button, valid TM is displayed on the screen and after entering the input string,
          simulation can be controlled with "step" and "simulate" buttons.
          Details about the simulation is conveyed with "Step", Simulation Status" and "Current State" fields.
          Additionally the tape is visible above the Turing Machine, yellow color indicating tape head.
          State that is colored blue points out the current state.
          After the simulation is complete, corresponding text is displayed if the TM accepts or rejects given input.</p>
      </div>
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
            <input className="simulation-input"
              type="text"
              placeholder="Enter input..."
              value={input}
              onChange={(e) => handleInputChange(e)}
            />
            <button onClick={handleStepSimulation}>Step</button>
            <button onClick={handleSimulate}>Simulate</button>
            <div className="simulation-info">
              <div className="status">
                <p>Step: {step}</p>
                <p>Simulation Status: {simulationStatus}</p>
                <p>Current State: {currentNode}</p>
                <p className={getResultColor()}>{resultText}</p>
              </div>
              <div className='tape-container'>
                <p>Tape</p>
                <TapeVisualizer tape={tape} pointer={pointer} />
              </div>
            </div>
          </div>
          <div className="graph-visualization-scroll-container" id='graph-visualization-scroll-container' style={{ maxHeight: '90vh' }}>
            <div className="graph-visualization-container">
              {graph && <GraphVisualization graph={graph} currentNodes={currentNode === null ? [] : [currentNode]} ticks={true} />}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TMSimulation;
