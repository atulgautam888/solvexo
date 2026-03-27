import React from 'react';
import { Star, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ServiceCard Component
 * @param {Object} provider - The expert's data (name, rating, price, etc.) [cite: 6, 20]
 * @param {Function} onBook - Function to trigger the Phase 1 Booking Modal 
 */
const ServiceCard = ({ provider, onBook }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -12 }}
      className="bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group"
    >
      {/* 📸 Image Section with Verified Badge [cite: 6, 21, 22] */}
      <div className="h-52 relative overflow-hidden">
        <img 
          src={provider.image} 
          alt={provider.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* VIP Verified Overlay [cite: 6, 22] */}
        {provider.isVerified && (
          <div className="absolute top-5 left-5 bg-green-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl backdrop-blur-md bg-green-500/90">
            <ShieldCheck size={14} strokeWidth={3} /> Verified Pro
          </div>
        )}

        {/* Floating Rating Badge [cite: 6, 20] */}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-lg">
          <Star size={14} className="text-amber-500" fill="currentColor" />
          <span className="text-sm font-black text-slate-900 dark:text-white">{provider.rating}</span>
        </div>
      </div>

      <div className="p-8">
        {/* Provider Identity [cite: 7, 21] */}
        <div className="mb-4">
          <h3 className="text-2xl font-black text-slate-950 dark:text-white group-hover:text-[var(--accent)] transition-colors">
            {provider.name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-1.5 mt-1">
            <MapPin size={16} className="text-[var(--accent)]" /> 
            {provider.location}, Bhopal 
          </p>
        </div>

        {/* Core Features / Skills Showcase [cite: 21] */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg uppercase tracking-wider text-slate-500">
            {provider.category}
          </span>
          <span className="text-[10px] font-black bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg uppercase tracking-wider text-green-600">
            On-Time Guarantee
          </span>
        </div>

        {/* 💰 Pricing & Booking Action [cite: 6, 11, 20] */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-50 dark:border-slate-800">
          <div>
            <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest">
              Est. Pricing [cite: 20]
            </span>
            <span className="text-2xl font-black text-slate-950 dark:text-white">
              ₹{provider.basePrice}
            </span>
          </div>
          
          <button 
            onClick={() => onBook(provider)}
            className="group/btn relative overflow-hidden bg-[var(--accent)] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-purple-100 dark:shadow-none hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Book Now</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;