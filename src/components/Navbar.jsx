import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ទំព័រដើម', href: '#hero' },
    { name: 'អំពីខ្ញុំ', href: '#about' },
    { name: 'គម្រោង', href: '#projects' },
    { name: 'ទំនាក់ទំនង', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-3' : 'py-4'
    }`} style={{
      background: scrolled
        ? 'rgba(8,12,20,0.85)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
    }}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>
            <Zap size={18} fill="white" stroke="white" />
          </div>
          <span className="font-bold text-lg gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>
            ពុយវង្ស ហេង
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a key={link.name} href={link.href}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ color: 'rgba(240,244,255,0.7)' }}
              onMouseEnter={e => { e.currentTarget.style.color='#f0f4ff'; e.currentTarget.style.background='rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.color='rgba(240,244,255,0.7)'; e.currentTarget.style.background='transparent'; }}>
              {link.name}
            </a>
          ))}
          <Link to="/login" className="btn-modern btn-holo btn-float ml-3 text-sm py-2.5 px-5">
            🔐 Admin
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden btn-modern btn-ghost p-2.5"
          onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenu && (
        <div className="md:hidden mx-4 mt-2 glass-elevated p-4 flex flex-col gap-2">
          {navLinks.map(link => (
            <a key={link.name} href={link.href}
              onClick={() => setMobileMenu(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
              style={{ color: 'rgba(240,244,255,0.8)', background: 'rgba(255,255,255,0.03)' }}>
              {link.name}
            </a>
          ))}
          <Link to="/login" onClick={() => setMobileMenu(false)}
            className="btn-modern btn-neon text-sm py-3 mt-1 w-full">
            🔐 Admin
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
