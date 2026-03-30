import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { 
  LayoutDashboard, IndianRupee, Star, CheckCircle2, XCircle, Clock, 
  MapPin, Calendar, LogOut, Briefcase, Menu, X, Loader2, Settings 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProviderDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Nayi State Stats ke liye
  const [providerStats, setProviderStats] = useState({ averageRating: "0.0", totalReviews: 0 });

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get('/bookings/my-jobs');
      // Backend ab { jobs, stats } bhej raha hai
      setJobs(res.data.jobs || []);
      setProviderStats(res.data.stats || { averageRating: "0.0", totalReviews: 0 });
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
      toast.error("Could not load jobs ⚠️");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    const loadingToast = toast.loading("Updating status...");
    try {
      await API.put('/bookings/update-status', { bookingId, status: newStatus });
      
      if (newStatus === 'accepted') toast.success("Job Accepted! 🚀", { id: loadingToast });
      else if (newStatus === 'completed') toast.success("Job Completed! ✅", { id: loadingToast });
      else if (newStatus === 'cancelled') toast.error("Job Cancelled.", { id: loadingToast });

      fetchJobs();
    } catch (err) {
      toast.error("Update failed!", { id: loadingToast });
    }
  };

  const requests = jobs.filter(j => j.status === 'pending');
  const activeJobs = jobs.filter(j => j.status === 'accepted');
  const completedCount = jobs.filter(j => j.status === 'completed').length;

  // DYNAMIC STATS ARRAY
  const statsList = [
    { label: 'Total Earnings', value: `₹${completedCount * 249}`, icon: IndianRupee, color: 'rgb(34, 197, 94)', bg: 'rgba(34, 197, 94, 0.1)' },
    { label: 'Jobs Done', value: completedCount.toString(), icon: CheckCircle2, color: 'rgb(59, 130, 246)', bg: 'rgba(59, 130, 246, 0.1)' },
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] flex flex-col md:flex-row overflow-x-hidden font-sans">

      {/* MOBILE NAV */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0c0c0c] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] w-full">
        <h2 className="text-xl font-black italic tracking-tighter" style={{ color: 'var(--accent)' }}>TrustLocal</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--accent)]">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-[110] w-72 bg-white dark:bg-[#0c0c0c] border-r border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-between transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div>
          <div className="mb-10 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-[24px] border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shrink-0 border-2 border-[var(--accent)]/20 flex items-center justify-center">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-black italic text-xl uppercase" style={{ backgroundColor: 'var(--accent)' }}>
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>
            <div className="overflow-hidden text-sm italic font-black uppercase tracking-tight">
              <h4 className="truncate">{user?.name}</h4>
              <p className="text-[10px] text-green-500 tracking-widest">{user?.category} EXPERT</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'overview' ? 'text-white shadow-xl shadow-[var(--accent)]/20' : 'text-slate-500'}`} style={activeTab === 'overview' ? { backgroundColor: 'var(--accent)' } : {}}>
              <LayoutDashboard size={20} /> Overview
            </button>
            <button onClick={() => { setActiveTab('jobs'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'jobs' ? 'text-white shadow-xl shadow-[var(--accent)]/20' : 'text-slate-500'}`} style={activeTab === 'jobs' ? { backgroundColor: 'var(--accent)' } : {}}>
              <Briefcase size={20} /> Active Work ({activeJobs.length})
            </button>
            <button onClick={() => navigate('/profile')} className="w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all italic italic uppercase tracking-tighter">
              <Settings size={20} /> Settings
            </button>
          </nav>
        </div>
        <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-4 p-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-all italic italic uppercase tracking-widest text-xs">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto w-full max-w-full">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="italic">
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase tracking-tighter">Provider Panel</h2>
            <p className="text-slate-500 font-medium italic text-sm">Managing Bhopal's essential services hub</p>
          </div>
          <div className="flex items-center gap-3 bg-green-500/10 px-5 py-2.5 rounded-full border border-green-500/20 w-fit">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black text-green-600 uppercase tracking-widest italic">Live Status</span>
          </div>
        </header>

        {loading ? (
            <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[var(--accent)]" size={40} /></div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === 'overview' ? (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* DYNAMIC STATS CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                  {statsList.map((s, i) => (
                    <div key={i} className="bg-white dark:bg-[#121212] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm italic">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: s.bg, color: s.color }}><s.icon size={24} /></div>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{s.label}</p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl md:text-3xl font-black">{s.value}</h3>
                        {s.subText && <span className="text-[10px] text-slate-400 font-bold">{s.subText}</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <section>
                  <h3 className="text-xl font-black mb-6 italic tracking-tight text-slate-800 dark:text-slate-200 uppercase tracking-tighter">New Invitations ({requests.length})</h3>
                  <div className="space-y-4">
                    {requests.map((req) => (
                      <div key={req._id} className="bg-white dark:bg-[#121212] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row xl:items-center justify-between gap-6 italic">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xl shrink-0 italic font-black overflow-hidden border-2 border-slate-100 dark:border-slate-800">
                            {req.customer?.image ? (
                              <img src={req.customer.image} alt="Customer" className="w-full h-full object-cover" />
                            ) : (
                              <span className="uppercase">{req.customer?.name?.charAt(0)}</span>
                            )}
                          </div>
                          <div>
                            <h4 className="font-black text-lg text-slate-900 dark:text-white">{req.customer?.name || "Customer"}</h4>
                            <p className="text-xs text-[var(--accent)] font-black uppercase tracking-widest italic">{req.serviceDetails}</p>
                            <div className="flex flex-wrap gap-4 mt-3 text-xs font-bold text-slate-400">
                              <span className="flex items-center gap-1.5"><MapPin size={14} /> {req.address}</span>
                              <span className="flex items-center gap-1.5"><Clock size={14} /> {req.scheduledDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full xl:w-auto">
                          <button onClick={() => handleStatusUpdate(req._id, 'cancelled')} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 text-red-500 transition-all active:scale-90 hover:bg-red-50"><XCircle size={20} /></button>
                          <button onClick={() => handleStatusUpdate(req._id, 'accepted')} className="flex-1 px-8 py-4 rounded-2xl text-white font-black text-sm bg-[var(--accent)] shadow-xl shadow-[var(--accent)]/30 active:scale-95 transition-all">Accept Job</button>
                        </div>
                      </div>
                    ))}
                    {requests.length === 0 && <p className="text-center py-20 bg-slate-50/50 dark:bg-slate-900/50 rounded-[40px] border-2 border-dashed border-slate-100 dark:border-slate-800 opacity-50 italic font-black uppercase tracking-widest text-xs">Waiting for new requests... ☕</p>}
                  </div>
                </section>
              </motion.div>
            ) : (
              <motion.div key="jobs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 italic">
                <h3 className="text-xl font-black mb-8 italic tracking-tight text-slate-800 dark:text-slate-200 uppercase tracking-tighter">Ongoing Tasks</h3>
                {activeJobs.map((job) => (
                  <div key={job._id} className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border-2 border-[var(--accent)] shadow-2xl">
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded-full tracking-widest">Work in Progress</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-200">
                              {job.customer?.image ? (
                                <img src={job.customer.image} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center font-black">{job.customer?.name[0]}</div>
                              )}
                           </div>
                           <h4 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white italic">{job.customer?.name || "Service Expert"}</h4>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 text-slate-500 font-bold text-sm">
                           <span className="flex items-center gap-2 italic"><MapPin size={18} className="text-[var(--accent)]"/> {job.address}</span>
                           <span className="flex items-center gap-2 italic"><Calendar size={18} className="text-[var(--accent)]"/> {job.scheduledDate}</span>
                        </div>
                      </div>
                      <button onClick={() => handleStatusUpdate(job._id, 'completed')} className="w-full xl:w-auto px-10 py-5 rounded-2xl text-white font-black bg-green-500 shadow-xl shadow-green-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all italic">
                        Finish Job <CheckCircle2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                {activeJobs.length === 0 && <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px] italic opacity-50 font-black uppercase tracking-widest text-xs">No active jobs ⛱️</div>}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default ProviderDashboard;