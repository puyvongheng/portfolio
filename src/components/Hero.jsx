import React, { useEffect, useRef } from 'react';
import './Hero.css';
import { ArrowRight, Shield, Star, Mail } from 'lucide-react';

const useScrollReveal = (className = 'visible') => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add(className); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const Hero = () => {
  const cardRef   = useScrollReveal();
  const chipsRef  = useScrollReveal();

  return (
    <section className="hero-section">
      <div className="hero-container section-container">

        {/* ── PLAYER CARD ── */}
        <div className="player-card panel-game fade-in" ref={cardRef}>

          {/* Decorative corner tag */}
          <div className="card-corner-tag">PLAYER PROFILE</div>

          {/* Left – Avatar */}
          <div className="hex-avatar-wrapper">
            <div className="hex-frame">
              <img src="/avatar.png" alt="Puyvong Heng" className="avatar-img" />
              <div className="hex-glow"></div>
            </div>
            <div className="player-level">
              <Star size={14} fill="currentColor" />
              LVL 22
            </div>
            <div className="player-online">
              <span className="online-dot"></span> ONLINE
            </div>
          </div>

          {/* Right – Info */}
          <div className="player-info">
            <div className="player-name-row">
              <h1 className="player-name text-3d">PUYVONG HENG</h1>
              <div className="badge-game"><span>🇰🇭 KH</span></div>
            </div>

            <div className="player-class">
              <Shield size={16} />
              <span>Full-Stack Developer &amp; Designer</span>
            </div>

            <p className="player-tagline">
              Passionate about technology and computer science. Strong in coding,
              analytics, and teamwork. Eager to contribute and expand technical skills.
            </p>

            {/* STAT BARS */}
            <div className="hero-bars">
              <div className="bar-row">
                <span className="bar-label">SKILL</span>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill skill bar-animate" style={{ '--bar-w': '80%' }}></div>
                </div>
                <span className="bar-value">80</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">EXP</span>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill exp bar-animate" style={{ '--bar-w': '65%' }}></div>
                </div>
                <span className="bar-value">650</span>
              </div>
              <div className="bar-row">
                <span className="bar-label">DESIGN</span>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill design bar-animate" style={{ '--bar-w': '75%' }}></div>
                </div>
                <span className="bar-value">75</span>
              </div>
            </div>

            {/* CTA */}
            <div className="hero-actions">
              <a href="#projects" className="btn-game btn-yellow">
                MISSIONS <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-game btn-cyan">
                <Mail size={18} /> CONTACT
              </a>
            </div>
          </div>
        </div>

        {/* ── SKILL CHIPS ── */}
        <div className="hero-chips fade-in" ref={chipsRef}>
          {[
            { label: 'Vue.js', color: 'chip-green' },
            { label: 'Laravel', color: 'chip-red' },
            { label: 'Python', color: 'chip-yellow' },
            { label: 'Photoshop', color: 'chip-purple' },
            { label: 'CorelDRAW', color: 'chip-cyan' },
          ].map((s, i) => (
            <div key={i} className={`chip-badge panel-game ${s.color}`}
                 style={{ animationDelay: `${i * 0.15}s` }}>
              {s.label}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;
