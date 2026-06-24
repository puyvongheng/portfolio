import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Lock, Mail, Eye, EyeOff, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate('/admin');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <SEO title="ចូលប្រព័ន្ធ" description="Admin Login" />
      {/* Aurora */}
      <div className="aurora-blob w-96 h-96" style={{ top: '-10%', left: '-10%', background: 'rgba(124,58,237,0.3)' }} />
      <div className="aurora-blob w-80 h-80" style={{ bottom: '-5%', right: '-8%', background: 'rgba(6,182,212,0.25)' }} />

      <div className="glass-elevated w-full max-w-md p-8 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', boxShadow: '0 8px 32px rgba(124,58,237,0.4)' }}>
            <Zap size={28} fill="white" stroke="white" />
          </div>
          <h1 className="font-black text-3xl gradient-text mb-1" style={{ fontFamily: 'Outfit,sans-serif' }}>
            ចូលប្រព័ន្ធ
          </h1>
          <p className="section-label">ADMIN ACCESS ONLY</p>
        </div>

        {error && (
          <div className="mb-5 p-4 rounded-2xl border text-sm font-semibold text-center"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="section-label block mb-2">អ៊ីមែល</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#6b7db3' }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="input-modern pl-11" placeholder="admin@example.com" required />
            </div>
          </div>

          <div>
            <label className="section-label block mb-2">ពាក្យសម្ងាត់</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#6b7db3' }} />
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                className="input-modern pl-11 pr-12" placeholder="••••••••" required />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#6b7db3' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="btn-modern btn-violet w-full py-4 text-base mt-2">
            {loading ? '🔄 កំពុងផ្ទៀងផ្ទាត់...' : '🔐 ចូល'}
          </button>
        </form>

        <div className="divider mt-6" />

        <div className="text-center">
          <button onClick={() => navigate('/')} className="btn-modern btn-ghost text-sm py-2.5 px-6">
            ← ត្រឡប់ទៅទំព័រដើម
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
