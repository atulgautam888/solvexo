import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-slate-100 dark:border-slate-800 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
          
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-black flex items-center justify-center md:justify-start gap-2" style={{ color: 'var(--accent)' }}>
              TrustLocal
            </Link>
            <p className="text-slate-500 text-sm font-medium">Verified experts in Bhopal.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-widest">Contact</h4>
            <div className="flex flex-col items-center md:items-start gap-2 text-sm text-slate-500">
               <span>📍 MP Nagar, Bhopal</span>
               <span>📞 +91 7974XXXXXX</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-xs uppercase tracking-widest">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4 text-xs font-bold text-slate-400">
               <span className="hover:text-[var(--accent)] cursor-pointer">INSTAGRAM</span>
               <span className="hover:text-[var(--accent)] cursor-pointer">EMAIL</span>
            </div>
          </div>

        </div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 dark:border-slate-800 pt-8">
          © 2026 TrustLocal Bhopal
        </p>
      </div>
    </footer>
  );
};

export default Footer;