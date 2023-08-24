import React, { useState, useEffect } from 'react';
import "../../css/CFGToPDA.css";
import CFGForm from '../utils/CFGForm';
import createCFG from '../utils/CFGCreator';
import validateCFG from '../../core/utils/cfg-validator.mjs';
import GraphVisualization from '../utils/GraphVisualization';
import { convertCFGToPDA } from '../../core/cfg-to-pda/cfg-to-pda.mjs';

function CFGToPDA() {
    const [selectedStartSymbol, setSelectedStartSymbol] = useState("S");
    const [productions, setProductions] = useState([]);
    const [graph, setGraph] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    const handleCreateCFG = () => {
      try {
        let cfg = createCFG(productions, selectedStartSymbol);
        validateCFG(cfg);

        const pda = convertCFGToPDA(cfg);
        const graph = pda.toGraph();

        setGraph(graph);
        console.log(graph);
        setErrorMessage(""); 
      }catch (error) {
        
        setErrorMessage(error.message); 
        setGraph(null); 
      }
        
      };
    
      useEffect(() => {
        setGraph(null);
        setErrorMessage(""); 
      }, [productions, selectedStartSymbol]);
  
    return (
        <div className="cfg-to-pda-container">
            <h2 className="section-title">CFG to PDA</h2>
            <p className="section-description">
                Convert CFG to PDA.
            </p>
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
                <div className="graph-visualization-scroll-container" id='graph-visualization-scroll-container'>
                  <div className="graph-visualization-container">
                    {graph && <GraphVisualization graph={graph} />}
                  </div>
                </div>
            </div>
        </div>
  )
}

export default CFGToPDA;
