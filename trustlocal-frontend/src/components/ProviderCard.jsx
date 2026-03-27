import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, ShieldCheck, CheckCircle, MessageSquare, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProviderCard = ({ provider }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${provider.id}`, { state: { provider } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-[#161616] border border-slate-100 dark:border-slate-800 p-5 rounded-[32px] shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="flex items-center gap-4">
        {/* Profile Image with Online Indicator */}
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-slate-50 dark:border-slate-800">
            <img 
              src={provider.image || "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=400"} 
              alt={provider.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white dark:border-[#161616] rounded-full shadow-sm"></div>
        </div>

        {/* Basic Info */}
        <div className="flex-1">
          <div className="flex items-center gap-1.5 mb-1">
            <h4 className="font-black text-slate-900 dark:text-white truncate max-w-[150px]">{provider.name}</h4>
            {provider.isVerified && <ShieldCheck size={16} className="text-blue-500" />}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/10 px-2 py-0.5 rounded-lg">
              <Star size={12} className="text-amber-500" fill="currentColor" />
              <span className="text-xs font-black text-amber-600">{provider.rating}</span>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{provider.category}</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Experience</p>
          <p className="text-sm font-bold">5+ Years</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/50">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Base Price</p>
          <p className="text-sm font-bold">₹{provider.basePrice}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-6">
        <button 
          className="flex-1 py-3.5 rounded-2xl font-black text-xs border-2 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center justify-center gap-2"
        >
          <MessageSquare size={16} /> Chat
        </button>
        <button 
          onClick={handleBookNow}
          className="flex-[1.5] py-3.5 rounded-2xl font-black text-xs text-white shadow-lg hover:opacity-90 active:scale-95 transition flex items-center justify-center gap-2"
          style={{ backgroundColor: 'var(--accent)', boxShadow: '0 8px 15px -4px rgba(var(--accent-rgb), 0.3)' }}
        >
          Book Now <CheckCircle size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default ProviderCard;