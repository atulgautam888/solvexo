import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // AuthContext use karenge
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
import Profile from './pages/Profile';
import ProviderProfile from './pages/ProviderProfile';
import About from './pages/About';

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black italic text-[var(--accent)] animate-pulse">VERIFYING ACCESS...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // Role match nahi kiya toh Home bhej do
  }

  return children;
};

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
      <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-[#070707]">
        
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main className="flex-grow">
          <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/provider/:id" element={<ProviderProfile />} />
            <Route path="/about" element={<About />} />

            {/* PROTECTED USER ROUTES */}
            <Route path="/user-dashboard" element={
              <ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>
            } />
            <Route path="/booking/:id" element={
              <ProtectedRoute allowedRoles={['user']}><BookingPage /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile /></ProtectedRoute> 
            } />

            {/* PROTECTED PROVIDER ROUTES */}
            <Route path="/provider-dashboard" element={
              <ProtectedRoute allowedRoles={['provider']}><ProviderDashboard /></ProtectedRoute>
            } />

            {/* PROTECTED ADMIN ROUTES */}
            <Route path="/admin-dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
            } />

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}