import React, { createContext, useState, useContext, useEffect } from 'react';

// Context Create karna
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (on Page Load)
  useEffect(() => {
    const savedUser = localStorage.getItem('trustLocalUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login Function
  const login = (userData) => {
    // userData mein: { name, email, role: 'user' | 'provider', token }
    setUser(userData);
    localStorage.setItem('trustLocalUser', JSON.stringify(userData));
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('trustLocalUser');
    window.location.href = '/login'; // Redirect to login
  };

  // Helper: Check if User is Provider
  const isProvider = user?.role === 'provider';

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isProvider }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom Hook use karne ke liye
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};