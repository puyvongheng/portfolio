import React, { useEffect, useRef } from 'react';
import './Contact.css';

const useReveal = (delay = 0) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    el.style.transitionDelay = `${delay}s`;
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
};

const Contact = () => {
  const infoRef = useReveal(0);
  const formRef = useReveal(0.2);

  const contactDetails = [
    { icon: '4202011emailgmaillogomailsocialsocialmedia-115677_115624', color: 'cyan', label: 'EMAIL', value: 'vongheng2019@gmail.com' },
    { icon: 'phone-call-svgrepo-com', color: 'yellow', label: 'PHONE', value: '069717070' },
    { icon: 'Location_pin_icon', color: 'green', label: 'LOCATION', value: 'Banteay Meanchey, Cambodia' },
  ];


  return (
    <section id="contact" className="contact-section section-container">
      <h2 className="section-title">📡 SEND A SIGNAL</h2>
      <p className="section-subtitle">Open for missions, collaborations &amp; adventures!</p>

      <div className="contact-layout">
        <div className="contact-info panel-game fade-in-left" ref={infoRef}>
          <div className="contact-info-header">
            <h3>PLAYER CONTACT</h3>
            <div className="contact-online">
              <span className="status-dot"></span> AVAILABLE
            </div>
          </div>
          <p className="contact-info-sub">Currently open to new opportunities, freelance, and collaborations.</p>

          <div className="contact-details">
            {contactDetails.map((d, i) => (
              <div key={i} className="contact-detail-row">
                <div className={`contact-icon-wrap icon-${d.color}`}>
                  <img src={`/icons/${d.icon}.svg`} alt={d.label} className="contact-svg-icon" />
                </div>
                <div>
                  <h4>{d.label}</h4>
                  <p>{d.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-socials">
            <a href="https://github.com/puyvongheng" target="_blank" rel="noreferrer" className="btn-game btn-icon-game btn-cyan" title="GitHub">
              <img src="/icons/github.svg" alt="GitHub" className="social-svg-icon" />
            </a>
            <a href="https://t.me/puyvongheng2025" target="_blank" rel="noreferrer" className="btn-game btn-icon-game btn-cyan" title="Telegram">
              <img src="/icons/telegram.svg" alt="Telegram" className="social-svg-icon" />
            </a>
            <a href="https://facebook.com/puyongheng" target="_blank" rel="noreferrer" className="btn-game btn-icon-game btn-yellow" title="Facebook">
              <img src="/icons/facebook.svg" alt="Facebook" className="social-svg-icon" />
            </a>
          </div>
        </div>

        <form className="contact-form panel-game fade-in-right" ref={formRef}>
          <h3 className="contact-form-title">SEND MESSAGE</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">YOUR NAME</label>
              <input type="text" id="name" placeholder="Player Name..." />
            </div>
            <div className="form-group">
              <label htmlFor="email">YOUR EMAIL</label>
              <input type="email" id="email" placeholder="player@game.com" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">MESSAGE</label>
            <textarea id="message" rows="5" placeholder="Type your message here..."></textarea>
          </div>
          <button type="submit" className="btn-game btn-yellow contact-submit">
            <img src="/icons/send.svg" alt="Send" className="btn-icon" /> SEND SIGNAL
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;