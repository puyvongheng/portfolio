import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, X, Link } from 'lucide-react';

const EMPTY_FORM = { platform_name: '', icon_url: '', link_url: '' };

const ContactsManager = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => { fetchLinks(); }, []);

  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('social_links').select('*').order('created_at', { ascending: true });
    if (!error) setLinks(data || []);
    setLoading(false);
  };

  const openModal = (link = null) => {
    setCurrentLink(link);
    setFormData(link ? { platform_name: link.platform_name, icon_url: link.icon_url, link_url: link.link_url } : EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = currentLink
      ? await supabase.from('social_links').update(formData).eq('id', currentLink.id)
      : await supabase.from('social_links').insert([formData]);
    if (error) alert('Error: ' + error.message);
    else { setIsModalOpen(false); fetchLinks(); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('លុបតំណភ្ជាប់នេះ?')) return;
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (error) alert('Error: ' + error.message);
    else fetchLinks();
  };

  const renderIconPreview = (iconStr) => {
    if (!iconStr) return <Link size={16} />;
    if (iconStr.startsWith('http')) {
      return <img src={iconStr} alt="icon" className="w-5 h-5 object-contain" onError={(e) => { e.target.style.display='none'; }} />;
    }
    // If it's an emoji or short text
    return <span className="text-xl">{iconStr}</span>;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-2xl gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>🔗 បណ្ដាញសង្គម</h2>
          <p className="text-sm font-semibold mt-1" style={{ color: '#6b7db3' }}>{links.length} តំណភ្ជាប់</p>
        </div>
        <button onClick={() => openModal()} className="btn-modern btn-violet py-2.5 px-5 text-sm">
          <Plus size={16} /> បន្ថែម
        </button>
      </div>

      <div className="glass-elevated overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <p className="gradient-text font-black text-xl">កំពុងផ្ទុក...</p>
          </div>
        ) : links.length === 0 ? (
          <div className="p-12 text-center">
            <Link size={40} className="mx-auto mb-3" style={{ color: '#6b7db3' }} />
            <p className="font-bold" style={{ color: '#6b7db3' }}>មិនទាន់មានបណ្ដាញសង្គម</p>
          </div>
        ) : (
          <div>
            {links.map((link, i) => (
              <div key={link.id} className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="rank-badge shrink-0">#{i + 1}</div>
                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {renderIconPreview(link.icon_url)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-base" style={{ color: '#f0f4ff', fontFamily: 'Outfit,sans-serif' }}>{link.platform_name}</p>
                  <p className="text-xs font-semibold truncate" style={{ color: '#6b7db3' }}>{link.link_url}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openModal(link)} className="btn-modern btn-ghost p-2">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(link.id)} className="btn-modern btn-ghost p-2" style={{ color: '#f87171' }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="glass-elevated w-full max-w-md overflow-hidden">
            <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-black text-xl gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>
                {currentLink ? '✏️ កែបណ្ដាញសង្គម' : '➕ បន្ថែមបណ្ដាញសង្គម'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: '#6b7db3' }}>
                <X size={22} />
              </button>
            </div>

            <form id="link-form" onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="section-label block mb-2">ឈ្មោះបណ្ដាញសង្គម (Platform)</label>
                <input type="text" name="platform_name" value={formData.platform_name}
                  onChange={e => setFormData({ ...formData, platform_name: e.target.value })}
                  className="input-modern" placeholder="e.g. TikTok, Facebook..." required />
              </div>
              <div>
                <label className="section-label block mb-2">តំណភ្ជាប់ប្រវត្តិរូប (Profile URL)</label>
                <input type="url" name="link_url" value={formData.link_url}
                  onChange={e => setFormData({ ...formData, link_url: e.target.value })}
                  className="input-modern" placeholder="https://..." required />
              </div>
              <div>
                <label className="section-label block mb-2">រូបតំណាង (Icon URL រឺ Emoji)</label>
                <input type="text" name="icon_url" value={formData.icon_url}
                  onChange={e => setFormData({ ...formData, icon_url: e.target.value })}
                  className="input-modern" placeholder="https://...png រឺ 📘" />
                <p className="text-xs font-medium mt-1" style={{ color: '#6b7db3' }}>
                  អាចដាក់ជារូបភាព (URL) រឺ Emoji រឺអក្សរក៏បាន
                </p>
                <div className="mt-3 p-3 rounded-xl border flex items-center justify-center gap-3" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                  <span className="text-sm" style={{ color: '#6b7db3' }}>មើលមុន (Preview): </span>
                  {renderIconPreview(formData.icon_url)}
                </div>
              </div>
            </form>

            <div className="flex justify-end gap-3 p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => setIsModalOpen(false)} className="btn-modern btn-ghost text-sm py-2.5 px-5">បោះបង់</button>
              <button type="submit" form="link-form" className="btn-modern btn-violet text-sm py-2.5 px-5">💾 រក្សាទុក</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsManager;
