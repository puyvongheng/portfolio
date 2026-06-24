import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, X, FolderKanban } from 'lucide-react';

const EMPTY_FORM = { title: '', subtitle: '', description: '', difficulty: 'COMMON', status: 'ONGOING', image_url: '' };

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setProjects(data || []);
    setLoading(false);
  };

  const openModal = (project = null) => {
    setCurrentProject(project);
    setFormData(project ? { title: project.title, subtitle: project.subtitle, description: project.description, difficulty: project.difficulty, status: project.status, image_url: project.image_url || '' } : EMPTY_FORM);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = currentProject
      ? await supabase.from('projects').update(formData).eq('id', currentProject.id)
      : await supabase.from('projects').insert([formData]);
    if (error) alert('Error: ' + error.message);
    else { setIsModalOpen(false); fetchProjects(); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('លុបបេសកកម្មនេះ?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) alert('Error: ' + error.message);
    else fetchProjects();
  };

  const diffColors = { LEGENDARY: '#f59e0b', EPIC: '#a78bfa', RARE: '#67e8f9', COMMON: '#6ee7b7' };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-2xl gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>🗺️ គ្រប់គ្រងបេសកកម្ម</h2>
          <p className="text-sm font-semibold mt-1" style={{ color: '#6b7db3' }}>{projects.length} បេសកកម្ម</p>
        </div>
        <button onClick={() => openModal()} className="btn-modern btn-violet py-2.5 px-5 text-sm">
          <Plus size={16} /> បន្ថែមថ្មី
        </button>
      </div>

      <div className="glass-elevated overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <p className="gradient-text font-black text-xl">កំពុងផ្ទុក...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center">
            <FolderKanban size={40} className="mx-auto mb-3" style={{ color: '#6b7db3' }} />
            <p className="font-bold" style={{ color: '#6b7db3' }}>មិនទាន់មានបេសកកម្ម</p>
          </div>
        ) : (
          <div>
            {projects.map((proj, i) => {
              const dc = diffColors[proj.difficulty?.toUpperCase()] || '#6ee7b7';
              return (
                <div key={proj.id} className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="rank-badge shrink-0">#{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black truncate" style={{ color: '#f0f4ff', fontFamily: 'Outfit,sans-serif' }}>{proj.title}</p>
                    <p className="text-xs font-semibold truncate" style={{ color: '#6b7db3' }}>{proj.subtitle}</p>
                  </div>
                  <span className="pill shrink-0" style={{ background: `${dc}15`, color: dc, border: `1px solid ${dc}30` }}>
                    {proj.difficulty}
                  </span>
                  <span className="pill shrink-0" style={{ background: proj.status === 'COMPLETED' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: proj.status === 'COMPLETED' ? '#6ee7b7' : '#fcd34d', border: `1px solid ${proj.status === 'COMPLETED' ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}` }}>
                    {proj.status === 'COMPLETED' ? '✅' : '⏳'} {proj.status}
                  </span>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => openModal(proj)} className="btn-modern btn-ghost p-2">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(proj.id)} className="btn-modern btn-ghost p-2" style={{ color: '#f87171' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="glass-elevated w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-black text-xl gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>
                {currentProject ? '✏️ កែបេសកកម្ម' : '➕ បន្ថែមបេសកកម្ម'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: '#6b7db3' }}>
                <X size={22} />
              </button>
            </div>

            <form id="proj-form" onSubmit={handleSubmit} className="p-5 space-y-4">
              {[{ name: 'title', label: 'ចំណងជើង' }, { name: 'subtitle', label: 'ចំណងជើងរង' }].map(f => (
                <div key={f.name}>
                  <label className="section-label block mb-2">{f.label}</label>
                  <input type="text" name={f.name} value={formData[f.name]}
                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    className="input-modern" required />
                </div>
              ))}
              <div>
                <label className="section-label block mb-2">តំណភ្ជាប់រូបភាព (Image URL)</label>
                <input type="text" name="image_url" value={formData.image_url}
                  onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                  className="input-modern" placeholder="https://imgur.com/... / https://...png" />
                {formData.image_url && (
                  <div className="mt-3 p-1 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                    <img src={formData.image_url} alt="Preview" className="w-full h-32 object-cover rounded-lg" 
                         onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}
              </div>
              <div>
                <label className="section-label block mb-2">ការពិពណ៌នា</label>
                <textarea name="description" value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  rows="3" className="input-modern resize-none" required></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label block mb-2">ភាពពិបាក</label>
                  <select name="difficulty" value={formData.difficulty}
                    onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
                    className="select-modern">
                    {['COMMON','RARE','EPIC','LEGENDARY'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="section-label block mb-2">ស្ថានភាព</label>
                  <select name="status" value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                    className="select-modern">
                    {['ONGOING','COMPLETED'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </form>

            <div className="flex justify-end gap-3 p-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => setIsModalOpen(false)} className="btn-modern btn-ghost text-sm py-2.5 px-5">បោះបង់</button>
              <button type="submit" form="proj-form" className="btn-modern btn-violet text-sm py-2.5 px-5">💾 រក្សាទុក</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
