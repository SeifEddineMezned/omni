import React from "react";
import "./App.css";
import logo from "./assets/web-logo.png";

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logo} alt="OMNI Logo" className="logo" />
        <h1>OMNI The All in One Life Operating System</h1>
      </header>

      <section className="description">
        <p>
          OMNI is an AI-powered personal dashboard that unifies your daily life
          tasks, goals, health, and budget into one smart, adaptive system.
          It simplifies time management, improves productivity, and helps you
          make better everyday decisions.
        </p>
      </section>

      <section className="team">
        <h2>Team Members</h2>
        <ul>
          <li>Seif Eddine Mezned</li>
          <li>Brahim Amous</li>
          <li>Mohamed Barrak</li>
          <li>Hiba Allah Msallem</li>
        </ul>
      </section>

      <footer className="footer">
        <p>CS 324 Deliverable 1 </p>
      </footer>
    </div>
  );
}

export default App;
