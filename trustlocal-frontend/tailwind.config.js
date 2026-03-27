/** @type {import('tailwindcss').Config} */
export default {
  // 1. Class-based dark mode enable (Manual toggle ke liye zaruri hai)
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // 2. Custom Brand Colors (TrustLocal Theme)
      colors: {
        accent: '#aa3bff', // Aapka signature VIP Purple
        darkBg: '#111111', // Pure Dark mode background
        lightBg: '#ffffff',
      },
      
      // 3. Ultra-Smooth Animations
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      // 4. Custom Glassmorphism Shadows
      boxShadow: {
        'vip': '0 32px 64px -16px rgba(170, 59, 255, 0.15)',
        'vip-hover': '0 32px 64px -16px rgba(170, 59, 255, 0.25)',
      }
    },
  },
  plugins: [],
}