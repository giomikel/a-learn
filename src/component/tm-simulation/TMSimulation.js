import React, { useState, useEffect  } from 'react';
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

    const graph = tm.toGraph();

    setGraph(graph);
  };

  const states = Array.from({ length: numStates }, (_, i) => i);

  useEffect(() => {
    if (resetForm) {
      setTransitions([]);
      setResetForm(false);
      setGraph(null);
    }
  }, [resetForm]);

  useEffect(() => {
    setGraph(null);
    setSimulator(null);
    setCurrentNode([]);
  }, [transitions]);

  return (
    <div className='tm-simulation-container'>
      <h2 className="section-title">TM Simulation</h2>
      <p className="section-description">
          Turing Machine Simulation.
      </p>
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
          <div className="graph-visualization-scroll-container" id='graph-visualization-scroll-container' style={{ maxHeight: '90vh' }}>
            <div className="graph-visualization-container">
                {graph && <GraphVisualization graph={graph} currentNodes={currentNode === null? []:[currentNode]} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TMSimulation;
