import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, ShieldCheck, ArrowLeft, Clock, Briefcase, CheckCircle } from 'lucide-react';
import API from '../api/axios';
import BookingModal from '../components/BookingModal';
import { motion } from 'framer-motion';

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/auth/provider/${id}`);
        setProvider(res.data);
      } catch (err) {
        console.error("Profile Fetch Error");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black italic text-[var(--accent)] animate-pulse">LOADING EXPERT PROFILE...</div>;
  if (!provider) return <div className="text-center py-20 font-black italic text-slate-500 uppercase tracking-widest">Expert Not Found in Bhopal Hub.</div>;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] pb-20 font-sans">
      
      {/* HEADER SECTION */}
      <div className="bg-white dark:bg-[#121212] border-b border-slate-100 dark:border-slate-800 p-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:scale-105 transition-all text-slate-600 dark:text-slate-300">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Expert Profile</h2>
          <div className="w-10" /> 
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: INFO CARD */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm text-center relative overflow-hidden">
              
              {/* Naya: Verified Badge Banner */}
              {provider.isVerified && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-6 py-1 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest italic flex items-center gap-1 shadow-lg shadow-blue-500/20">
                  <CheckCircle size={12} fill="white" className="text-blue-500" /> Verified
                </div>
              )}

              <div className="w-32 h-32 rounded-[40px] overflow-hidden mx-auto border-4 border-[var(--accent)] p-1 mb-6 shadow-xl bg-white dark:bg-slate-800">
                <img src={provider.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover rounded-[32px]" alt={provider.name} />
              </div>

              <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center justify-center gap-2 text-slate-900 dark:text-white">
                {provider.name} 
                {provider.isVerified && (
                  <ShieldCheck size={24} className="text-blue-500 fill-blue-500/10" />
                )}
              </h3>
              
              <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.2em] mt-1 italic">
                {provider.category} Specialist
              </p>
              
              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="text-center">
                  <p className="text-xl font-black italic text-slate-900 dark:text-white">
                    {provider.avgRating} <Star size={16} className="inline mb-1 text-amber-500" fill="currentColor"/>
                  </p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avg Rating</p>
                </div>
                <div className="w-[1px] h-8 bg-slate-100 dark:bg-slate-800" />
                <div className="text-center">
                  <p className="text-xl font-black italic text-slate-900 dark:text-white">{provider.totalReviews}</p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reviews</p>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full mt-10 py-4 rounded-2xl font-black italic text-white shadow-xl hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest text-xs"
                style={{ backgroundColor: 'var(--accent)', boxShadow: '0 12px 20px -5px rgba(var(--accent-rgb), 0.4)' }}
              >
                Instant Booking
              </button>
            </div>

            {/* Service Details Card */}
            <div className="bg-white dark:bg-[#121212] p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 italic shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Expertise Details</h4>
              <div className="space-y-5">
                <div className="flex items-center gap-4 text-sm font-black text-slate-700 dark:text-slate-300">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50"><Clock size={16} className="text-[var(--accent)]"/></div>
                  Mon - Sat (9 AM - 8 PM)
                </div>
                <div className="flex items-center gap-4 text-sm font-black text-slate-700 dark:text-slate-300">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50"><Briefcase size={16} className="text-[var(--accent)]"/></div>
                  Professional Trained Pro
                </div>
                <div className="flex items-center gap-4 text-sm font-black text-slate-700 dark:text-slate-300">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50"><MapPin size={16} className="text-[var(--accent)]"/></div>
                  Serving Bhopal Hub
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: REVIEWS SECTION */}
          <div className="lg:col-span-2 space-y-8">
            <header className="flex items-center justify-between">
              <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-[var(--accent)] pl-4 text-slate-900 dark:text-white">
                Customer Testimonials
              </h3>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 text-[10px] font-black italic uppercase">
                <ShieldCheck size={14} className="text-blue-500" /> Real Feedback
              </div>
            </header>
            
            {provider.reviews && provider.reviews.length > 0 ? (
              <div className="space-y-6">
                {provider.reviews.map((rev) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    key={rev._id} 
                    className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 italic group hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-lg uppercase shadow-inner">
                          {rev.customer?.image ? <img src={rev.customer.image} className="w-full h-full object-cover rounded-2xl" /> : rev.customer?.name[0]}
                        </div>
                        <div>
                          <h5 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{rev.customer?.name}</h5>
                          <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{new Date(rev.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1.5 rounded-2xl border border-amber-500/10">
                        <Star size={14} className="text-amber-500" fill="#f59e0b" />
                        <span className="text-sm font-black text-amber-600">{rev.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-bold leading-relaxed italic pl-2 border-l-2 border-slate-100 dark:border-slate-800">
                      "{rev.review || "Excellent service provided by the expert. Very professional!"}"
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white dark:bg-[#121212] rounded-[40px] border-2 border-dashed border-slate-100 dark:border-slate-800 opacity-50 italic font-black uppercase text-xs tracking-widest text-slate-400">
                No verified reviews for this pro yet. <br /> 
                <span className="text-[var(--accent)] mt-2 block">Be the first to share your experience! 🚀</span>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* MODAL */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        provider={{ ...provider, id: provider._id }} 
      />
    </div>
  );
};

export default ProviderProfile;