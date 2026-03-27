import axios from 'axios';

// 1. Axios ka instance create karna
const API = axios.create({
  // Aapke Backend ka URL (Phase 2 mein hum yahi use karenge)
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Har request se pehle Token check karna
API.interceptors.request.use(
  (config) => {
    // LocalStorage se user data nikalna
    const savedUser = localStorage.getItem('trustLocalUser');
    
    if (savedUser) {
      const { token } = JSON.parse(savedUser);
      // Agar token hai, toh use Headers mein add kar dena
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Error handling ke liye
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Agar Backend 401 (Unauthorized) bhejta hai, toh user ko logout kar dena
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('trustLocalUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;