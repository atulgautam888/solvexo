import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Loader2 } from 'lucide-react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const ReviewModal = ({ booking, isOpen, onClose, onRefresh }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await API.post('/bookings/review', { 
        bookingId: booking._id, 
        rating, 
        review: comment 
      });
      toast.success("Thanks for the review! ⭐");
      onRefresh();
      onClose();
    } catch (err) {
      toast.error("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-[#161616] w-full max-w-md rounded-[40px] p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-red-500"><X /></button>
        
        <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Rate your Expert</h3>
        <p className="text-slate-500 text-sm italic mb-6">How was your experience with {booking.provider?.name}?</p>

        <div className="flex justify-center gap-3 mb-8">
          {[1, 2, 3, 4, 5].map((num) => (
            <button key={num} onClick={() => setRating(num)} className="transition-transform active:scale-90">
              <Star size={36} fill={num <= rating ? "var(--accent)" : "none"} stroke={num <= rating ? "var(--accent)" : "#cbd5e1"} />
            </button>
          ))}
        </div>

        <textarea 
          placeholder="Share your experience (Optional)..."
          className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--accent)]/20 font-bold italic h-32"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button 
          onClick={handleSubmit} disabled={loading}
          className="w-full mt-6 py-4 bg-[var(--accent)] text-white rounded-2xl font-black italic shadow-xl shadow-[var(--accent)]/30"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "SUBMIT REVIEW"}
        </button>
      </motion.div>
    </div>
  );
};

export default ReviewModal;