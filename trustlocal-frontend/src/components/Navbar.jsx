import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, Moon, Sun, LogOut,
  LayoutDashboard, Search, Menu, X, Info, HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");

  // Color change function with LocalStorage persistence
  const changeThemeColor = (color) => {
    document.documentElement.style.setProperty('--accent', color);
    localStorage.setItem('accentColor', color);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  // --- MINI SEARCH HANDLER ---
  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/services?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch(""); // Clear search
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };

  const THEMES = [
    { name: 'Purple', hex: '#aa3bff' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Orange', hex: '#f59e0b' },
    { name: 'Red', hex: '#ef4444' }
  ];

  return (
    <nav className="sticky top-0 z-[100] backdrop-blur-md bg-white/80 dark:bg-[#0a0a0a]/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">

        {/* 1. LOGO */}
        <Link to="/" className="text-2xl font-black flex items-center gap-2 shrink-0 transition-colors duration-300" style={{ color: 'var(--accent)' }}>
          <ShieldCheck size={28} /> 
          <span className="hidden sm:inline italic tracking-tighter uppercase">TrustLocal</span>
        </Link>

        {/* 2. NAVIGATION LINKS (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 mx-4">
          <Link to="/services" className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-[var(--accent)] transition-all italic">
            Browse Experts
          </Link>
          <Link to="/about" className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-[var(--accent)] transition-all italic border-l border-slate-200 dark:border-slate-800 pl-6">
            About Team
          </Link>
        </div>

        {/* 3. MINI SEARCH BAR (Desktop) */}
        <form
          onSubmit={handleNavSearch}
          className="hidden md:flex flex-1 max-w-sm relative group mx-4"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent)] transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search Bhopal experts..."
            value={navSearch}
            onChange={(e) => setNavSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none border-2 border-transparent focus:border-[var(--accent)]/30 transition-all font-bold italic text-xs"
          />
        </form>

        <div className="flex items-center gap-2 md:gap-4">

          {/* Multi-Color Picker (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            {THEMES.map((t) => (
              <button
                key={t.name}
                onClick={() => changeThemeColor(t.hex)}
                className="w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 shadow-sm hover:scale-125 transition-all"
                style={{ backgroundColor: t.hex }}
                title={t.name}
              />
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* 4. AUTH / ACTIONS */}
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-2 md:pl-4">
            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <Link
                  to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'provider' ? '/provider-dashboard' : '/user-dashboard'}
                  className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[var(--accent)] transition-all italic"
                >
                  <LayoutDashboard size={16} /> 
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-100 transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 italic px-2"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="text-white px-4 py-2.5 rounded-xl font-black italic shadow-lg hover:opacity-90 transition-all text-[10px] uppercase tracking-tighter"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  Join Now
                </Link>
              </div>
            )}

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. MOBILE MENU & SEARCH */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top duration-300">
          <form onSubmit={handleNavSearch} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Find help in Bhopal..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none font-bold italic"
            />
          </form>

          <div className="flex flex-col gap-4 text-xs font-black uppercase tracking-widest italic">
            <Link to="/services" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <Search size={16} /> Browse All Experts
            </Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <Info size={16} /> About The Team
            </Link>
            {user && (
              <Link to={user.role === 'provider' ? '/provider-dashboard' : '/user-dashboard'} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                <LayoutDashboard size={16} /> My Dashboard
              </Link>
            )}
            
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <p className="text-[10px] text-slate-400 mb-4">SWITCH THEME COLOR</p>
              <div className="flex gap-4">
                {THEMES.map((t) => (
                  <button 
                    key={t.name} 
                    onClick={() => { changeThemeColor(t.hex); setIsMenuOpen(false); }} 
                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 shadow-lg" 
                    style={{ backgroundColor: t.hex }} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;