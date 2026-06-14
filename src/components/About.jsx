import React, { useEffect, useRef } from 'react';
import './About.css';
import { Code2, Palette, GraduationCap, BookOpen, Wrench } from 'lucide-react';

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

const About = () => {
  const skillGroups = [
    {
      label: 'Frontend / Backend', icon: <Code2 size={22} />, color: 'cyan', skills: [
        { name: 'Vue.js', icon: 'icons8-vue-js' }, { name: 'Laravel', icon: 'laravel-svgrepo-com' }, { name: 'Python', icon: 'python-svgrepo-com' }
      ]
    },
    {
      label: 'Design Tools', icon: <Palette size={22} />, color: 'yellow', skills: [
        { name: 'Photoshop', icon: 'Adobe_Photoshop_CC_2026_icon' }, { name: 'Illustrator', icon: 'Adobe_Illustrator_CC_icon' }, { name: 'CorelDRAW', icon: 'corel-draw-svgrepo-com' }
      ]
    },
    {
      label: 'Office Tools', icon: <Wrench size={22} />, color: 'green', skills: [
        { name: 'Word', icon: 'Microsoft_Office_Word_(2025–present)' }, { name: 'Excel', icon: 'Microsoft_Office_Excel_(2025–present)' }
      ]
    },
  ];

  const education = [
    { year: '2022–Now', school: 'National Meanchey University', degree: "Bachelor's – Information Technology", icon: <GraduationCap size={20} /> },
    { year: '2022', school: 'Mongkol Borey High School', degree: 'High School Diploma', icon: <BookOpen size={20} /> },
    { year: '2019', school: 'KoyMaeng Secondary School', degree: 'Secondary School Diploma', icon: <BookOpen size={20} /> },
  ];

  const leftRef = useReveal(0);
  const rightRef = useReveal(0.2);

  return (
    <section id="about" className="about-section section-container">
      <h2 className="section-title">⚔️ CHARACTER STATS</h2>
      <div className="about-layout">
        <div className="skills-column fade-in-left" ref={leftRef}>
          {skillGroups.map((group, i) => (
            <div key={i} className={`skill-group panel-game border-${group.color}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="skill-group-header">
                <span className={`skill-icon-wrap icon-${group.color}`}>{group.icon}</span>
                <h3>{group.label}</h3>
              </div>
              <div className="skill-tags">
                {group.skills.map((s, j) => (
                  <span key={j} className={`skill-pill pill-${group.color}`}>
                    <img src={`/icons/${s.icon}.svg`} alt={s.name} className="pill-icon" />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="edu-column fade-in-right" ref={rightRef}>
          <h3 className="edu-title">🎓 EDUCATION LOG</h3>
          <div className="edu-timeline">
            {education.map((e, i) => (
              <div key={i} className="edu-card panel-game">
                <div className="edu-icon-wrap">{e.icon}</div>
                <div className="edu-info">
                  <span className="badge-game edu-year"><span>{e.year}</span></span>
                  <h4>{e.school}</h4>
                  <p>{e.degree}</p>
                </div>
                {i < education.length - 1 && <div className="edu-line"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;