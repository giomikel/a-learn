import React, { useState, useEffect } from 'react';
import "../../css/CFGToCNF.css";
import CFGForm from '../utils/CFGForm';
import createCFG from '../utils/CFGCreator';
import CNFConverter from '../../core/cfg-to-cnf/cfg-to-cnf.mjs';
import CNFVisualization from '../utils/CNFVisualization';
import validateCFG from '../../core/utils/cfg-validator.mjs';

function CFGToCNF() {
  const [selectedStartSymbol, setSelectedStartSymbol] = useState("S");
  const [productions, setProductions] = useState([]);
  const [cnf, setCNF] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const handleCreateCFG = () => {
    try {
      let cfg = createCFG(productions, selectedStartSymbol);
      validateCFG(cfg);

      const cnfConverter = new CNFConverter(cfg);
      const cnf = cnfConverter.convertToCNF();

      setCNF(cnf);
      setErrorMessage("");
    } catch (error) {

      setErrorMessage(error.message);
      setCNF(null);
    }

  };

  useEffect(() => {
    setCNF(null);
    setErrorMessage("");
  }, [productions, selectedStartSymbol]);

  return (
    <div className="container">
      <div className='description-container'>
        <h2 className="section-title">CFG to CNF</h2>
        <p className="section-description">Create valid context-free grammar by specifying start symbol, productions. Capital letters are interpreted as non-terminal symbols. Left side of production rule must contain non-terminal which shuld be start symbol or already defined in expression(s). All non-terminals should be defined in following production rules. Expression must contain only alphanumeric symbols. After clicking "Create CFG" button, valid CFG is transformed into Chomsky normal form (each rule in new line) and is displayed as text on the screen.</p>
      </div>
      <div className='side-by-side-container'>
        <div className='cfg-form'>
          <CFGForm
            selectedStartSymbol={selectedStartSymbol}
            setSelectedStartSymbol={setSelectedStartSymbol}
            productions={productions}
            setProductions={setProductions}
            alphabet={alphabet}
          />
          <button onClick={handleCreateCFG}>Create CFG</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
        </div>
        <div className='cnf-visualization-container '>
          <p>Converted CNF</p>
          {cnf && <CNFVisualization cnf={cnf} />}
        </div>
      </div>
    </div>
  )
}

export default CFGToCNF;
