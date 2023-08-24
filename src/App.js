import React from 'react';
import RegexToNFA from './component/regex-to-nfa/RegexToNFA';
import NFAToRegex from './component/nfa-to-regex/NFAToRegex';
import NFAToDFA from './component/nfa-to-dfa/NFAToDFA';
import RegexToDFA from './component/regex-to-dfa/RegexToDFA';
import CFGToCNF from './component/cfg-to-cnf/CFGToCNF';
import DFAToRegex from './component/dfa-to-regex/DFAToRegex';
import CFGToPDA from './component/cfg-to-pda/CFGToPDA';
import NFASimulation from './component/nfa-simulation/NFASimulation'
import DFASimulation from './component/dfa-simulation/DFASimulation';
import Home from './component/Home'
import { Routes, Route } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RegexToNFA" element={<RegexToNFA />} />
        <Route path="/NFAToRegex" element={<NFAToRegex />} />
        <Route path="/NFAToDFA" element={<NFAToDFA />} />
        <Route path="/RegexToDFA" element={<RegexToDFA />} />
        <Route path="/CFGToCNF" element={<CFGToCNF />} />
        <Route path="/DFAToRegex" element={<DFAToRegex />} />
        <Route path="/CFGToPDA" element={<CFGToPDA />} />
        <Route path="/NFASimulation" element={<NFASimulation />} />
        <Route path="/DFASimulation" element={<DFASimulation />} />
      </Routes>
    </div>
  );
}

export default App;
