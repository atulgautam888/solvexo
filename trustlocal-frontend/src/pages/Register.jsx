import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ShieldCheck, Briefcase, UserCircle, ChevronDown } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('user'); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: '' // Naya field category ke liye
  });

  // Bhopal ki main service categories
  const CATEGORIES = [
    "Electrician",
    "Plumber",
    "AC Repair",
    "Cleaning",
    "Painter",
    "Carpenter"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Phase 2: Yahan Backend API (Axios) call hoga jisme 'category' bhi jayegi
    console.log("Registering Account:", { role, ...formData });
    alert(`Account created as ${role} (${formData.category || 'Customer'})!`);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-[#070707]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-[#121212] rounded-[40px] p-10 shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic tracking-tighter">Join TrustLocal</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium">Be part of Bhopal's trusted network.</p>
        </div>

        {/* --- ROLE SELECTOR --- */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 border border-slate-200 dark:border-slate-700">
          <button 
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${role === 'user' ? 'bg-white dark:bg-slate-700 shadow-sm text-[var(--accent)]' : 'text-slate-500'}`}
          >
            <UserCircle size={18} /> Customer
          </button>
          <button 
            type="button"
            onClick={() => setRole('provider')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${role === 'provider' ? 'bg-white dark:bg-slate-700 shadow-sm text-[var(--accent)]' : 'text-slate-500'}`}
          >
            <Briefcase size={18} /> Provider
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="relative">
            <User className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="text" placeholder="Full Name" required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition"
              style={{ '--tw-ring-color': 'var(--accent)' }}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* SERVICE CATEGORY (Sirf Provider ke liye dikhega) */}
          <AnimatePresence>
            {role === 'provider' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="relative overflow-hidden"
              >
                <Briefcase className="absolute left-4 top-4 text-slate-400" size={20} />
                <select 
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition appearance-none font-bold text-sm"
                  style={{ '--tw-ring-color': 'var(--accent)' }}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Select Your Expertise</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-4 text-slate-400 pointer-events-none" size={20} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email & Password */}
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="email" placeholder="Email Address" required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition"
              style={{ '--tw-ring-color': 'var(--accent)' }}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="password" placeholder="Password" required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition"
              style={{ '--tw-ring-color': 'var(--accent)' }}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full text-white py-4 rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Register as {role === 'provider' ? 'Expert' : 'Customer'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-bold text-slate-500">
          Already have an account? <Link to="/login" className="hover:opacity-80" style={{ color: 'var(--accent)' }}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;