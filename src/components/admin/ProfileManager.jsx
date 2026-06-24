import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Save, User } from 'lucide-react';

const ProfileManager = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: 1,
    full_name: '',
    role: '',
    description: '',
    location: '',
    email: '',
    phone: '',
    status_text: '',
    level: 1,
    ranking: '',
    avatar_url: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('profile').select('*').eq('id', 1).single();
    if (!error && data) {
      setFormData(data);
    } else {
      // If no profile exists, maybe first time
      console.log("No profile found or error:", error?.message);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    // Upsert the profile (id: 1)
    const { error } = await supabase.from('profile').upsert([formData], { onConflict: 'id' });
    setSaving(false);
    if (error) {
      alert('Error saving profile: ' + error.message);
    } else {
      alert('✅ Profile saved successfully!');
    }
  };

  if (loading) {
    return <div className="p-12 text-center"><p className="gradient-text font-black text-xl">កំពុងផ្ទុក...</p></div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-black text-2xl gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>👤 គ្រប់គ្រងប្រវត្តិរូប (Profile)</h2>
          <p className="text-sm font-semibold mt-1" style={{ color: '#6b7db3' }}>កំណត់ព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នក</p>
        </div>
      </div>

      <div className="glass-elevated p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="section-label block mb-2">ឈ្មោះពេញ</label>
              <input type="text" name="full_name" value={formData.full_name}
                onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                className="input-modern w-full" placeholder="ពុយវង្ស ហេង" required />
            </div>
            <div>
              <label className="section-label block mb-2">តួនាទី (Role)</label>
              <input type="text" name="role" value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="input-modern w-full" placeholder="Full-Stack Developer..." required />
            </div>
          </div>

          <div>
            <label className="section-label block mb-2">ការពិពណ៌នាអំពីខ្លួនឯង</label>
            <textarea name="description" value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              rows="3" className="input-modern w-full resize-none" required></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="section-label block mb-2">កម្រិត (Level)</label>
              <input type="number" name="level" value={formData.level}
                onChange={e => setFormData({ ...formData, level: parseInt(e.target.value) || 0 })}
                className="input-modern w-full" placeholder="22" required />
            </div>
            <div>
              <label className="section-label block mb-2">ចំណាត់ថ្នាក់ (Ranking)</label>
              <input type="text" name="ranking" value={formData.ranking}
                onChange={e => setFormData({ ...formData, ranking: e.target.value })}
                className="input-modern w-full" placeholder="🏆 1,200+" required />
            </div>
            <div>
              <label className="section-label block mb-2">ស្ថានភាព (Status)</label>
              <input type="text" name="status_text" value={formData.status_text}
                onChange={e => setFormData({ ...formData, status_text: e.target.value })}
                className="input-modern w-full" placeholder="✅ ត្រៀមខ្លួនរួចរាល់" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="section-label block mb-2">ទីតាំង (Location)</label>
              <input type="text" name="location" value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="input-modern w-full" placeholder="Banteay Meanchey, KH" />
            </div>
            <div>
              <label className="section-label block mb-2">អ៊ីមែល (Email)</label>
              <input type="email" name="email" value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="input-modern w-full" placeholder="vongheng2019@gmail.com" />
            </div>
            <div>
              <label className="section-label block mb-2">ទូរស័ព្ទ (Phone)</label>
              <input type="text" name="phone" value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="input-modern w-full" placeholder="069717070" />
            </div>
          </div>

          <div>
            <label className="section-label block mb-2">តំណភ្ជាប់រូបភាពប្រវត្តិរូប (Avatar URL)</label>
            <input type="text" name="avatar_url" value={formData.avatar_url || ''}
              onChange={e => setFormData({ ...formData, avatar_url: e.target.value })}
              className="input-modern w-full" placeholder="https://imgur.com/..." />
            {formData.avatar_url && formData.avatar_url.startsWith('http') && (
              <div className="mt-3 p-1 w-24 h-24 rounded-2xl border" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
                <img src={formData.avatar_url} alt="Preview" className="w-full h-full object-cover rounded-xl" 
                     onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-end" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button type="submit" disabled={saving} className="btn-modern btn-violet text-sm py-3 px-8">
              {saving ? 'កំពុងរក្សាទុក...' : <><Save size={16} /> រក្សាទុក</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManager;
