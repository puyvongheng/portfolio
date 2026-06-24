import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, X, Wrench } from 'lucide-react';

const EMPTY_FORM = { label: '', icon: '', category: 'Frontend / Backend' };

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('skills').select('*').order('created_at', { ascending: false });
    if (!error) setSkills(data || []);
    setLoading(false);
  };

  const openModal = (skill = null) => {
    setCurrentSkill(skill);
    setFormData(skill ? { label: skill.label, icon: skill.icon || '', category: skill.category } : EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = currentSkill
      ? await supabase.from('skills').update(formData).eq('id', currentSkill.id)
      : await supabase.from('skills').insert([formData]);
    if (error) alert('Error: ' + error.message);
    else { setIsModalOpen(false); fetchSkills(); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('លុបជំនាញនេះ?')) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) alert('Error: ' + error.message);
    else fetchSkills();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-2xl gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>⚔️ គ្រប់គ្រងជំនាញ</h2>
          <p className="text-sm font-semibold mt-1" style={{ color: '#6b7db3' }}>{skills.length} ជំនាញ</p>
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
        ) : skills.length === 0 ? (
          <div className="p-12 text-center">
            <Wrench size={40} className="mx-auto mb-3" style={{ color: '#6b7db3' }} />
            <p className="font-bold" style={{ color: '#6b7db3' }}>មិនទាន់មានជំនាញ</p>
          </div>
        ) : (
          <div>
            {skills.map((skill, i) => (
              <div key={skill.id} className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="rank-badge shrink-0">#{i + 1}</div>
                {skill.icon && (
                  <img src={skill.icon.startsWith('http') ? skill.icon : `/icons/${skill.icon}.svg`} alt={skill.label}
                    className="w-8 h-8 object-contain shrink-0 rounded"
                    onError={e => { e.target.style.display='none'; }} />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-black" style={{ color: '#f0f4ff', fontFamily: 'Outfit,sans-serif' }}>{skill.label}</p>
                  <p className="text-xs font-semibold" style={{ color: '#6b7db3' }}>{skill.category}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openModal(skill)} className="btn-modern btn-ghost p-2">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="btn-modern btn-ghost p-2" style={{ color: '#f87171' }}>
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
                {currentSkill ? '✏️ កែជំនាញ' : '➕ បន្ថែមជំនាញ'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: '#6b7db3' }}>
                <X size={22} />
              </button>
            </div>

            <form id="skill-form" onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="section-label block mb-2">ឈ្មោះជំនាញ</label>
                <input type="text" name="label" value={formData.label}
                  onChange={e => setFormData({ ...formData, label: e.target.value })}
                  className="input-modern" placeholder="e.g. React" required />
              </div>
              <div>
                <label className="section-label block mb-2">ប្រភេទ</label>
                <select name="category" value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="select-modern">
                  <option value="Frontend / Backend">Frontend / Backend</option>
                  <option value="Design Tools">Design Tools</option>
                  <option value="Office Tools">Office Tools</option>
                </select>
              </div>
              <div>
                <label className="section-label block mb-2">ឈ្មោះរូបភាព SVG</label>
                <input type="text" name="icon" value={formData.icon}
                  onChange={e => setFormData({ ...formData, icon: e.target.value })}
                  className="input-modern" placeholder="e.g. react-icon (without .svg)" />
                <p className="text-xs font-medium mt-1" style={{ color: '#6b7db3' }}>
                  ឈ្មោះ SVG ក្នុង public/icons/ ឬ តំណភ្ជាប់រូបភាព URL (https://...)
                </p>
                {formData.icon && formData.icon.startsWith('http') && (
                  <div className="mt-3 p-1 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                    <img src={formData.icon} alt="Preview" className="w-16 h-16 object-contain rounded-lg mx-auto" 
                         onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}
              </div>
            </form>

            <div className="flex justify-end gap-3 p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => setIsModalOpen(false)} className="btn-modern btn-ghost text-sm py-2.5 px-5">បោះបង់</button>
              <button type="submit" form="skill-form" className="btn-modern btn-violet text-sm py-2.5 px-5">💾 រក្សាទុក</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;
