import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, UserCircle, ChevronDown, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  // Role state define ki hai
  const [role, setRole] = useState('user'); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    category: '' 
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const CATEGORIES = ["Electrician", "Plumber", "AC Repair", "Cleaning", "Painter", "Carpenter"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // FIX: Yahan 'role' explicitly bhej rahe hain jo state se aa raha hai
      const data = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role, // Current selected role
        category: role === 'provider' ? formData.category : ''
      });

      // Backend se aane wale REAL role ke basis par redirect
      if (data.role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate('/user-dashboard');
      }

    } catch (error) {
      setErrorMsg(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-[#070707]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-[#121212] rounded-[40px] p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black italic tracking-tighter">Join TrustLocal</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium italic">Bhopal's Trusted Service Network</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl text-red-500 text-xs font-bold text-center italic">
            {errorMsg}
          </div>
        )}

        {/* --- ROLE SELECTOR (FIXED LOGIC) --- */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 border border-slate-200 dark:border-slate-700">
          <button 
            type="button"
            onClick={() => { setRole('user'); setErrorMsg(''); }} // Role update
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${role === 'user' ? 'bg-white dark:bg-slate-700 shadow-sm text-[var(--accent)]' : 'text-slate-500'}`}
          >
            <UserCircle size={18} /> Customer
          </button>
          <button 
            type="button"
            onClick={() => { setRole('provider'); setErrorMsg(''); }} // Role update
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${role === 'provider' ? 'bg-white dark:bg-slate-700 shadow-sm text-[var(--accent)]' : 'text-slate-500'}`}
          >
            <Briefcase size={18} /> Provider
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[var(--accent)]" size={20} />
            <input 
              name="name" type="text" placeholder="Full Name" required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition font-bold"
              style={{ '--tw-ring-color': 'var(--accent)' }}
              onChange={handleChange}
            />
          </div>

          <AnimatePresence mode="wait">
            {role === 'provider' && (
              <motion.div 
                key="category-select"
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }} 
                className="relative overflow-hidden"
              >
                <Briefcase className="absolute left-4 top-4 text-slate-400" size={20} />
                <select 
                  name="category" required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition appearance-none font-bold text-sm"
                  style={{ '--tw-ring-color': 'var(--accent)' }}
                  onChange={handleChange}
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

          <div className="relative group">
            <Mail className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[var(--accent)]" size={20} />
            <input 
              name="email" type="email" placeholder="Email Address" required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition font-bold"
              style={{ '--tw-ring-color': 'var(--accent)' }}
              onChange={handleChange}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[var(--accent)]" size={20} />
            <input 
              name="password" type="password" placeholder="Password" required
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition font-bold"
              style={{ '--tw-ring-color': 'var(--accent)' }}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" disabled={isSubmitting}
            className="w-full text-white py-4 rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : `Register as ${role === 'provider' ? 'Expert' : 'Customer'}`}
            {!isSubmitting && <ArrowRight size={20} />}
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-bold text-slate-500 pt-6 border-t border-slate-100 dark:border-slate-800">
          Already have an account? <Link to="/login" className="hover:opacity-80 underline underline-offset-4" style={{ color: 'var(--accent)' }}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;