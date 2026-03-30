import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, ArrowRight, UserCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookingModal from './BookingModal';

const ServiceCard = ({ provider }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookingClick = (e) => {
    // Stop propagation taaki card ki click event trigger na ho
    e.preventDefault();
    if (!user) {
      alert("Please login first to book a service!");
      navigate('/login');
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -12 }}
        className="bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group h-full flex flex-col"
      >
        {/* Image Section - Link to Profile */}
        <Link to={`/provider/${provider.id}`} className="h-52 relative overflow-hidden block">
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
          
          <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-2 rounded-2xl flex items-center gap-2 shadow-lg border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-amber-500" fill="currentColor" />
              <span className="text-sm font-black">{provider.rating}</span>
            </div>
            <div className="w-[1px] h-3 bg-slate-200 dark:bg-slate-700" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
              {provider.totalReviews} Reviews
            </span>
          </div>
        </Link>

        <div className="p-8 flex flex-col flex-grow">
          <div className="mb-4">
            <Link to={`/provider/${provider.id}`}>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white group-hover:text-[var(--accent)] transition-colors italic uppercase tracking-tighter">
                {provider.name}
              </h3>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-1.5 mt-1 italic">
              <MapPin size={16} style={{ color: 'var(--accent)' }} /> 
              {provider.location || "Bhopal Hub"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-[10px] font-black bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-1.5 rounded-xl uppercase tracking-widest italic border border-[var(--accent)]/10">
              {provider.category} Expert
            </span>
          </div>

          {/* NEW: View Profile Link with Icon */}
          <Link 
            to={`/provider/${provider.id}`}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[var(--accent)] transition-colors mb-6 group/link w-fit"
          >
            <UserCircle2 size={16} /> 
            <span className="border-b border-transparent group-hover/link:border-[var(--accent)]">View Full Profile & Reviews</span>
            <ArrowRight size={12} className="opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
          </Link>

          <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-50 dark:border-slate-800">
            <div>
              <span className="block text-[10px] text-slate-400 font-black uppercase tracking-widest italic">Base Price</span>
              <span className="text-2xl font-black italic">₹{provider.basePrice}</span>
            </div>
            
            <button 
              onClick={handleBookingClick}
              className="group/btn relative overflow-hidden text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 italic uppercase tracking-tighter"
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

      {/* Modal remains the same */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        provider={provider} 
      />
    </>
  );
};

export default ServiceCard;