import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      <footer className="game-footer panel-game">
        <p>© {new Date().getFullYear()} PUYVONG HENG · ALL RIGHTS RESERVED</p>
      </footer>
    </>
  );
}

export default App;
