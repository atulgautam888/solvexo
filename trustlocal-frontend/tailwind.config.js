/** @type {import('tailwindcss').Config} */
export default {
  // 1. Class-based dark mode enable (Manual toggle ke liye)
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      // 2. Custom Brand Colors with CSS Variable Support
      colors: {
        // Ab 'accent' variable se connect hai, jo Navbar se control hoga
        accent: 'var(--accent)', 
        darkBg: '#111111', 
        lightBg: '#ffffff',
        // Dark mode ke liye specific slate colors
        cardDark: '#161616',
      },
      
      // 3. Ultra-Smooth Animations
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      // 4. Custom VIP Shadows using the accent variable
      boxShadow: {
        'vip': '0 20px 40px -12px rgba(var(--accent-rgb), 0.2)',
        'vip-hover': '0 30px 60px -12px rgba(var(--accent-rgb), 0.3)',
      }
    },
  },
  plugins: [],
}