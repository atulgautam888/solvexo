import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, MapPin, Calendar, ExternalLink } from 'lucide-react';

const BookingCard = ({ booking }) => {
  // Status ke hisaab se colors aur icons set karna
  const statusConfig = {
    Pending: { 
      color: 'text-amber-500', 
      bg: 'bg-amber-50 dark:bg-amber-900/10', 
      icon: Clock,
      label: 'Waiting for Expert'
    },
    Accepted: { 
      color: 'text-blue-500', 
      bg: 'bg-blue-50 dark:bg-blue-900/10', 
      icon: ExternalLink,
      label: 'Expert on the Way'
    },
    Completed: { 
      color: 'text-green-500', 
      bg: 'bg-green-50 dark:bg-green-900/10', 
      icon: CheckCircle2,
      label: 'Service Done'
    },
    Cancelled: { 
      color: 'text-red-500', 
      bg: 'bg-red-50 dark:bg-red-900/10', 
      icon: XCircle,
      label: 'Booking Cancelled'
    }
  };

  const config = statusConfig[booking.status] || statusConfig.Pending;
  const StatusIcon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#161616] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        
        {/* Left Side: Provider & Service Info */}
        <div className="flex items-start gap-5">
          <div className={`w-14 h-14 ${config.bg} rounded-2xl flex items-center justify-center ${config.color} shrink-0`}>
            <StatusIcon size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-black text-lg text-slate-900 dark:text-white">{booking.provider}</h4>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${config.bg} ${config.color}`}>
                {booking.status}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{booking.service}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 text-[11px] font-black text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {booking.date}</span>
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {booking.location || 'Bhopal'}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Price & Actions */}
        <div className="flex sm:flex-col justify-between items-end border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-50 dark:border-slate-800">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Paid</p>
            <h3 className="text-2xl font-black italic" style={{ color: 'var(--accent)' }}>₹{booking.price}</h3>
          </div>
          
          {booking.status === 'Pending' && (
            <button className="text-xs font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 px-4 py-2 rounded-xl transition-all">
              Cancel Request
            </button>
          )}
          
          {booking.status === 'Completed' && (
            <button className="text-xs font-black text-[var(--accent)] hover:opacity-80 transition-all flex items-center gap-1">
              Download Invoice <ExternalLink size={12} />
            </button>
          )}
        </div>
      </div>
      
      {/* Small notification text */}
      <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center gap-2">
        <div className={`w-1.5 h-1.5 rounded-full ${config.color} animate-pulse`} />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{config.label}</p>
      </div>
    </motion.div>
  );
};

export default BookingCard;