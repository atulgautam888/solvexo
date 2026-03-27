import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  IndianRupee, 
  Star, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Phone, 
  MapPin, 
  LogOut,
  Briefcase,
  Menu,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProviderDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile Sidebar Toggle

  // 1. Mock Data for Incoming Requests
  const [requests, setRequests] = useState([
    { id: 'REQ-501', customer: 'Rahul Sharma', service: 'Fan Repair', location: 'Arera Colony', time: 'Today, 4:00 PM', price: 350 },
    { id: 'REQ-502', customer: 'Sonia Verma', service: 'Short Circuit Fix', location: 'Indrapuri', time: 'Tomorrow, 10:00 AM', price: 600 },
  ]);

  // 2. Mock Data for Active Jobs
  const [activeJobs, setActiveJobs] = useState([
    { id: 'JOB-101', customer: 'Abhishek Sahu', service: 'AC Repair', location: 'MP Nagar, Zone 2', status: 'In Progress', phone: '98765XXXXX', time: 'Started 2h ago' }
  ]);

  const stats = [
    { label: 'Total Earnings', value: '₹12,450', icon: IndianRupee, color: 'rgb(34, 197, 94)', bg: 'rgba(34, 197, 94, 0.1)' },
    { label: 'Jobs Done', value: '48', icon: CheckCircle2, color: 'rgb(59, 130, 246)', bg: 'rgba(59, 130, 246, 0.1)' },
    { label: 'Avg Rating', value: '4.9', icon: Star, color: 'rgb(245, 158, 11)', bg: 'rgba(245, 158, 11, 0.1)' },
  ];

  const handleAccept = (req) => {
    const newJob = { ...req, status: 'On the Way', phone: '7974XXXXXX' };
    setActiveJobs([...activeJobs, newJob]);
    setRequests(requests.filter(r => r.id !== req.id));
    alert("Job accepted! Moved to Active Jobs tab.");
  };

  const handleFinish = (id) => {
    setActiveJobs(activeJobs.filter(job => job.id !== id));
    alert("Great work! Job marked as completed.");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] flex flex-col md:flex-row overflow-x-hidden">
      
      {/* --- 1. MOBILE TOP NAV --- */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0c0c0c] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] w-full">
        <h2 className="text-xl font-black italic tracking-tighter" style={{ color: 'var(--accent)' }}>TrustLocal</h2>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--accent)] active:scale-90 transition-transform"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- 2. SIDEBAR (Responsive) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-[110] w-72 bg-white dark:bg-[#0c0c0c] border-r border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div>
          <div className="mb-10 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-[24px] border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg text-xl shrink-0" style={{ backgroundColor: 'var(--accent)' }}>
              {user?.name?.charAt(0) || 'P'}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-black text-sm truncate">{user?.name}</h4>
              <p className="text-[10px] text-green-500 font-black uppercase tracking-widest italic">Expert Partner</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'overview' ? 'text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`} 
              style={activeTab === 'overview' ? { backgroundColor: 'var(--accent)' } : {}}
            >
              <LayoutDashboard size={20} /> Overview
            </button>
            <button 
              onClick={() => { setActiveTab('jobs'); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'jobs' ? 'text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`} 
              style={activeTab === 'jobs' ? { backgroundColor: 'var(--accent)' } : {}}
            >
              <Briefcase size={20} /> Active Jobs ({activeJobs.length})
            </button>
          </nav>
        </div>

        <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-4 p-4 rounded-2xl text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-all mt-10">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* --- 3. MOBILE BACKDROP --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- 4. MAIN CONTENT --- */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto w-full max-w-full">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase">
              {activeTab === 'overview' ? 'Dashboard' : 'Active Work'}
            </h2>
            <p className="text-slate-500 font-medium">Bhopal Hub • {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-3 bg-green-500/10 px-5 py-2.5 rounded-full border border-green-500/20 w-fit">
             <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-widest italic">Online</span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' ? (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white dark:bg-[#121212] p-6 md:p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: s.bg, color: s.color }}>
                      <s.icon size={24} />
                    </div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{s.label}</p>
                    <h3 className="text-2xl md:text-3xl font-black">{s.value}</h3>
                  </div>
                ))}
              </div>

              {/* Invitations */}
              <section>
                <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                   New Invitations <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">{requests.length}</span>
                </h3>
                <div className="space-y-4">
                  {requests.map((req) => (
                    <div key={req.id} className="bg-white dark:bg-[#121212] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                      <div className="flex items-start gap-4 md:gap-6">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-xl shrink-0">👤</div>
                        <div>
                          <h4 className="font-black text-lg md:text-xl">{req.customer}</h4>
                          <p className="text-xs text-[var(--accent)] font-black uppercase tracking-widest mt-1 italic">{req.service}</p>
                          <div className="flex flex-wrap gap-4 mt-3">
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5"><MapPin size={14}/> {req.location}</span>
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5"><Clock size={14}/> {req.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:gap-3">
                        <button onClick={() => setRequests(requests.filter(r => r.id !== req.id))} className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-all"><XCircle size={20}/></button>
                        <button onClick={() => handleAccept(req)} className="flex-1 xl:flex-none px-6 md:px-10 py-4 md:py-5 rounded-2xl text-white font-black text-sm shadow-xl hover:scale-105 transition-all" style={{ backgroundColor: 'var(--accent)' }}>Accept Job</button>
                      </div>
                    </div>
                  ))}
                  {requests.length === 0 && <p className="text-center py-10 opacity-50 italic">Waiting for new requests... ☕</p>}
                </div>
              </section>
            </motion.div>
          ) : (
            /* --- ACTIVE JOBS VIEW --- */
            <motion.div key="jobs" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-xl font-black mb-8">Ongoing Tasks</h3>
              {activeJobs.map((job) => (
                <div key={job.id} className="bg-white dark:bg-[#121212] p-6 md:p-8 rounded-[40px] border-2 border-[var(--accent)] shadow-2xl relative overflow-hidden group">
                  <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded-full">In Progress</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.id}</span>
                      </div>
                      <h4 className="text-2xl md:text-3xl font-black tracking-tight">{job.customer}</h4>
                      <div className="flex flex-col md:flex-row md:flex-wrap gap-3 md:gap-6 text-slate-500 font-bold text-sm">
                         <span className="flex items-center gap-2"><Briefcase size={18} className="text-[var(--accent)]"/> {job.service}</span>
                         <span className="flex items-center gap-2"><MapPin size={18} className="text-[var(--accent)]"/> {job.location}</span>
                         <span className="flex items-center gap-2"><Phone size={18} className="text-[var(--accent)]"/> {job.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full xl:w-auto mt-4 xl:mt-0">
                      <a href={`tel:${job.phone}`} className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-[var(--accent)] transition-all">
                        <Phone size={24} />
                      </a>
                      <button 
                        onClick={() => handleFinish(job.id)}
                        className="flex-1 xl:flex-none px-10 py-5 rounded-2xl text-white font-black shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                        style={{ backgroundColor: 'var(--accent)' }}
                      >
                        Finish Job <CheckCircle2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {activeJobs.length === 0 && (
                <div className="py-20 text-center opacity-30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px]">
                  <p className="font-black uppercase tracking-widest">No active jobs. Relax! ⛱️</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default ProviderDashboard;