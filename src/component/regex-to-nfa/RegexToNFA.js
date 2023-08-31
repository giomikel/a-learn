import React, { useState } from 'react';
import "../../css/RegexToNFA.css";
import { useEffect } from 'react';
import regexToNFA from '../../core/regex-to-nfa/regex-to-nfa.mjs';
import validateExpression from '../../core/utils/regex-validator.mjs';
import GraphVisualization from '../utils/GraphVisualization';

function generateNFAFromRegex(regex) {
  return regexToNFA(regex);
}


function RegexToNFA() {
  const [regex, setRegex] = useState('');
  const [graph, setGraph] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleGenerateNFA = () => {
    if (!validateExpression(regex)) {
      setValidationError('Invalid regex. Please enter a valid regular expression.');
      setGraph(null);
    } else {
      setValidationError('');
      const generatedNFA = generateNFAFromRegex(regex);
      const graph = generatedNFA.toGraph();
      setGraph(graph);
    }
  };

  useEffect(() => {
    setGraph(null);
    setValidationError('');
  }, [regex]);

  return (
    <div className="regex-to-nfa-container">
      <div className='regex-form'>
        <h2 className="section-title">Regex to NFA</h2>
        <p className="section-description">
          Convert Regular Expression to Non-Deterministic Finite Automata (NFA).
        </p>
        <div className="input-container">
          <input className='regex-input'
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Enter regex..."
          />
          <button onClick={handleGenerateNFA}>Generate NFA</button>
        </div>
      </div>
      {validationError && <p className="error-message">{validationError}</p>}
      <div className="graph-visualization-scroll-container" id='graph-visualization-scroll-container'>
        <div className="graph-visualization-container">
          {graph && <GraphVisualization graph={graph} />}
        </div>
      </div>
    </div>
  )
}

export default RegexToNFA;
