import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Gamepad2, Star, Zap } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-game ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <a href="#" className="logo-game">
          <Gamepad2 size={24} />
          <span>PUYVONG</span>
        </a>

        <div className="nav-stats">
          <div className="nav-stat">
            <Star size={16} fill="currentColor" />
            <span>LVL 22</span>
          </div>
          <div className="nav-stat">
            <Zap size={16} fill="currentColor" />
            <span>IT DEV</span>
          </div>
        </div>

        <ul className="nav-links-game">
          <li><a href="#about">STATS</a></li>
          <li><a href="#projects">MISSIONS</a></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
