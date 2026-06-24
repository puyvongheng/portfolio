import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, X, GraduationCap } from 'lucide-react';

const EMPTY_FORM = { year: '', school: '', degree: '', icon_type: 'degree', accent: '#7c3aed' };

const EducationManager = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEd, setCurrentEd] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => { fetchEducation(); }, []);

  const fetchEducation = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('education').select('*').order('created_at', { ascending: false });
    if (!error) setEducation(data || []);
    setLoading(false);
  };

  const openModal = (ed = null) => {
    setCurrentEd(ed);
    setFormData(ed ? { year: ed.year, school: ed.school, degree: ed.degree, icon_type: ed.icon_type, accent: ed.accent || '#7c3aed' } : EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = currentEd
      ? await supabase.from('education').update(formData).eq('id', currentEd.id)
      : await supabase.from('education').insert([formData]);
    if (error) alert('Error: ' + error.message);
    else { setIsModalOpen(false); fetchEducation(); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('លុបប្រវត្តិការអប់រំនេះ?')) return;
    const { error } = await supabase.from('education').delete().eq('id', id);
    if (error) alert('Error: ' + error.message);
    else fetchEducation();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-2xl gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>🎓 គ្រប់គ្រងការអប់រំ</h2>
          <p className="text-sm font-semibold mt-1" style={{ color: '#6b7db3' }}>{education.length} កំណត់ត្រា</p>
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
        ) : education.length === 0 ? (
          <div className="p-12 text-center">
            <GraduationCap size={40} className="mx-auto mb-3" style={{ color: '#6b7db3' }} />
            <p className="font-bold" style={{ color: '#6b7db3' }}>មិនទាន់មានប្រវត្តិការអប់រំ</p>
          </div>
        ) : (
          <div>
            {education.map((ed, i) => (
              <div key={ed.id} className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="rank-badge shrink-0" style={{ background: `${ed.accent}20`, color: ed.accent, borderColor: ed.accent }}>{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-black" style={{ color: '#f0f4ff', fontFamily: 'Outfit,sans-serif' }}>{ed.school}</p>
                  <p className="text-xs font-semibold" style={{ color: '#6b7db3' }}>{ed.degree} • {ed.year}</p>
                </div>
                <span className="pill shrink-0" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  {ed.icon_type === 'degree' ? '🎓' : '📘'} {ed.icon_type}
                </span>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openModal(ed)} className="btn-modern btn-ghost p-2">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(ed.id)} className="btn-modern btn-ghost p-2" style={{ color: '#f87171' }}>
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
                {currentEd ? '✏️ កែការអប់រំ' : '➕ បន្ថែមការអប់រំ'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: '#6b7db3' }}>
                <X size={22} />
              </button>
            </div>

            <form id="ed-form" onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="section-label block mb-2">ឆ្នាំ (Year)</label>
                <input type="text" name="year" value={formData.year}
                  onChange={e => setFormData({ ...formData, year: e.target.value })}
                  className="input-modern" placeholder="២០២២–បច្ចុប្បន្ន" required />
              </div>
              <div>
                <label className="section-label block mb-2">សាលា (School/University)</label>
                <input type="text" name="school" value={formData.school}
                  onChange={e => setFormData({ ...formData, school: e.target.value })}
                  className="input-modern" placeholder="សាកលវិទ្យាល័យជាតិមានជ័យ" required />
              </div>
              <div>
                <label className="section-label block mb-2">សញ្ញាបត្រ (Degree/Certificate)</label>
                <input type="text" name="degree" value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                  className="input-modern" placeholder="បរិញ្ញាបត្រ – ព័ត៌មានវិទ្យា" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label block mb-2">ប្រភេទរូបតំណាង</label>
                  <select name="icon_type" value={formData.icon_type}
                    onChange={e => setFormData({ ...formData, icon_type: e.target.value })}
                    className="select-modern">
                    <option value="degree">🎓 សាកលវិទ្យាល័យ</option>
                    <option value="diploma">📘 វិទ្យាល័យ/ផ្សេងៗ</option>
                  </select>
                </div>
                <div>
                  <label className="section-label block mb-2">ពណ៌ (Accent Color)</label>
                  <select name="accent" value={formData.accent}
                    onChange={e => setFormData({ ...formData, accent: e.target.value })}
                    className="select-modern">
                    <option value="#7c3aed">💜 ស្វាយ (#7c3aed)</option>
                    <option value="#06b6d4">💙 ខៀវ (#06b6d4)</option>
                    <option value="#10b981">💚 បៃតង (#10b981)</option>
                    <option value="#f59e0b">💛 លឿង (#f59e0b)</option>
                  </select>
                </div>
              </div>
            </form>

            <div className="flex justify-end gap-3 p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => setIsModalOpen(false)} className="btn-modern btn-ghost text-sm py-2.5 px-5">បោះបង់</button>
              <button type="submit" form="ed-form" className="btn-modern btn-violet text-sm py-2.5 px-5">💾 រក្សាទុក</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationManager;
