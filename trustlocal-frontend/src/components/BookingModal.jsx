import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, provider }) => {
  const [step, setStep] = useState('form'); // 'form' or 'success'
  
  // Transparent Pricing Calculation [cite: 6, 20]
  const basePrice = provider?.basePrice || 0;
  const visitingCharge = 50;
  const tax = Math.round(basePrice * 0.05);
  const total = basePrice + visitingCharge + tax;

  const handleBooking = () => {
    // Yahan backend API call hogi future mein
    setStep('success');
  };

  if (!provider) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="bg-white dark:bg-slate-900 rounded-[40px] w-full max-w-lg p-8 relative z-10 shadow-2xl border border-slate-100 dark:border-slate-800"
          >
            {step === 'form' ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black">Book Verified Pro</h2>
                  <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"><X /></button>
                </div>

                <div className="space-y-6">
                  {/* Date & Time Picker [cite: 20] */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Calendar size={14}/> Preferred Date</label>
                      <input type="date" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-[var(--accent)] font-bold text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Clock size={14}/> Preferred Slot</label>
                      <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-[var(--accent)] font-bold text-sm appearance-none">
                        <option>09:00 AM - 12:00 PM</option>
                        <option>12:00 PM - 03:00 PM</option>
                        <option>03:00 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Transparent Price Summary [cite: 6, 11] */}
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[32px] border-2 border-dashed border-slate-200 dark:border-slate-700">
                    <p className="text-xs font-black text-slate-400 mb-4 uppercase tracking-tighter">Price Breakdown</p>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-500">Service Base Price</span>
                        <span>₹{basePrice}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-500">Visiting Charges</span>
                        <span>₹{visitingCharge}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-500">Taxes (5%)</span>
                        <span>₹{tax}</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-slate-200 dark:border-slate-700 mt-2">
                        <span className="font-black text-lg">Total Amount</span>
                        <span className="font-black text-2xl text-[var(--accent)]">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleBooking}
                    className="w-full text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-purple-100 dark:shadow-none hover:opacity-90 active:scale-95 transition flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    Confirm Booking <ArrowRight size={20} />
                  </button>
                </div>
              </>
            ) : (
              /* --- VIP ANIMATED SUCCESS STATE [cite: 22] --- */
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 size={64} strokeWidth={3} />
                </motion.div>
                <h3 className="text-3xl font-black mb-2">Booking Confirmed!</h3>
                <p className="text-slate-500 mb-8 max-w-[250px] mx-auto">Your verified pro {provider.name} is scheduled for Bhopal.</p>
                <button 
                  onClick={onClose}
                  className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:opacity-90 transition"
                >
                  Go to Dashboard
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;