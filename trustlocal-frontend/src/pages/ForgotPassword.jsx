import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Phase 2: Yahan Backend API call hogi (Axios)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-[#161616] rounded-[32px] p-8 shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        {!isSent ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black italic">Reset Password</h2>
              <p className="text-slate-500 text-sm mt-2">Enter your email to get a reset link.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="email" required placeholder="Email Address" 
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 transition" 
                  style={{ '--tw-ring-color': 'var(--accent)' }} 
                />
              </div>
              <button 
                type="submit" disabled={isSubmitting}
                className="w-full text-white py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-black mb-2">Check your Email</h3>
            <p className="text-slate-500 text-sm mb-6">We've sent a password reset link to {email}</p>
          </div>
        )}

        <Link to="/login" className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-slate-400 hover:text-[var(--accent)] transition-colors">
          <ArrowLeft size={16} /> Back to Login
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;