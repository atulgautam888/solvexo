import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Moon, Sun, User, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Auth context import kiya

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Color change function with LocalStorage
  const changeThemeColor = (color) => {
    document.documentElement.style.setProperty('--accent', color);
    localStorage.setItem('accentColor', color);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const THEMES = [
    { name: 'Purple', hex: '#aa3bff' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Orange', hex: '#f59e0b' },
    { name: 'Red', hex: '#ef4444' }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0a0a0a]/80 border-b border-slate-200 dark:border-slate-800 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-black flex items-center gap-2 transition-colors duration-300" style={{ color: 'var(--accent)' }}>
          <ShieldCheck size={28} /> TrustLocal
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Multi-Color Picker */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            {THEMES.map((t) => (
              <button
                key={t.name}
                onClick={() => changeThemeColor(t.hex)}
                className="w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 shadow-sm hover:scale-125 transition-all"
                style={{ backgroundColor: t.hex }}
                title={t.name}
              />
            ))}
          </div>

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Auth Conditional Rendering */}
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-3 md:pl-6">
            {user ? (
              // Agar user logged in hai
              <div className="flex items-center gap-4">
                <Link 
                  to={user.role === 'provider' ? '/provider-dashboard' : '/user-dashboard'}
                  className="hidden md:flex items-center gap-2 text-sm font-black text-slate-600 dark:text-slate-300 hover:opacity-80"
                >
                  <LayoutDashboard size={18} /> My Dashboard
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-100 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              // Agar user logged in nahi hai
              <>
                <Link 
                  to="/login" 
                  className="hidden md:flex items-center gap-2 font-bold text-slate-600 dark:text-slate-300 hover:opacity-80 transition"
                >
                  <User size={18} /> Sign In
                </Link>
                
                <Link 
                  to="/register" 
                  className="text-white px-5 py-2.5 rounded-xl font-bold shadow-lg hover:opacity-90 transition flex items-center gap-2 text-sm"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  <UserPlus size={18} /> Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;