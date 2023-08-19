import React, { useState } from 'react';
import "../../css/RegexToNFA.css";
import { useEffect } from 'react';
import regexToNFA from '../../core/regex-to-nfa/regex-to-nfa.mjs';
import validateExpression from '../../core/utils/regex-validator.mjs';
import FSMVisualization from '../utils/FSMVisualization.js'

function generateNFAFromRegex(regex) {
  return regexToNFA(regex);
}


function RegexToNFA() {
  const [regex, setRegex] = useState('');
  const [nfa, setNFA] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleGenerateNFA = () => {
    if (!validateExpression(regex)) {
      setValidationError('Invalid regex. Please enter a valid regular expression.');
      setNFA(null);
    } else {
      setValidationError('');
      const generatedNFA = generateNFAFromRegex(regex);
      setNFA(generatedNFA);
    }
  };

  useEffect(() => {
    setNFA(null);
    setValidationError('');
  }, [regex]);

  return (
    <div className="regex-to-nfa-container">
      <h2 className="section-title">Regex to NFA</h2>
      <p className="section-description">
        Convert Regular Expression to Non-Deterministic Finite Automata (NFA).
      </p>
      <div className="input-container">
        <input
          type="text"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          placeholder="Enter regex..."
        />
        <button onClick={handleGenerateNFA}>Generate NFA</button>
      </div>
      {validationError && <p className="error-message">{validationError}</p>}
      <div className="fsm-visualization-scroll-container" id='fsm-visualization-scroll-container'>
        <div className="fsm-visualization-container">
          {nfa && <FSMVisualization fsm={nfa} />}
        </div>
      </div>
    </div>
  )
}

export default RegexToNFA;