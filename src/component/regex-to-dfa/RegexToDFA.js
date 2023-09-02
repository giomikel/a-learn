import React, { useState } from 'react';
import "../../css/RegexToDFA.css";
import { useEffect } from 'react';
import { convertRegexToDFA } from '../../core/regex-to-dfa/regex-to-dfa.mjs';
import validateExpression from '../../core/utils/regex-validator.mjs';
import GraphVisualization from '../utils/GraphVisualization';

function generateDFAFromRegex(regex) {
  return convertRegexToDFA(regex);
}


function RegexToDFA() {
  const [regex, setRegex] = useState('');
  const [graph, setGraph] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleGenerateDFA = () => {
    if (!validateExpression(regex)) {
      setValidationError('Invalid regex. Please enter a valid regular expression.');
      setGraph(null);
    } else {
      setValidationError('');
      const generatedDFA = generateDFAFromRegex(regex);
      const graph = generatedDFA.toGraph();
      setGraph(graph);
    }
  };

  useEffect(() => {
    setGraph(null);
    setValidationError('');
  }, [regex]);

  return (
    <div className="regex-to-dfa-container">
      <div className="regex-form">
        <div className='description-container'>
          <h2 className="section-title">Regex to DFA</h2>
          <p className="section-description">
            Convert Regular Expression to Deterministic Finite Automata (DFA).
          </p>
        </div>
        <div className="input-container">
          <input className='regex-input'
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Enter regex..."
          />
          <button onClick={handleGenerateDFA}>Generate DFA</button>
          {validationError && <p className="error-message">{validationError}</p>}
        </div>
      </div>
      <div className="graph-visualization-scroll-container" id='graph-visualization-scroll-container'>
        <div className="graph-visualization-container">
          {graph && <GraphVisualization graph={graph} />}
        </div>
      </div>
    </div>
  )
}

export default RegexToDFA;
