import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Moon, Sun, User } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  // Website ka main accent color badalne ke liye
  const changeThemeColor = (color) => {
    document.documentElement.style.setProperty('--accent', color);
  };

  const THEMES = [
    { name: 'Purple', hex: '#aa3bff' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Orange', hex: '#f59e0b' },
    { name: 'Red', hex: '#ef4444' }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#111111]/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-black flex items-center gap-2 transition-colors duration-300" style={{ color: 'var(--accent)' }}>
          <ShieldCheck size={28} /> TrustLocal
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          
          {/* Multi-Color Theme Picker */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            {THEMES.map((t) => (
              <button
                key={t.name}
                onClick={() => changeThemeColor(t.hex)}
                className="w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 shadow-sm hover:scale-125 transition-all"
                style={{ backgroundColor: t.hex }}
              />
            ))}
          </div>

          {/* LIGHT/DARK TOGGLE BUTTON */}
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="flex items-center gap-2">
            <Link 
              to="/auth" 
              className="text-white px-6 py-2.5 rounded-xl font-bold shadow-lg hover:opacity-90 transition flex items-center gap-2"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <User size={18} /> Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;