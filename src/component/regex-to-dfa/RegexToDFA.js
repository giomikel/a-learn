import React, { useState } from 'react';
import "../../css/RegexToDFA.css";
import { useEffect } from 'react';
import { convertRegexToDFA } from '../../core/regex-to-dfa/regex-to-dfa.mjs';
import validateExpression from '../../core/utils/regex-validator.mjs';
import FSMVisualization from '../utils/FSMVisualization.js'

function generateDFAFromRegex(regex) {
  return convertRegexToDFA(regex);
}


function RegexToDFA() {
  const [regex, setRegex] = useState('');
  const [dfa, setDFA] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleGenerateDFA = () => {
    if (!validateExpression(regex)) {
      setValidationError('Invalid regex. Please enter a valid regular expression.');
      setDFA(null);
    } else {
      setValidationError('');
      const generatedDFA = generateDFAFromRegex(regex);
      setDFA(generatedDFA);
    }
  };

  useEffect(() => {
    setDFA(null);
    setValidationError('');
  }, [regex]);

  return (
    <div className="regex-to-dfa-container">
      <h2 className="section-title">Regex to DFA</h2>
      <p className="section-description">
        Convert Regular Expression to Deterministic Finite Automata (DFA).
      </p>
      <div className="input-container">
        <input
          type="text"
          value={regex}
          onChange={(e) => setRegex(e.target.value)}
          placeholder="Enter regex..."
        />
        <button onClick={handleGenerateDFA}>Generate DFA</button>
      </div>
      {validationError && <p className="error-message">{validationError}</p>}
      <div className="fsm-visualization-scroll-container" id='fsm-visualization-scroll-container'>
        <div className="fsm-visualization-container">
          {dfa && <FSMVisualization fsm={dfa} />}
        </div>
      </div>
    </div>
  )
}

export default RegexToDFA;
