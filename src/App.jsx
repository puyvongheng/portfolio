import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import SEO from './components/SEO';

const MainPortfolio = () => (
  <>
    <SEO />
    <Navbar />
    <main>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
    <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-slate-400">
      <p className="font-['Russo_One'] tracking-wider text-sm">
        © {new Date().getFullYear()} PUYVONG HENG · ALL RIGHTS RESERVED
      </p>
    </footer>
  </>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainPortfolio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
