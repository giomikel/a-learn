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
        </ul>
      </nav>
      <main className="main-content">
        <p>Welcome to A-learn!</p>
      </main>
    </div>
    
  )
}

export default Home;
