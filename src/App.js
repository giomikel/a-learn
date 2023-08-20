import React from 'react';
import RegexToNFA from './component/regex-to-nfa/RegexToNFA';
import NFAToRegex from './component/nfa-to-regex/NFAToRegex';
import NFAToDFA from './component/nfa-to-dfa/NFAToDFA';
import RegexToDFA from './component/regex-to-dfa/RegexToDFA';
import DFAToRegex from './component/dfa-to-regex/DFAToRegex';
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
        <Route path="/DFAToRegex" element={<DFAToRegex />} />
      </Routes>
    </div>
  );
}

export default App;
