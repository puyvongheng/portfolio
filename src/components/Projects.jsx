import React, { useState, useEffect } from 'react';
import { ExternalLink, Code2, Trophy, Star, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const diffMeta = {
  LEGENDARY: { color: '#f59e0b', pill: 'pill-amber', label: 'LEGENDARY' },
  EPIC:      { color: '#a78bfa', pill: 'pill-violet', label: 'EPIC' },
  RARE:      { color: '#67e8f9', pill: 'pill-cyan',   label: 'RARE' },
  COMMON:    { color: '#6ee7b7', pill: 'pill-green',  label: 'COMMON' },
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    supabase.from('projects').select('*').order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setProjects(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <section id="projects" className="py-20 px-6 text-center">
      <div className="glass-elevated max-w-sm mx-auto p-10">
        <p className="gradient-text font-black text-2xl">កំពុងផ្ទុក...</p>
      </div>
    </section>
  );

  return (
    <section id="projects" className="py-20 px-6 relative">
      {/* Aurora blob */}
      <div className="aurora-blob w-72 h-72 pointer-events-none"
        style={{ top: '30%', right: '-5%', background: 'rgba(6,182,212,0.2)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">MISSIONS</p>
          <h2 className="text-4xl md:text-5xl font-black gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>
            ជ្រើសរើសបេសកកម្ម
          </h2>
          <p className="mt-3 font-medium" style={{ color: '#6b7db3' }}>ចុចលើកាតដើម្បីមើលព័ត៌មានបន្ថែម</p>
        </div>

        {projects.length === 0 ? (
          <div className="glass-elevated p-16 text-center">
            <Sparkles size={40} className="mx-auto mb-4" style={{ color: '#6b7db3' }} />
            <p className="font-black text-xl" style={{ color: '#6b7db3' }}>មិនទាន់មានបេសកកម្ម → Admin</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project, idx) => {
              const meta = diffMeta[project.difficulty?.toUpperCase()] || diffMeta.COMMON;
              const isOpen = selected === project.id;
              return (
                <div key={project.id} className="glow-card overflow-hidden">
                  {/* Main row */}
                  <button
                    className="w-full flex items-center gap-4 p-5 text-left transition-all"
                    style={{ background: isOpen ? 'rgba(124,58,237,0.05)' : 'rgba(13,20,32,0.9)' }}
                    onClick={() => setSelected(isOpen ? null : project.id)}>

                    {/* Rank */}
                    <div className="rank-badge shrink-0 w-9 h-9 text-base">#{idx + 1}</div>

                    {/* Diff icon */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}>
                      <Trophy size={20} style={{ color: meta.color }} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-lg truncate" style={{ color: '#f0f4ff', fontFamily: 'Outfit,sans-serif' }}>
                        {project.title}
                      </h3>
                      <p className="text-sm font-semibold truncate" style={{ color: '#6b7db3' }}>{project.subtitle}</p>
                    </div>

                    {/* Meta */}
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                      <span className={`pill ${meta.pill}`}>{meta.label}</span>
                      <span className={`pill ${project.status === 'COMPLETED' ? 'pill-green' : 'pill-amber'}`}>
                        {project.status === 'COMPLETED' ? '✅ រួចរាល់' : '⏳ កំពុងធ្វើ'}
                      </span>
                    </div>

                    {/* Stars */}
                    <div className="hidden md:flex gap-0.5 shrink-0">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={14} fill={s <= (project.stars || 4) ? '#f59e0b' : 'none'} stroke="#6b7db3" />
                      ))}
                    </div>

                    {/* Toggle */}
                    <div style={{ color: '#6b7db3' }} className="shrink-0">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {/* Expanded */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1" style={{ background: 'rgba(124,58,237,0.04)', borderTop: '1px solid rgba(124,58,237,0.1)' }}>
                      {project.image_url && (
                        <div className="mb-4 mt-2 rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                          <img src={project.image_url} alt={project.title} className="w-full h-48 sm:h-64 object-cover" />
                        </div>
                      )}
                      <p className="text-sm font-medium leading-relaxed mb-4" style={{ color: 'rgba(240,244,255,0.65)' }}>
                        {project.description}
                      </p>
                      <div className="flex gap-3">
                        <button className="btn-modern btn-violet text-sm py-2.5 px-5">
                          <Code2 size={15} /> កូដ
                        </button>
                        <button className="btn-modern btn-cyan text-sm py-2.5 px-5">
                          <ExternalLink size={15} /> សាកល្បង
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
