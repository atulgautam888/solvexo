import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, Loader2, ArrowLeft, KeyRound, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [loading, setLoading] = useState(false);

  // 1. Step 1: Send OTP to Email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/send-otp', { email });
      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 2. Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/verify-otp', { email, otp });
      toast.success(res.data.message);
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // 3. Step 3: Set New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/reset-password', { email, newPassword });
      toast.success("Password changed! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white dark:bg-[#121212] rounded-[40px] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 italic"
      >
        <AnimatePresence mode="wait">
          {/* STEP 1: ENTER EMAIL */}
          {step === 1 && (
            <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-[var(--accent)]/10 text-[var(--accent)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail size={32} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter italic">Forgot Password?</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Get verification code on email</p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" required placeholder="Enter registered email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 border-transparent focus:border-[var(--accent)] transition-all font-black text-xs "
                  />
                </div>
                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-[var(--accent)] text-white py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 active:scale-95 transition-all  text-xs tracking-widest"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Send Verification Code"}
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: ENTER OTP */}
          {step === 2 && (
            <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <KeyRound size={32} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter italic">Verify OTP</h2>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-2">Code sent to {email}</p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <input 
                  type="text" required placeholder="6-DIGIT CODE" maxLength="6"
                  value={otp} onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 border-transparent focus:border-blue-500 transition-all font-black text-2xl tracking-[0.5em]"
                />
                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Verify & Continue"}
                </button>
                <p className="text-center text-[10px] font-black text-slate-400 uppercase cursor-pointer hover:text-[var(--accent)]" onClick={() => setStep(1)}>Resend Code</p>
              </form>
            </motion.div>
          )}

          {/* STEP 3: NEW PASSWORD */}
          {step === 3 && (
            <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock size={32} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tighter italic">New Password</h2>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Create a strong secure password</p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" required placeholder="ENTER NEW PASSWORD" 
                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 border-transparent focus:border-green-500 transition-all font-black text-xs uppercase"
                  />
                </div>
                <button 
                  type="submit" disabled={loading}
                  className="w-full bg-green-600 text-white py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Update Password"}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <Link to="/login" className="mt-10 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-[var(--accent)] transition-colors tracking-widest">
          <ArrowLeft size={14} /> Back to login hub
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;