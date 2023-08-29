// import React from 'react';
// import "../css/Home.css";

// function Home() {
//   return (  
//       <div className="home-container">
//       <header className="header">
//       <h1 className="app-title">A-learn</h1>
//       </header>
//         <nav className="navbar">
//         <ul className="nav-list">
//           <li className="nav-item">
//             <a href="/NFAToRegex" className="nav-link">
//               <div className="nav-card">
//                 <span>NFAToRegex</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/RegexToNFA" className="nav-link">
//               <div className="nav-card">
//                 <span>RegexToNFA</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/DFAToRegex" className="nav-link">
//               <div className="nav-card">
//                 <span>DFAToRegex</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/RegexToDFA" className="nav-link">
//               <div className="nav-card">
//                 <span>RegexToDFA</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/NFAToDFA" className="nav-link">
//               <div className="nav-card">
//                 <span>NFAToDFA</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/CFGToCNF" className="nav-link">
//               <div className="nav-card">
//                 <span>CFGToCNF</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/CFGToPDA" className="nav-link">
//               <div className="nav-card">
//                 <span>CFGToPDA</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/DFASimulation" className="nav-link">
//               <div className="nav-card">
//                 <span>DFASimulation</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/NFASimulation" className="nav-link">
//               <div className="nav-card">
//                 <span>NFASimulation</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/TMSimulation" className="nav-link">
//               <div className="nav-card">
//                 <span>TMSimulation</span>
//               </div>
//             </a>
//           </li>
//           <li className="nav-item">
//             <a href="/PDASimulation" className="nav-link">
//               <div className="nav-card">
//                 <span>PDASimulation</span>
//               </div>
//             </a>
//           </li>
//         </ul>
//       </nav>
//       <main className="main-content">
//         <p>Welcome to A-learn!</p>
//       </main>
//     </div>
    
//   )
// }

// export default Home;


import React from 'react';
import "../css/Home.css";

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
  const columns = Math.ceil(navigationLinks.length / 5); // Adjust the number of columns as needed

  const columnItems = [];
  for (let i = 0; i < columns; i++) {
    columnItems.push(
      <ul className="nav-list" key={i}>
        {navigationLinks.slice(i * 5, (i + 1) * 5).map(link => (
          <li className="nav-item" key={link.path}>
            <a href={link.path} className="nav-link">
              <div className="nav-card">
                <span className="nav-card-title">{link.title}</span>
                <span className="nav-card-description">{link.description}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="app-title">A-learn</h1>
      </header>
      <main className="main-content">
        <p>Welcome to A-learn!</p>
      </main>
      <nav className="navbar">
        <div className="nav-columns">
          {columnItems.map((column, index) => (
            <div key={index} className="nav-column">
              {column}
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Home;
