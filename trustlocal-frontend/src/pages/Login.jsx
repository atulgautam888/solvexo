import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. AuthContext login call
      const user = await login(formData.email, formData.password);
      
      // Debugging: Check if image is coming from backend
      console.log("Login Success. User Image URL:", user.image);

      toast.success(`Welcome back, ${user.name.split(' ')[0]}! ✨`);

      // 2. Role based redirection
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'provider') {
        navigate('/provider-dashboard');
      } else {
        navigate('/user-dashboard');
      }

    } catch (error) {
      setErrorMsg(error);
      toast.error(error || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-[#0a0a0a] font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-[#161616] rounded-[32px] p-8 md:p-10 shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-2xl mb-4 shadow-inner" style={{ backgroundColor: 'color-mix(in srgb, var(--accent), transparent 90%)' }}>
            <ShieldCheck size={36} style={{ color: 'var(--accent)' }} />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase italic">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-2 font-medium italic">Bhopal's experts are just one click away.</p>
        </div>

        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl text-red-500 text-xs font-bold text-center italic"
          >
            {errorMsg}
          </motion.div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative group">
            <Mail className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[var(--accent)] transition-colors" size={20} />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none border-2 border-transparent focus:border-[var(--accent)] transition-all font-bold italic" 
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[var(--accent)] transition-colors" size={20} />
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password" 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none border-2 border-transparent focus:border-[var(--accent)] transition-all font-bold italic" 
              required
            />
          </div>

          <div className="flex justify-end px-2">
            <Link 
              to="/forgot-password" 
              className="text-[10px] font-black text-slate-400 hover:text-[var(--accent)] transition-colors uppercase tracking-widest italic"
            >
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full text-white py-4 rounded-2xl font-black shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2 shadow-[var(--accent)]/30 italic uppercase tracking-tighter"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign In"} 
            {!isSubmitting && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-slate-100 dark:border-slate-800">
          <Link 
            to="/register"
            className="text-sm font-bold hover:opacity-80 transition italic uppercase tracking-tighter"
            style={{ color: 'var(--accent)' }}
          >
            Don't have an account? <span className="underline underline-offset-4">Sign Up</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;