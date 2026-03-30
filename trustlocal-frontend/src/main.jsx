import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'react-hot-toast' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* Toaster ko AuthProvider ke andar rakha hai taaki har page par chale */}
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Global styling for TrustLocal
          duration: 4000,
          style: {
            background: '#161616',
            color: '#fff',
            borderRadius: '20px',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
            border: '1px solid #333'
          },
          success: {
            iconTheme: {
              primary: '#aa3bff',
              secondary: '#fff',
            },
          },
        }}
      />
      <App />
    </AuthProvider>
  </StrictMode>,
)