import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
import ProviderDashboard from './pages/ProviderDashboard'; 
import UserDashboard from './pages/UserDashboard'; 
import BookingPage from './pages/BookingPage'; 
import Services from './pages/Services';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    const savedColor = localStorage.getItem('accentColor') || '#aa3bff';
    document.documentElement.style.setProperty('--accent', savedColor);
  }, []);

  return (
    <Router>
      {/* IMPORTANT: 
          Removed bg-white and dark:bg-[#111111] from here 
          to let index.css body styles work correctly.
      */}
      <div className="min-h-screen flex flex-col">
        
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}