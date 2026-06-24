import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const Contact = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.from('social_links').select('*').order('created_at', { ascending: true })
      .then(({ data }) => { if (data) setSocialLinks(data); });
    
    supabase.from('profile').select('*').eq('id', 1).single()
      .then(({ data }) => { if (data) setProfile(data); });
  }, []);
  const contactItems = [
    { icon: '📧', label: 'អ៊ីមែល', value: profile?.email || 'vongheng2019@gmail.com', accent: '#7c3aed' },
    { icon: '📞', label: 'ទូរស័ព្ទ', value: profile?.phone || '069717070', accent: '#06b6d4' },
    { icon: '📍', label: 'ទីតាំង', value: profile?.location || 'Banteay Meanchey, KH', accent: '#10b981' },
  ];

  return (
    <section id="contact" className="py-20 px-6 relative">
      <div className="aurora-blob w-80 h-80 pointer-events-none"
        style={{ bottom: '5%', left: '-5%', background: 'rgba(236,72,153,0.15)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">CONTACT</p>
          <h2 className="text-4xl md:text-5xl font-black gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>
            ផ្ញើសញ្ញា
          </h2>
          <p className="mt-3 font-medium" style={{ color: '#6b7db3' }}>
            បច្ចុប្បន្នកំពុងស្វែងរកឱកាសថ្មីៗ និង កិច្ចសហការ 🤝
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Info */}
          <div className="space-y-4">
            {/* Status card */}
            <div className="glass-elevated flex items-center gap-4 p-5">
              <div className="glow-dot w-3 h-3 shrink-0"></div>
              <div>
                <p className="section-label">ស្ថានភាព</p>
                <p className="font-black text-lg" style={{ color: '#6ee7b7', fontFamily: 'Outfit,sans-serif' }}>
                  {profile?.status_text || 'អនឡាញ & ត្រៀមខ្លួន'}
                </p>
              </div>
            </div>

            {contactItems.map((item, i) => (
              <div key={i} className="glass-elevated flex items-center gap-4 p-5 hover:scale-[1.01] transition-transform">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${item.accent}10`, border: `1px solid ${item.accent}25` }}>
                  {item.icon}
                </div>
                <div>
                  <p className="section-label">{item.label}</p>
                  <p className="font-bold" style={{ color: '#f0f4ff' }}>{item.value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.link_url} target="_blank" rel="noreferrer"
                  className="btn-modern btn-ghost flex-1 py-3 px-4 text-sm flex items-center justify-center gap-2 min-w-[100px]"
                  title={s.platform_name}>
                  {s.icon_url && s.icon_url.startsWith('http') ? (
                    <img src={s.icon_url} alt={s.platform_name} className="w-5 h-5 object-contain" onError={(e) => { e.target.style.display='none'; }} />
                  ) : (
                    <span className="text-lg">{s.icon_url || '🔗'}</span>
                  )}
                  <span className="font-semibold">{s.platform_name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass-elevated p-6 space-y-4">
            <h3 className="font-black text-xl" style={{ color: '#f0f4ff', fontFamily: 'Outfit,sans-serif' }}>ផ្ញើសារ ✉️</h3>

            <div>
              <label className="section-label block mb-2">ឈ្មោះ</label>
              <input type="text" className="input-modern" placeholder="Enter your name" />
            </div>
            <div>
              <label className="section-label block mb-2">អ៊ីមែល</label>
              <input type="email" className="input-modern" placeholder="your@email.com" />
            </div>
            <div>
              <label className="section-label block mb-2">សារ</label>
              <textarea rows="4" className="input-modern resize-none" placeholder="Your message..."></textarea>
            </div>
            <button type="button" className="btn-modern btn-violet w-full py-3.5 text-base">
              📤 ផ្ញើ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;