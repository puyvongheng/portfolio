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
  const cardRef = useScrollReveal();
  const chipsRef = useScrollReveal();

  const skills = [
    { label: 'Vue.js', color: 'chip-green', icon: 'icons8-vue-js' },
    { label: 'Laravel', color: 'chip-red', icon: 'laravel-svgrepo-com' },
    { label: 'Python', color: 'chip-yellow', icon: 'python-svgrepo-com' },
    { label: 'Photoshop', color: 'chip-purple', icon: 'Adobe_Photoshop_CC_2026_icon' },
    { label: 'CorelDRAW', color: 'chip-cyan', icon: 'corelCorelDraw_logo_(2)' },
  ];

  return (
    <section className="hero-section">
      <div className="hero-container section-container">

        {/* ── PLAYER CARD ── */}
        <div className="player-card panel-game fade-in" ref={cardRef}>
          <div className="card-corner-tag">PLAYER PROFILE</div>

          <div className="hex-avatar-wrapper">
            <div className="hex-frame">
              <img src="/avatar.png" alt="Puyvong Heng" className="avatar-img" />
              <div className="hex-glow"></div>
            </div>
            <div className="player-level">
              <Star size={14} fill="currentColor" /> LVL 22
            </div>
            <div className="player-online">
              <span className="online-dot"></span> ONLINE
            </div>
          </div>

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

            <div className="hero-bars">
              {[
                { label: 'SKILL', w: '50%', val: '80', class: 'skill' },
                { label: 'EXP', w: '1%', val: '650', class: 'exp' },
              ].map((bar, i) => (
                <div key={i} className="bar-row">
                  <span className="bar-label">{bar.label}</span>
                  <div className="progress-bar-bg">
                    <div className={`progress-bar-fill ${bar.class} bar-animate`} style={{ '--bar-w': bar.w }}></div>
                  </div>
                  <span className="bar-value">{bar.val}</span>
                </div>
              ))}
            </div>

            <div className="hero-actions">
              <a href="#projects" className="btn-game btn-yellow">MISSIONS <ArrowRight size={18} /></a>
              <a href="#contact" className="btn-game btn-cyan"><Mail size={18} /> CONTACT</a>
            </div>
          </div>
        </div>

        {/* ── SKILL CHIPS ── */}
        <div className="hero-chips fade-in" ref={chipsRef}>
          {skills.map((s, i) => (
            <div key={i} className={`chip-badge panel-game ${s.color}`} style={{ animationDelay: `${i * 0.15}s` }}>
              <img src={`/icons/${s.icon}.svg`} alt={s.label} className="chip-icon" />
              {s.label}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;