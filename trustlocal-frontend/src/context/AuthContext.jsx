import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem('trustLocalUser');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setUser(parsedData.user); 
      } catch (err) {
        localStorage.removeItem('trustLocalUser');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      // Backend should return { token, user: { name, role, ... } }
      localStorage.setItem('trustLocalUser', JSON.stringify(response.data));
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  };

  const register = async (userData) => {
    try {
      const response = await API.post('/auth/register', userData);
      localStorage.setItem('trustLocalUser', JSON.stringify(response.data));
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trustLocalUser');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, 
      isProvider: user?.role === 'provider',
      isAdmin: user?.role === 'admin' 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);