import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import API from '../api/axios';

const BookingModal = ({ isOpen, onClose, provider }) => {
  const [formData, setFormData] = useState({
    address: '',
    scheduledDate: '',
    serviceDetails: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/bookings/create', {
        providerId: provider.id,
        serviceCategory: provider.category,
        serviceDetails: formData.serviceDetails,
        address: formData.address,
        price: provider.basePrice,
        scheduledDate: formData.scheduledDate
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-[#161616] w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        {success ? (
          <div className="p-12 text-center">
            <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
            <h3 className="text-2xl font-black italic">Booking Sent!</h3>
            <p className="text-slate-500 mt-2 font-medium italic">Expert will contact you shortly.</p>
          </div>
        ) : (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-black italic tracking-tighter">Book Service</h3>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                <X size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-6">
              <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center text-white font-black italic">
                {provider.name[0]}
              </div>
              <div>
                <p className="font-black italic text-sm">{provider.name}</p>
                <p className="text-[10px] uppercase tracking-widest font-bold text-[var(--accent)]">{provider.category}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  type="text" placeholder="Full Address in Bhopal" required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none border-2 border-transparent focus:border-[var(--accent)] font-bold text-sm"
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  type="date" required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none border-2 border-transparent focus:border-[var(--accent)] font-bold text-sm"
                  onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                />
              </div>

              <textarea 
                placeholder="What exactly do you need? (e.g. Fan repair)" required
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none border-2 border-transparent focus:border-[var(--accent)] font-bold text-sm min-h-[100px]"
                onChange={(e) => setFormData({...formData, serviceDetails: e.target.value})}
              />

              <button 
                type="submit" disabled={loading}
                className="w-full py-4 bg-[var(--accent)] text-white rounded-2xl font-black italic shadow-xl shadow-[var(--accent)]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : "CONFIRM BOOKING"}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookingModal;