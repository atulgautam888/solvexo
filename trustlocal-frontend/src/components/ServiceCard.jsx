import React from 'react';
import { Star, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Context import kiya

const ServiceCard = ({ provider }) => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Logged-in user check karne ke liye

  const handleBooking = () => {
    if (!user) {
      // Agar user logged in nahi hai, toh use login page par bhejo
      // Saath hi 'state' mein current path save karo taki login ke baad wapas aa sake (Optional)
      alert("Please login first to book a service!");
      navigate('/login');
    } else {
      // Agar logged in hai, toh booking page par bhejo
      navigate(`/booking/${provider.id}`, { state: { provider } });
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      className="bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group"
    >
      {/* Image Section */}
      <div className="h-52 relative overflow-hidden">
        <img 
          src={provider.image} 
          alt={provider.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        {provider.isVerified && (
          <div className="absolute top-5 left-5 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl backdrop-blur-md bg-green-500/90">
            <ShieldCheck size={14} strokeWidth={3} /> Verified Pro
          </div>
        )}
        <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1 shadow-lg">
          <Star size={14} className="text-amber-500" fill="currentColor" />
          <span className="text-sm font-black">{provider.rating}</span>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-4">
          <h3 className="text-2xl font-black text-slate-950 dark:text-white group-hover:text-[var(--accent)] transition-colors">
            {provider.name}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-1.5 mt-1">
            <MapPin size={16} style={{ color: 'var(--accent)' }} /> 
            {provider.location}, Bhopal 
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-[10px] font-black bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg uppercase tracking-wider text-slate-500">
            {provider.category}
          </span>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-slate-50 dark:border-slate-800">
          <div>
            <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest">Base Price</span>
            <span className="text-2xl font-black italic">₹{provider.basePrice}</span>
          </div>
          
          <button 
            onClick={handleBooking}
            className="group/btn relative overflow-hidden text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
            style={{ 
              backgroundColor: 'var(--accent)',
              boxShadow: '0 10px 15px -3px rgba(var(--accent-rgb), 0.3)' 
            }}
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