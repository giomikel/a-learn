import React from 'react';
import '../css/Home.css';

const navigationLinks = [
  { path: '/#NFAToRegex', description: 'Convert NFA to Regular Expression' },
  { path: '/#RegexToNFA', description: 'Convert Regular Expression to NFA' },
  { path: '/#DFAToRegex', description: 'Convert DFA to Regular Expression' },
  { path: '/#RegexToDFA', description: 'Convert Regular Expression to DFA' },
  { path: '/#NFAToDFA', description: 'Convert NFA to DFA' },
  { path: '/#CFGToCNF', description: 'Convert Context-Free Grammar to Chomsky Normal Form' },
  { path: '/#CFGToPDA', description: 'Convert Context-Free Grammar to PDA' },
  { path: '/#DFASimulation', description: 'DFA Simulation' },
  { path: '/#NFASimulation', description: 'NFA Simulation' },
  { path: '/#TMSimulation', description: 'Turing Machine Simulation' },
  { path: '/#PDASimulation', description: 'PDA Simulation' },
];

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="app-title">A-learn</h1>
      </header>
      <nav className="navbar">
        <ul className="nav-list">
          {navigationLinks.map((link, index) => (
            <li className="nav-item" key={index}>
              <a href={process.env.PUBLIC_URL + link.path} className="nav-link">
                <div className="nav-card">
                  <span className="nav-card-title">{link.title}</span>
                  <span className="nav-card-description">{link.description}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Home;
