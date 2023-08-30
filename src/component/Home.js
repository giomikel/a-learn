import React from 'react';
import '../css/Home.css';

const navigationLinks = [
  { path: '/NFAToRegex', title: 'NFAToRegex', description: 'Convert NFA to Regular Expression' },
  { path: '/RegexToNFA', title: 'RegexToNFA', description: 'Convert NFA to Regular Expression' },
  { path: '/DFAToRegex', title: 'DFAToRegex', description: 'Convert NFA to Regular Expression' },
  { path: '/RegexToDFA', title: 'RegexToDFA', description: 'Convert NFA to Regular Expression' },
  { path: '/NFAToDFA', title: 'NFAToDFA', description: 'Convert NFA to Regular Expression' },
  { path: '/CFGToCNF', title: 'CFGToCNF', description: 'Convert NFA to Regular Expression' },
  { path: '/CFGToPDA', title: 'CFGToPDA', description: 'Convert NFA to Regular Expression' },
  { path: '/DFASimulation', title: 'DFASimulation', description: 'Convert NFA to Regular Expression' },
  { path: '/NFASimulation', title: 'NFASimulation', description: 'Convert NFA to Regular Expression' },
  { path: '/TMSimulation', title: 'TMSimulation', description: 'Convert NFA to Regular Expression' },
  { path: '/PDASimulation', title: 'PDASimulation', description: 'Convert NFA to Regular Expression' },
];

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="app-title">A-learn</h1>
        <p>Welcome to A-learn!</p>
      </header>
      <nav className="navbar">
        <ul className="nav-list">
          {navigationLinks.map((link, index) => (
            <li className="nav-item" key={index}>
              <a href={link.path} className="nav-link">
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
