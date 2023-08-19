// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import RegexToNFA from './component/regex-to-nfa/RegexToNFA';
import NFAToRegex from './component/NFAToRegex';
import NFAToDFA from './component/nfa-to-dfa/NFAToDFA';
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
      </Routes>
    </div>
  );
}

export default App;
