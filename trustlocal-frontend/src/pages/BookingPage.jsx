import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, MapPin, Info } from 'lucide-react';

const BHOPAL_AREAS = ["MP Nagar", "Arera Colony", "Indrapuri", "Gulmohar", "Bairagarh", "Kolar Road", "Ayodhya Bypass"];

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState('form');

  // Fallback data agar direct access ho
  const provider = state?.provider || { name: "Verified Expert", basePrice: 249, category: "Service", location: "Bhopal" };

  // Pricing Logic
  const basePrice = provider.basePrice;
  const visitingCharge = 50;
  const tax = Math.round(basePrice * 0.05);
  const total = basePrice + visitingCharge + tax;

  const handleBooking = (e) => {
    e.preventDefault();
    // Future: Axios call to backend
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {step === 'form' ? (
          <>
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center gap-2 text-slate-500 hover:text-[var(--accent)] font-bold mb-8 transition group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Services
            </button>

            <form onSubmit={handleBooking} className="grid lg:grid-cols-3 gap-10">
              
              {/* Left Column: Form Details */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#111111] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm"
                >
                  <h2 className="text-3xl font-black mb-8">Service Schedule</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Calendar size={14} style={{ color: 'var(--accent)' }}/> Appointment Date
                      </label>
                      <input type="date" required className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 font-bold transition" style={{ '--tw-ring-color': 'var(--accent)' }} />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Clock size={14} style={{ color: 'var(--accent)' }}/> Time Slot
                      </label>
                      <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 font-bold text-sm appearance-none" style={{ '--tw-ring-color': 'var(--accent)' }}>
                        <option>09:00 AM - 12:00 PM</option>
                        <option>12:00 PM - 03:00 PM</option>
                        <option>03:00 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <MapPin size={14} style={{ color: 'var(--accent)' }}/> Select Area
                      </label>
                      <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 font-bold text-sm" style={{ '--tw-ring-color': 'var(--accent)' }}>
                        {BHOPAL_AREAS.map(area => <option key={area}>{area}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Info size={14} style={{ color: 'var(--accent)' }}/> Detailed Address
                      </label>
                      <textarea 
                        required
                        placeholder="Flat No, Building Name, Landmark..." 
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 min-h-[120px]" 
                        style={{ '--tw-ring-color': 'var(--accent)' }}
                      ></textarea>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Checkout Summary */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="bg-white dark:bg-[#111111] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-xl sticky top-24">
                  <div className="text-center mb-8 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-800 rounded-3xl mb-4 overflow-hidden border-2 border-white dark:border-slate-700">
                       <img src={provider.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-black text-xl">{provider.name}</h4>
                    <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 text-[10px] font-black rounded-lg uppercase tracking-wider mt-2">
                      Verified Expert
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-400 uppercase text-[10px] font-black tracking-widest">Base Price</span>
                      <span className="font-bold">₹{basePrice}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-400 uppercase text-[10px] font-black tracking-widest">Visit Fee</span>
                      <span className="font-bold">₹{visitingCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-400 uppercase text-[10px] font-black tracking-widest">GST (5%)</span>
                      <span className="font-bold">₹{tax}</span>
                    </div>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                      <span className="font-black text-lg italic">Total</span>
                      <span className="text-3xl font-black italic" style={{ color: 'var(--accent)' }}>₹{total}</span>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2"
                    style={{ backgroundColor: 'var(--accent)', boxShadow: '0 10px 20px -5px rgba(var(--accent-rgb), 0.4)' }}
                  >
                    Send Request <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            </form>
          </>
        ) : (
          /* SUCCESS STATE */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white dark:bg-[#111111] rounded-[60px] shadow-2xl border border-slate-100 dark:border-slate-800"
          >
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <CheckCircle2 size={64} strokeWidth={3} />
            </div>
            <h2 className="text-5xl font-black mb-4">Request Sent!</h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto font-medium">
              We've notified **{provider.name}**. You can track the status in your dashboard.
            </p>
            <button 
              onClick={() => navigate('/user-dashboard')}
              className="text-white px-12 py-5 rounded-2xl font-black text-lg shadow-xl transition hover:scale-105 active:scale-95"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Go to My Dashboard
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;