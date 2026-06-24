import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { LayoutDashboard, FolderKanban, Wrench, LogOut, Zap, ChevronRight } from 'lucide-react';
import ProjectsManager from '../components/admin/ProjectsManager';
import SkillsManager from '../components/admin/SkillsManager';
import ProfileManager from '../components/admin/ProfileManager';
import EducationManager from '../components/admin/EducationManager';
import ContactsManager from '../components/admin/ContactsManager';
import { User, GraduationCap, Link } from 'lucide-react';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/login');
      else setUser(session.user);
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-elevated p-10 text-center">
        <p className="gradient-text font-black text-2xl">កំពុងផ្ទុក...</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'ផ្ទាំងគ្រប់គ្រង', icon: <LayoutDashboard size={16}/> },
    { id: 'profile', label: 'ប្រវត្តិរូប', icon: <User size={16}/> },
    { id: 'education', label: 'ការអប់រំ', icon: <GraduationCap size={16}/> },
    { id: 'projects', label: 'គម្រោង', icon: <FolderKanban size={16}/> },
    { id: 'skills', label: 'ជំនាញ', icon: <Wrench size={16}/> },
    { id: 'contacts', label: 'ទំនាក់ទំនង', icon: <Link size={16}/> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileManager />;
      case 'education': return <EducationManager />;
      case 'contacts': return <ContactsManager />;
      case 'projects': return <ProjectsManager />;
      case 'skills': return <SkillsManager />;
      default:
        return (
          <div className="space-y-6">
            {/* Welcome */}
            <div className="glass-elevated p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', boxShadow: '0 8px 24px rgba(124,58,237,0.3)' }}>
                  <Zap size={24} fill="white" stroke="white" />
                </div>
                <div>
                  <h2 className="font-black text-2xl gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>
                    ស្វាគមន៍!
                  </h2>
                  <p className="text-sm font-semibold" style={{ color: '#6b7db3' }}>{user.email}</p>
                </div>
              </div>
            </div>

            {/* Quick cards */}
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: 'profile',   icon: <User size={24}/>,          title: 'ប្រវត្តិរូប', desc: 'កែប្រែព័ត៌មានផ្ទាល់ខ្លួន', accent: '#f59e0b' },
                { id: 'education', icon: <GraduationCap size={24}/>, title: 'ការអប់រំ', desc: 'ប្រវត្តិការសិក្សា',    accent: '#10b981' },
                { id: 'contacts',  icon: <Link size={24}/>,          title: 'ទំនាក់ទំនង', desc: 'បណ្ដាញសង្គម',       accent: '#ec4899' },
                { id: 'projects',  icon: <FolderKanban size={24}/>,  title: 'គម្រោង', desc: 'គ្រប់គ្រងបេសកកម្ម', accent: '#7c3aed' },
                { id: 'skills',    icon: <Wrench size={24}/>,        title: 'ជំនាញ', desc: 'គ្រប់គ្រងជំនាញ',    accent: '#06b6d4' },
              ].map(card => (
                <button key={card.id} onClick={() => setActiveTab(card.id)}
                  className="glass-elevated p-6 text-left group hover:scale-[1.02] transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ background: `${card.accent}20`, border: `1px solid ${card.accent}30`, color: card.accent }}>
                      {card.icon}
                    </div>
                    <ChevronRight size={20} style={{ color: '#6b7db3' }} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-black text-lg mb-1" style={{ color: '#f0f4ff', fontFamily: 'Outfit,sans-serif' }}>{card.title}</h3>
                  <p className="text-sm font-medium" style={{ color: '#6b7db3' }}>{card.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <SEO title="ផ្ទាំងគ្រប់គ្រង" description="Admin Dashboard" />

      {/* Topbar */}
      <header className="sticky top-0 z-50" style={{
        background: 'rgba(8,12,20,0.9)', backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>
              <Zap size={16} fill="white" stroke="white" />
            </div>
            <span className="font-black gradient-text" style={{ fontFamily: 'Outfit,sans-serif' }}>⚔️ Command Center</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium hidden sm:block" style={{ color: '#6b7db3' }}>{user.email}</span>
            <button onClick={handleLogout} className="btn-modern btn-ghost text-sm py-2 px-4">
              <LogOut size={15} /> ចាកចេញ
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Tab bar */}
        <div className="flex gap-2 mb-8 p-1.5 rounded-2xl w-fit"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`tab-modern flex items-center gap-2 px-5 py-2.5 ${activeTab === tab.id ? 'active' : ''}`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;
