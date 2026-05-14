import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import {  
  LayoutDashboard, IndianRupee, Star, CheckCircle2, XCircle, Clock,  
  MapPin, Calendar, LogOut, Briefcase, Menu, X, Loader2, Settings, ShieldCheck  
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProviderDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State including breakdown and reviews list
  const [providerStats, setProviderStats] = useState({ 
    averageRating: "0.0", 
    totalReviews: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    reviewsList: [],
    earnings: 0,
    completedJobs: 0
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetching Jobs and Stats together
      const [jobsRes, statsRes] = await Promise.all([
        API.get('/bookings/my-jobs'),
        API.get('/auth/provider-stats') // Ye route authController.getProviderStats ko call karti hai
      ]);

      setJobs(jobsRes.data.jobs || []);
      setProviderStats({
        averageRating: statsRes.data.avgRating || "0.0",
        totalReviews: statsRes.data.totalReviews || 0,
        breakdown: statsRes.data.breakdown || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        reviewsList: statsRes.data.reviewsList || [],
        earnings: statsRes.data.earnings || 0,
        completedJobs: statsRes.data.completedJobs || 0
      });
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      toast.error("Could not load Bhopal Hub data ⚠️");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    const loadingToast = toast.loading("Updating status...");
    try {
      await API.put('/bookings/update-status', { bookingId, status: newStatus });
      toast.success(`Job ${newStatus}!`, { id: loadingToast });
      fetchDashboardData();
    } catch (err) {
      toast.error("Update failed!", { id: loadingToast });
    }
  };

  const requests = jobs.filter(j => j.status === 'pending');
  const activeJobs = jobs.filter(j => j.status === 'accepted');

  const statsList = [
    { label: 'Total Earnings', value: `₹${providerStats.earnings}`, icon: IndianRupee, color: 'rgb(34, 197, 94)', bg: 'rgba(34, 197, 94, 0.1)' },
    { label: 'Jobs Done', value: providerStats.completedJobs.toString(), icon: CheckCircle2, color: 'rgb(59, 130, 246)', bg: 'rgba(59, 130, 246, 0.1)' },
    {  
      label: 'Bhopal Rating',  
      value: providerStats.averageRating,  
      icon: Star,  
      color: 'rgb(245, 158, 11)',  
      bg: 'rgba(245, 158, 11, 0.1)',
      subText: `${providerStats.totalReviews} Reviews`
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] flex flex-col md:flex-row overflow-x-hidden font-sans transition-colors duration-300">

      {/* MOBILE NAV */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0c0c0c] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] w-full">
        <h2 className="text-xl font-black italic tracking-tighter uppercase" style={{ color: 'var(--accent)' }}>TrustLocal</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--accent)]">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-[110] w-72 bg-white dark:bg-[#0c0c0c] border-r border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-between transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div>
          <div className="mb-10 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shrink-0 border-2 border-[var(--accent)]/20 flex items-center justify-center bg-white">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-black italic text-xl uppercase" style={{ backgroundColor: 'var(--accent)' }}>
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>
            <div className="overflow-hidden text-sm italic font-black uppercase tracking-tight">
              <h4 className="truncate text-slate-900 dark:text-white">{user?.name}</h4>
              <p className="text-[10px] text-green-500 tracking-widest italic">{user?.category} EXPERT</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black italic uppercase tracking-tighter transition-all ${activeTab === 'overview' ? 'text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50'}`} style={activeTab === 'overview' ? { backgroundColor: 'var(--accent)' } : {}}>
              <LayoutDashboard size={20} /> Overview
            </button>
            <button onClick={() => { setActiveTab('jobs'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-black italic uppercase tracking-tighter transition-all ${activeTab === 'jobs' ? 'text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50'}`} style={activeTab === 'jobs' ? { backgroundColor: 'var(--accent)' } : {}}>
              <Briefcase size={20} /> Active Work ({activeJobs.length})
            </button>
            <button onClick={() => navigate('/profile')} className="w-full flex items-center gap-4 p-4 rounded-2xl font-black italic uppercase tracking-tighter text-slate-500 hover:bg-slate-50">
              <Settings size={20} /> Settings
            </button>
          </nav>
        </div>
        <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-4 p-4 rounded-2xl text-red-500 font-black italic uppercase text-xs tracking-widest">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto w-full max-w-full">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="italic">
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase tracking-tighter text-slate-900 dark:text-white">Provider Panel</h2>
            <p className="text-slate-500 font-black italic text-xs uppercase tracking-widest">Bhopal Hub Command Center</p>
          </div>
          <div className="flex items-center gap-3 bg-green-500/10 px-5 py-2.5 rounded-full border border-green-500/20 font-black italic text-[10px] uppercase text-green-600">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" /> Live Status
          </div>
        </header>

        {loading ? (
            <div className="py-20 flex flex-col items-center justify-center h-full">
               <Loader2 className="animate-spin text-[var(--accent)] mb-4" size={40} />
               <p className="font-black italic uppercase text-[10px] tracking-widest opacity-50">Syncing with server...</p>
            </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'overview' ? (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                
                {/* DYNAMIC STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {statsList.map((s, i) => (
                    <div key={i} className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm italic hover:shadow-lg transition-all">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: s.bg, color: s.color }}><s.icon size={24} /></div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{s.label}</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">{s.value}</h3>
                        {s.subText && <span className="text-[10px] text-slate-400 font-black italic">{s.subText}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* PERFORMANCE ANALYTICS (CHART) */}
                  <div className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm italic">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 italic">Review Breakdown</h4>
                    <div className="space-y-5">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = providerStats.breakdown?.[star] || 0;
                        const percentage = providerStats.totalReviews > 0 ? (count / providerStats.totalReviews) * 100 : 0;
                        return (
                          <div key={star} className="flex items-center gap-4">
                            <div className="flex items-center gap-1 min-w-[45px]">
                              <span className="text-xs font-black italic text-slate-700 dark:text-white">{star}</span>
                              <Star size={10} className="text-amber-500" fill="currentColor" />
                            </div>
                            <div className="flex-1 h-2.5 bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: star >= 4 ? 'var(--accent)' : star >= 3 ? '#f59e0b' : '#ef4444' }}
                              />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 w-8 text-right italic">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* NEW: REVIEWS LIST (What Users Say) */}
                  <div className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm h-[380px] flex flex-col">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center justify-between italic">
                       Customer Feedback
                       <ShieldCheck size={14} className="text-blue-500" />
                    </h4>
                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
                      {providerStats.reviewsList && providerStats.reviewsList.length > 0 ? (
                        providerStats.reviewsList.map((rev, i) => (
                          <div key={i} className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 italic hover:border-[var(--accent)]/30 transition-colors">
                             <div className="flex justify-between items-center mb-3">
                               <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-black text-xs uppercase shadow-inner">
                                     {rev.customer?.name?.[0] || 'C'}
                                  </div>
                                  <span className="text-[10px] font-black uppercase text-slate-700 dark:text-white truncate max-w-[80px]">{rev.customer?.name || "User"}</span>
                               </div>
                               <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/10">
                                 <Star size={10} className="text-amber-500" fill="currentColor" />
                                 <span className="text-[10px] font-black text-amber-600">{rev.rating}.0</span>
                               </div>
                             </div>
                             <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 italic leading-relaxed">
                                "{rev.review || "Excellent service provided by the expert."}"
                             </p>
                             <p className="text-[8px] mt-2 font-black uppercase text-slate-400 text-right">{new Date(rev.createdAt).toLocaleDateString()}</p>
                          </div>
                        ))
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center opacity-30 italic">
                           <Star size={40} className="mb-2 text-slate-300" />
                           <p className="text-[10px] font-black uppercase tracking-widest">No Feedback Yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* REQUESTS SECTION */}
                <section>
                  <h3 className="text-xl font-black mb-8 italic uppercase tracking-tighter border-l-4 border-[var(--accent)] pl-4 text-slate-900 dark:text-white">Active Invitations ({requests.length})</h3>
                  <div className="space-y-4">
                    {requests.map((req) => (
                      <div key={req._id} className="bg-white dark:bg-[#121212] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row justify-between items-center gap-6 italic hover:shadow-xl transition-all">
                        <div className="flex items-center gap-5">
                           <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black italic uppercase text-[var(--accent)] border-2 border-slate-50 dark:border-slate-800">
                             {req.customer?.name?.[0]}
                           </div>
                           <div>
                              <h4 className="font-black text-lg text-slate-900 dark:text-white uppercase tracking-tighter italic">{req.customer?.name}</h4>
                              <p className="text-[10px] font-black uppercase text-[var(--accent)] italic tracking-widest">{req.serviceCategory}</p>
                              <div className="flex gap-4 mt-2 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                 <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[var(--accent)]"/> {req.address}</span>
                                 <span className="flex items-center gap-1.5"><Clock size={12} className="text-[var(--accent)]"/> {req.scheduledDate}</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex gap-2 w-full xl:w-auto">
                           <button onClick={() => handleStatusUpdate(req._id, 'cancelled')} className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-500 hover:bg-red-100 transition-colors"><XCircle size={22}/></button>
                           <button onClick={() => handleStatusUpdate(req._id, 'accepted')} className="flex-1 px-10 py-4 rounded-2xl bg-[var(--accent)] text-white font-black text-xs uppercase tracking-widest italic shadow-xl shadow-[var(--accent)]/20 active:scale-95 transition-all">Confirm Job</button>
                        </div>
                      </div>
                    ))}
                    {requests.length === 0 && <div className="py-24 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[50px] opacity-30 font-black italic uppercase text-[10px] tracking-[0.3em]">No Pending Requests ⛱️</div>}
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 italic">
                {activeJobs.map((job) => (
                  <div key={job._id} className="bg-white dark:bg-[#121212] p-10 rounded-[50px] border-2 border-[var(--accent)] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
                        <Clock size={100} className="text-[var(--accent)]" />
                     </div>
                     <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                       <div className="space-y-4">
                         <span className="px-4 py-1 bg-green-500 text-white text-[9px] font-black uppercase rounded-full tracking-widest italic shadow-lg shadow-green-500/20 animate-pulse">Assignment Active</span>
                         <h4 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">{job.customer?.name}</h4>
                         <p className="text-sm text-slate-500 font-bold flex items-center gap-2 italic uppercase tracking-tight"><MapPin size={18} className="text-[var(--accent)]"/> {job.address}</p>
                       </div>
                       <button onClick={() => handleStatusUpdate(job._id, 'completed')} className="w-full md:w-auto px-12 py-5 rounded-2xl bg-green-500 text-white font-black italic uppercase shadow-xl shadow-green-500/20 hover:scale-105 active:scale-95 transition-all">Finish Job <CheckCircle2 className="inline ml-2" size={20}/></button>
                     </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default ProviderDashboard;