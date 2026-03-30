import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  DownloadCloud, 
  IndianRupee,
  Star // Review ke liye star icon
} from 'lucide-react';
import { generateInvoice } from '../utils/generateInvoice';
import ReviewModal from './ReviewModal'; // Review Modal import karein

const BookingCard = ({ booking, onRefresh }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Status config
  const statusConfig = {
    pending: { 
      color: 'text-amber-500', 
      bg: 'bg-amber-50 dark:bg-amber-900/10', 
      icon: Clock,
      label: 'Waiting for Expert'
    },
    accepted: { 
      color: 'text-blue-500', 
      bg: 'bg-blue-50 dark:bg-blue-900/10', 
      icon: ExternalLink,
      label: 'Expert on the Way'
    },
    completed: { 
      color: 'text-green-500', 
      bg: 'bg-green-50 dark:bg-green-900/10', 
      icon: CheckCircle2,
      label: 'Service Done'
    },
    cancelled: { 
      color: 'text-red-500', 
      bg: 'bg-red-50 dark:bg-red-900/10', 
      icon: XCircle,
      label: 'Booking Cancelled'
    }
  };

  const config = statusConfig[booking.status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white dark:bg-[#161616] p-6 rounded-[32px] border ${booking.status === 'completed' ? 'border-green-500/20' : 'border-slate-100 dark:border-slate-800'} shadow-sm hover:shadow-md transition-all group mb-4`}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          
          <div className="flex items-start gap-5">
            <div className="relative">
              <div className={`w-16 h-16 ${config.bg} rounded-2xl flex items-center justify-center ${config.color} shrink-0 border border-current/10`}>
                <StatusIcon size={28} />
              </div>
              {booking.status === 'completed' && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1 rounded-full shadow-lg">
                  <CheckCircle2 size={14} />
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="font-black text-lg text-slate-900 dark:text-white italic uppercase tracking-tighter">
                  {booking.provider?.name || "Service Expert"}
                </h4>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${config.bg} ${config.color} border border-current/10`}>
                  {booking.status}
                </span>
              </div>
              <p className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                {booking.serviceCategory} • {booking.serviceDetails}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl italic">
                  <Calendar size={13} className="text-[var(--accent)]" /> {booking.scheduledDate}
                </span>
                <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl italic line-clamp-1 max-w-[200px]">
                  <MapPin size={13} className="text-[var(--accent)]" /> {booking.address}
                </span>
              </div>
            </div>
          </div>

          <div className="flex sm:flex-col justify-between items-end border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-50 dark:border-slate-800 min-w-[140px]">
            <div className="text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 italic">Total Bill</p>
              <h3 className="text-2xl font-black italic flex items-center justify-end" style={{ color: 'var(--accent)' }}>
                <IndianRupee size={18} /> {booking.price || '350'}
              </h3>
            </div>

            <div className="flex flex-col gap-2 mt-3 w-full sm:w-auto">
              {/* INVOICE BUTTON */}
              {booking.status === 'completed' && (
                <button 
                  onClick={(e) => { e.stopPropagation(); generateInvoice(booking); }}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-black text-[10px] hover:bg-slate-200 transition-all uppercase tracking-tighter italic"
                >
                  <DownloadCloud size={14} /> Get Bill
                </button>
              )}

              {/* RATE SERVICE BUTTON (Sirf tab dikhega jab completed ho aur review na diya ho) */}
              {booking.status === 'completed' && !booking.isReviewed && (
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsReviewModalOpen(true); }}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white rounded-xl font-black text-[10px] hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter italic shadow-lg shadow-[var(--accent)]/20"
                >
                  <Star size={14} fill="white" /> Rate Service
                </button>
              )}

              {/* RATING DISPLAY (Agar review de diya hai) */}
              {booking.isReviewed && (
                <div className="flex items-center justify-end gap-1 text-[var(--accent)] font-black text-sm italic">
                  <span>{booking.rating}</span> <Star size={14} fill="var(--accent)" />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${config.color} ${booking.status !== 'completed' ? 'animate-pulse' : ''}`} />
            <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest italic">
              {config.label}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Review Modal Integration */}
      <ReviewModal 
        booking={booking}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onRefresh={onRefresh} // Data reload karne ke liye
      />
    </>
  );
};

export default BookingCard;