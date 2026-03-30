import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, CheckCircle, MessageSquare, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProviderCard = ({ provider }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Navigate using the dynamic provider ID from backend
    navigate(`/booking/${provider.id || provider._id}`, { state: { provider } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-[#161616] border border-slate-100 dark:border-slate-800 p-6 rounded-[40px] shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
    >
      <div className="flex items-center gap-5">
        {/* Profile Image Section */}
        <div className="relative">
          <div className="w-20 h-20 rounded-[28px] overflow-hidden border-2 border-[var(--accent)]/10 p-1 bg-white dark:bg-slate-800">
            <img 
              src={provider.image || "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=400"} 
              alt={provider.name} 
              className="w-full h-full object-cover rounded-[22px] group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-[#161616] rounded-full"></div>
        </div>

        {/* Name & Expert Info */}
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1.5 mb-0.5">
            <h4 className="font-black text-slate-900 dark:text-white truncate text-lg italic uppercase tracking-tighter">
              {provider.name}
            </h4>
            <ShieldCheck size={16} className="text-blue-500 shrink-0" />
          </div>
          
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
            {provider.category} Expert
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-xl">
              <Star size={12} className="text-amber-500" fill="#f59e0b" />
              <span className="text-xs font-black text-amber-600">{provider.avgRating || "0.0"}</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 italic">
              ({provider.totalReviews || 0} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Stats Divider */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-3xl border border-slate-100/50 dark:border-slate-700/30">
          <div className="flex items-center gap-2 mb-1 opacity-50">
            <Briefcase size={12} />
            <p className="text-[9px] font-black uppercase tracking-widest">Experience</p>
          </div>
          <p className="text-sm font-black italic tracking-tight">5+ Years</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-3xl border border-slate-100/50 dark:border-slate-700/30">
          <div className="flex items-center gap-2 mb-1 opacity-50">
            <Star size={12} />
            <p className="text-[9px] font-black uppercase tracking-widest">Base Fare</p>
          </div>
          <p className="text-sm font-black italic tracking-tight" style={{ color: 'var(--accent)' }}>
            ₹{provider.basePrice || 249}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button 
          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-[var(--accent)] transition-all active:scale-90"
          title="Chat with Expert"
        >
          <MessageSquare size={20} />
        </button>
        <button 
          onClick={handleBookNow}
          className="flex-1 py-4 rounded-2xl font-black text-xs text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 italic uppercase tracking-widest"
          style={{ backgroundColor: 'var(--accent)', boxShadow: '0 10px 20px -5px rgba(var(--accent-rgb), 0.4)' }}
        >
          Instant Book <CheckCircle size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProviderCard;