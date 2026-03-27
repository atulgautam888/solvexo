import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-[#0a0a0a]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-[#161616] rounded-[32px] p-8 shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-[#aa3bff] mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black">{isLogin ? "Welcome Back" : "Join TrustLocal"}</h2>
          <p className="text-slate-500 text-sm mt-2">Connecting Bhopal with verified experts</p>
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-4 text-slate-400" size={20} />
              <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-[#aa3bff] transition" />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type="email" placeholder="Email Address" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-[#aa3bff] transition" />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
            <input type="password" placeholder="Password" className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-[#aa3bff] transition" />
          </div>

          <button className="w-full bg-[#aa3bff] text-white py-4 rounded-2xl font-black shadow-xl shadow-purple-200 dark:shadow-none hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2">
            {isLogin ? "Sign In" : "Create Account"} <ArrowRight size={20} />
          </button>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-slate-500 hover:text-[#aa3bff] transition"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;