import React, { useState, useEffect } from 'react';
import { Code2, Palette, Wrench, GraduationCap, BookOpen } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const About = () => {
  const [skillGroups, setSkillGroups] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    supabase.from('skills').select('*').order('created_at', { ascending: true }).then(({ data }) => {
      const grouped = {};
      (data || []).forEach(s => {
        if (!grouped[s.category]) grouped[s.category] = [];
        grouped[s.category].push(s);
      });
      setSkillGroups(Object.entries(grouped).map(([cat, items]) => ({
        label: cat,
        icon: cat.includes('Design') ? <Palette size={16}/> : cat.includes('Office') ? <Wrench size={16}/> : <Code2 size={16}/>,
        accent: cat.includes('Design') ? '#f59e0b' : cat.includes('Office') ? '#10b981' : '#7c3aed',
        items,
      })));
      setLoading(false);
    });
    supabase.from('education').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setEducation(data);
    });
  }, []);


  const tabs = [
    { id: 'skills', label: '⚔️ ជំនាញ' },
    { id: 'education', label: '🎓 ការអប់រំ' },
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">CHARACTER STATS</p>
          <h2 className="text-4xl md:text-5xl font-black gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>
            ស្ថិតិតួអង្គ
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 justify-center">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`btn-modern ${activeTab === t.id ? 'btn-holo btn-float' : 'btn-ghost'} text-base px-8 py-3.5`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-5">
            {loading ? (
              <div className="glass-elevated p-8 text-center">
                <p className="gradient-text text-xl font-black">កំពុងផ្ទុក...</p>
              </div>
            ) : skillGroups.length === 0 ? (
              <div className="glass-elevated p-12 text-center">
                <p style={{ color: '#6b7db3' }} className="font-semibold">មិនទាន់មានជំនាញ — ចូល Admin ដើម្បីបន្ថែម</p>
              </div>
            ) : skillGroups.map((group, gi) => (
              <div key={gi} className="glass-elevated overflow-hidden">
                {/* Group header */}
                <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                    style={{ background: `${group.accent}20`, border: `1px solid ${group.accent}40`, color: group.accent }}>
                    {group.icon}
                  </div>
                  <h3 className="font-bold text-base" style={{ color: group.accent }}>{group.label}</h3>
                  <span className="pill ml-auto" style={{ background: `${group.accent}15`, color: group.accent, border: `1px solid ${group.accent}30` }}>
                    {group.items.length} ជំនាញ
                  </span>
                </div>
                {/* Skills grid */}
                <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {group.items.map((s, si) => (
                    <div key={si} className="glass flex items-center gap-3 p-3 rounded-2xl hover:scale-[1.02] transition-transform cursor-default">
                      <div className="rank-badge text-xs">{si + 1}</div>
                      {s.icon && (
                        <img src={s.icon.startsWith('http') ? s.icon : `/icons/${s.icon}.svg`} alt={s.label} className="w-6 h-6 object-contain rounded"
                          onError={e => { e.target.style.display='none'; }} />
                      )}
                      <span className="text-sm font-bold truncate" style={{ color: '#f0f4ff' }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-4">
            {education.map((e, i) => (
              <div key={i} className="glass-elevated flex items-center gap-6 p-6 group hover:scale-[1.01] transition-transform">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `${e.accent || '#7c3aed'}15`, border: `1px solid ${e.accent || '#7c3aed'}30`, color: e.accent || '#7c3aed' }}>
                  {e.icon_type === 'degree' ? <GraduationCap size={18}/> : <BookOpen size={18}/>}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="pill" style={{ background: `${e.accent || '#7c3aed'}15`, color: e.accent || '#7c3aed', border: `1px solid ${e.accent || '#7c3aed'}30` }}>
                      {e.year}
                    </span>
                  </div>
                  <h4 className="font-black text-lg" style={{ color: '#f0f4ff', fontFamily: 'Outfit,sans-serif' }}>{e.school}</h4>
                  <p className="text-sm font-semibold" style={{ color: '#6b7db3' }}>{e.degree}</p>
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${e.accent || '#7c3aed'}15`, color: e.accent || '#7c3aed', fontSize: '1.2rem' }}>
                  {e.icon_type === 'degree' ? '🎓' : '📘'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;