import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Mail, Star, Shield, Sparkles, Code2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const Hero = () => {
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('skills');

  useEffect(() => {
    supabase.from('profile').select('*').eq('id', 1).single()
      .then(({ data }) => { if (data) setProfile(data); });
    supabase.from('skills').select('*').limit(6).order('created_at', { ascending: true })
      .then(({ data, error }) => { 
        if (error) console.error('Error fetching skills:', error);
        if (data) setSkills(data); 
      });
  }, []);

  const tabs = [
    { id: 'about', label: 'អំពីខ្ញុំ', icon: <Shield size={14}/> },
    { id: 'skills', label: 'ជំនាញ', icon: <Code2 size={14}/> },
    { id: 'contact', label: 'ទំនាក់ទំនង', icon: <Mail size={14}/> },
  ];

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-12 px-6">
      {/* Aurora blobs */}
      <div className="aurora-blob w-96 h-96" style={{ top: '5%', left: '-10%', background: 'rgba(124,58,237,0.35)' }} />
      <div className="aurora-blob w-80 h-80" style={{ bottom: '10%', right: '-8%', background: 'rgba(6,182,212,0.3)' }} />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-center">

          {/* LEFT: Text Content */}
          <div>
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 pill pill-green mb-6">
              <span className="glow-dot w-2 h-2"></span>
              {profile?.status_text || 'ត្រៀមខ្លួនរួចរាល់'}
            </div>

            {/* Headline */}
            <h1 className="font-black mb-4 leading-none" style={{ fontFamily: 'Outfit,sans-serif', fontSize: 'clamp(2.8rem,7vw,5.5rem)' }}>
              <span className="gradient-text">{profile?.full_name || 'ពុយវង្ស ហេង'}</span>
            </h1>

            {/* Role */}
            <p className="text-lg font-semibold mb-4" style={{ color: '#6b7db3' }}>
              {profile?.role || 'Full-Stack Developer & UI Designer'}
            </p>

            {/* Description */}
            <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(240,244,255,0.6)', fontWeight: 500 }}>
              {profile?.description || 'ចូលចិត្តបច្ចេកវិទ្យា និង វិទ្យាសាស្ត្រកុំព្យូទ័រ។ ពូកែខាងសរសេរកូដ វិភាគ និង ធ្វើការជាក្រុម។'}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#projects" className="btn-modern btn-holo btn-float text-base px-8 py-4">
                ⚔️ បេសកកម្ម <ArrowRight size={18} />
              </a>
              <a href="#contact" className="btn-modern btn-neon text-base px-8 py-4">
                <Mail size={18} /> ទំនាក់ទំនង
              </a>
              <a href="#about" className="btn-modern btn-amber text-base px-7 py-4">
                📊 ស្ថិតិ
              </a>
            </div>

            {/* Bento stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'កម្រិត', value: profile?.level || '22', accent: '#a78bfa' },
                { label: 'ចំណាត់ថ្នាក់', value: profile?.ranking || '🏆 1,200+', accent: '#fcd34d' },
                { label: 'ស្ថានភាព', value: profile?.status_text || '✅ ត្រៀម', accent: '#6ee7b7' },
              ].map((s, i) => (
                <div key={i} className="stat-chip">
                  <p className="section-label mb-1">{s.label}</p>
                  <p className="font-black text-lg" style={{ color: s.accent, fontFamily: 'Outfit,sans-serif' }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Profile Card */}
          <div className="glass-elevated p-6 relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)' }} />

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden"
                  style={{ border: '2px solid rgba(124,58,237,0.4)', boxShadow: '0 0 24px rgba(124,58,237,0.3)' }}>
                  <img src={profile?.avatar_url || "/avatar.png"} alt="Puyvong Heng" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', border: '2px solid #0d1420' }}>
                  <Star size={14} fill="white" stroke="none" />
                </div>
              </div>
              <div>
                <h3 className="font-black text-lg gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>{profile?.full_name || 'ពុយវង្ស ហេង'}</h3>
                <p className="text-sm font-semibold" style={{ color: '#6b7db3' }}>{profile?.role || 'Full-Stack Dev & Designer'}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={12} style={{ color: '#a78bfa' }} />
                  <span className="text-xs font-semibold" style={{ color: '#6b7db3' }}>{profile?.location || 'Banteay Meanchey, KH'}</span>
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Tabs */}
            <div className="flex gap-1 mb-4 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`tab-modern flex items-center gap-1.5 flex-1 justify-center ${activeTab === tab.id ? 'active' : ''}`}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'about' && (
              <div className="space-y-3">
                <div className="glass p-3 rounded-xl">
                  <p className="section-label mb-1">ការពិពណ៌នា</p>
                  <p className="text-sm font-medium" style={{ color: 'rgba(240,244,255,0.7)', lineHeight: 1.7 }}>
                    {profile?.description || 'ចូលចិត្តបច្ចេកវិទ្យា ពូកែខាងសរសេរកូដ និង ធ្វើការជាក្រុម។'}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="glass p-3 rounded-xl text-center">
                    <p className="section-label">ទីតាំង</p>
                    <p className="text-sm font-bold mt-1" style={{ color: '#f0f4ff' }}>🇰🇭 Cambodia</p>
                  </div>
                  <div className="glass p-3 rounded-xl text-center">
                    <p className="section-label">ភាសា</p>
                    <p className="text-sm font-bold mt-1" style={{ color: '#f0f4ff' }}>🇰🇭 ខ្មែរ, EN</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {skills.length === 0 ? (
                  <p className="text-center text-sm py-4" style={{ color: '#6b7db3' }}>
                    <Sparkles size={20} className="mx-auto mb-1 opacity-40" />
                    មិនទាន់មានជំនាញ → Admin
                  </p>
                ) : skills.map((s, i) => (
                  <div key={i} className="glass flex items-center gap-3 p-2.5 rounded-xl">
                    <div className="rank-badge">{i + 1}</div>
                    {s.icon && (
                      <img src={s.icon.startsWith('http') ? s.icon : `/icons/${s.icon}.svg`} alt={s.label} className="w-6 h-6 object-contain rounded"
                        onError={e => { e.target.style.display='none'; }} />
                    )}
                    <span className="text-sm font-bold" style={{ color: '#f0f4ff' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-2">
                {[
                  { icon: '📧', label: 'អ៊ីមែល', value: profile?.email || 'vongheng2019@gmail.com' },
                  { icon: '📞', label: 'ទូរស័ព្ទ', value: profile?.phone || '069717070' },
                ].map((item, i) => (
                  <div key={i} className="glass flex items-center gap-3 p-3 rounded-xl">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="section-label">{item.label}</p>
                      <p className="text-sm font-bold" style={{ color: '#f0f4ff' }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;