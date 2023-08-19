// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import RegexToNFA from './component/regex-to-nfa/RegexToNFA';
import NFAToRegex from './component/NFAToRegex';
import Home from './component/Home'
import { Routes, Route } from 'react-router-dom'


function App() {
  return ( 
      <div className="App">
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/RegexToNFA" element={ <RegexToNFA /> } />
        <Route path="/NFAToRegex" element={ <NFAToRegex /> } />
      </Routes>
      </div>
  );
}

export default App;
