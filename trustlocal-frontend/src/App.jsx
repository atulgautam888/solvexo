import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Services from './pages/Services';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // FORCE LIGHT/DARK MODE LOGIC
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      {/* Background reset: bg-white for light mode, dark:bg-[#111111] for dark mode */}
      <div className="min-h-screen bg-white text-slate-900 dark:bg-[#111111] dark:text-slate-100 transition-colors duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
    </Router>
  );
}