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
        <div className='description-container'>
          <h2 className="section-title">Regex to NFA</h2>
          <p className="section-description">
             Entered regular expression can only contain alphanumeric and special symbols ('(', ')', '*', '|').<br/> 
             After clicking "Generate NFA" button, valid regex is transformed into NFA graph and is displayed on the screen.<br/>
             '*' - Kleene star operator. This symbol should be used after valid expression enclosed in parentheses. For example: (a|b)*, (a)*.<br/>
             '|' - Unification operator.<br/>
             ''  - Concatenation is implicit.<br/>
             Empty symbol can be represented as ().<br/>  
          </p>
        </div>
        <div className="input-container">
          <input className='regex-input'
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Enter regex..."
          />
          <button onClick={handleGenerateNFA}>Generate NFA</button>
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

export default RegexToNFA;
