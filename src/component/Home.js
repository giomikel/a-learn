import React from 'react';
import "../css/Home.css";

function Home() {
  return (  
      <div className="home-container">
      <header className="header">
      <h1 className="app-title">A-learn</h1>
      </header>
        <nav className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/NFAToRegex" className="nav-link">
              <div className="nav-card">
                <span>NFAToRegex</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/RegexToNFA" className="nav-link">
              <div className="nav-card">
                <span>RegexToNFA</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/DFAToRegex" className="nav-link">
              <div className="nav-card">
                <span>DFAToRegex</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/RegexToDFA" className="nav-link">
              <div className="nav-card">
                <span>RegexToDFA</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/NFAToDFA" className="nav-link">
              <div className="nav-card">
                <span>NFAToDFA</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/CFGToCNF" className="nav-link">
              <div className="nav-card">
                <span>CFGToCNF</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/CFGToPDA" className="nav-link">
              <div className="nav-card">
                <span>CFGToPDA</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/DFASimulation" className="nav-link">
              <div className="nav-card">
                <span>DFASimulation</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/NFASimulation" className="nav-link">
              <div className="nav-card">
                <span>NFASimulation</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/TuringMachineSimulation" className="nav-link">
              <div className="nav-card">
                <span>TuringMachineSimulation</span>
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a href="/PDASimulation" className="nav-link">
              <div className="nav-card">
                <span>PDASimulation</span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        <p>Welcome to A-learn!</p>
      </main>
    </div>
    
  )
}

export default Home;
