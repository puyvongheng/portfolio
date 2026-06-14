import React, { useState, useEffect, useRef } from 'react';
import './Projects.css';
import { ExternalLink, Code2, Trophy, Star, Shield, ChevronRight } from 'lucide-react';

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

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const projects = [
    {
      id: 0,
      title: 'School Management System',
      subtitle: 'EPIC MISSION',
      description: 'A comprehensive system for managing students, teachers, schedules, and academic records. Streamlines school administration with powerful features for data management and reporting.',
      tags: ['Laravel', 'PHP', 'MySQL', 'Vue.js'],
      banners: ['/projects/school_banner.png'],
      icon: '🏫',
      difficulty: 'EPIC',
      diffColor: 'yellow',
      status: 'COMPLETED',
      stars: 4,
      details: [
        'Student Enrollment & Records',
        'Teacher Management Module',
        'Timetable Scheduling',
        'Grade & Result Processing',
      ],
    },
    {
      id: 1,
      title: 'University Teacher Evaluation',
      subtitle: 'LEGENDARY MISSION',
      description: 'A platform enabling students to evaluate teacher performance and submit feedback, with powerful admin analytics and reporting.',
      tags: ['Python', 'Laravel', 'Vue.js', 'PostgreSQL'],
      banners: [
        '/projects/teacher_banner.png',
        '/projects/teacher_eval_db.png',
        '/projects/teacher_eval_ui.png',
        '/projects/teacher_eval_diagram.png'
      ],
      icon: '🎓',
      difficulty: 'LEGENDARY',
      diffColor: 'cyan',
      status: 'COMPLETED',
      stars: 5,
      details: [
        'Student Feedback Portal',
        'Teacher Performance Analytics',
        'Admin Dashboard & Reports',
        'Semester-based Evaluation Cycles',
      ],
    },
    {
      id: 2,
      title: 'Digital Graphic Design',
      subtitle: 'CREATIVE MISSION',
      description: 'A curated showcase of branding materials, including modern logo designs, vibrant event posters, and digital advertising banners. Swipe to view gallery!',
      tags: ['Photoshop', 'Illustrator', 'CorelDRAW', 'Canva'],
      banners: [
        '/design/design_banner_1.png',
        '/design/design_banner_2.png',
        '/design/design_banner_3.png'
      ],
      icon: '🎨',
      difficulty: 'RARE',
      diffColor: 'purple',
      status: 'ONGOING',
      stars: 5,
      details: [
        'Brand Identity & Logos',
        'Marketing Posters & Banners',
        'Social Media Assets',
        'Vector Illustration',
      ],
    },
  ];

  return (
    <section id="projects" className="projects-section section-container">
      <h2 className="section-title">🗺️ MISSION SELECT</h2>
      <p className="section-subtitle">Click a mission card to view objectives</p>

      <div className="missions-grid">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className={`mission-card panel-game mission-${project.diffColor} ${activeProject === project.id ? 'is-active' : ''}`}
            onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
          >
            {/* ── Banner / Poster Gallery ── */}
            <div className="mission-banner">
              <div className="mission-banner-scroll">
                {project.banners.map((imgSrc, i) => (
                  <img key={i} src={imgSrc} alt={`${project.title} - ${i+1}`} loading="lazy" className="banner-img" />
                ))}
              </div>
              <div className="mission-banner-gradient" />
              <div className="mission-banner-top">
                <span className={`diff-badge diff-${project.diffColor}`}>{project.difficulty}</span>
                <div className="status-badge">
                  <span className="status-dot"></span>{project.status}
                </div>
              </div>
              <div className="mission-icon-overlay">{project.icon}</div>
              
              {project.banners.length > 1 && (
                <div className="gallery-hint">{'< SWIPE >'}</div>
              )}
            </div>

            {/* ── Stars ── */}
            <div className="mission-stars-row">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18}
                  fill={i < project.stars ? 'currentColor' : 'none'}
                  className={i < project.stars ? 'star-on' : 'star-off'}
                />
              ))}
              <span className="star-count">{project.stars}/5</span>
            </div>

            {/* ── Body ── */}
            <div className="mission-body">
              <p className="mission-subtitle-text">{project.subtitle}</p>
              <h3 className="mission-title">{project.title}</h3>
              <p className="mission-desc">{project.description}</p>

              {/* Expandable objectives */}
              <div className={`mission-details ${activeProject === project.id ? 'expanded' : ''}`}>
                <h4><Shield size={13} /> OBJECTIVES</h4>
                <ul>
                  {project.details.map((d, i) => (
                    <li key={i}><ChevronRight size={13} />{d}</li>
                  ))}
                </ul>
              </div>

              <div className="mission-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="mission-tag">{tag}</span>
                ))}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="mission-footer">
              {project.banners.length > 1 ? (
                <button 
                  className={`btn-game btn-${project.diffColor} mission-btn w-full`} 
                  onClick={(e) => { e.stopPropagation(); setSelectedGallery(project); }}
                >
                  <ExternalLink size={16} /> VIEW ALL POSTERS
                </button>
              ) : (
                <>
                  <a href="#" className="btn-game btn-yellow mission-btn" onClick={e => e.stopPropagation()}>
                    <Code2 size={16} /> CODE
                  </a>
                  <a href="#" className="btn-game btn-green mission-btn" onClick={e => e.stopPropagation()}>
                    <ExternalLink size={16} /> DEMO
                  </a>
                </>
              )}
            </div>

            <Trophy className="mission-trophy-bg" size={110} />
          </div>
        ))}
      </div>

      {/* ── FULL SCREEN GALLERY MODAL ── */}
      {selectedGallery && (
        <div className="gallery-modal-overlay" onClick={() => setSelectedGallery(null)}>
          <div className="gallery-modal-content panel-game" onClick={e => e.stopPropagation()}>
            <div className="gallery-modal-header">
              <h3>{selectedGallery.title} - Full Gallery</h3>
              <button className="btn-game btn-red close-btn" onClick={() => setSelectedGallery(null)}>X</button>
            </div>
            <div className="gallery-modal-grid">
              {selectedGallery.banners.map((imgSrc, i) => (
                <div key={i} className="gallery-img-wrapper">
                  <img src={imgSrc} alt={`${selectedGallery.title} ${i+1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
