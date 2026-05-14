import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import BookingCard from '../components/BookingCard';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { 
  Calendar, User as UserIcon, LogOut, Compass, Plus,
  Menu, X, Loader2, PackageOpen, Settings, Clock, CheckCircle2, IndianRupee
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Bookings Logic
  const fetchMyBookings = async (isAutoRefresh = false) => {
    try {
      if (!isAutoRefresh) setLoading(true);
      const res = await API.get('/bookings/my-bookings');
      setBookings(res.data);
    } catch (err) {
      console.error("Dashboard Fetch Error:", err);
      if (!isAutoRefresh) toast.error("Failed to sync bookings ⚠️");
    } finally {
      if (!isAutoRefresh) setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
    const interval = setInterval(() => {
      fetchMyBookings(true);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const activeBookings = bookings.filter(b => b.status === 'pending' || b.status === 'accepted');
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const totalSpent = bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0);

  const sidebarItems = [
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'explore', label: 'Explore Services', icon: Compass, link: '/services' },
    { id: 'profile', label: 'Profile Settings', icon: Settings, link: '/profile' },
  ];

  const handleNavigation = (item) => {
    if (item.link) {
      navigate(item.link);
    } else {
      setActiveTab(item.id);
      setIsSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out from TrustLocal. See you soon!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] flex flex-col md:flex-row overflow-x-hidden font-sans transition-colors duration-300">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0c0c0c] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] w-full">
        <h2 className="text-xl font-black italic tracking-tighter uppercase" style={{ color: 'var(--accent)' }}>TrustLocal</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--accent)]">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-[110] w-72 bg-white dark:bg-[#0c0c0c] border-r border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-between transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/20' : '-translate-x-full'}`}>
        <div>
          <div className="mb-10 flex items-center gap-3 px-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shrink-0 border-2 border-[var(--accent)]/20 flex items-center justify-center bg-white">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-black italic text-xl uppercase" style={{ backgroundColor: 'var(--accent)' }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div className="overflow-hidden text-sm italic font-black uppercase tracking-tight">
              <h4 className="truncate text-slate-900 dark:text-white">{user?.name}</h4>
              <p className="text-[10px] text-[var(--accent)] tracking-widest uppercase italic">Verified Member</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-sm uppercase italic tracking-tighter ${
                  activeTab === item.id ? 'text-white shadow-xl shadow-[var(--accent)]/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                style={activeTab === item.id ? { backgroundColor: 'var(--accent)' } : {}}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 font-black text-xs hover:bg-red-50 dark:hover:bg-red-900/10 transition-all italic uppercase tracking-widest">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto w-full max-w-full">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div className="italic">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight italic uppercase tracking-tighter text-slate-900 dark:text-white">Customer Hub</h2>
            <p className="text-slate-500 font-black italic text-xs uppercase tracking-widest opacity-70">Managing your Bhopal services & records</p>
          </div>
          <Link to="/services" className="group w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-black shadow-xl hover:scale-105 transition-all italic uppercase tracking-tighter" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 10px 15px -3px rgba(var(--accent-rgb), 0.3)' }}>
            <Plus size={20} /> New Service Request
          </Link>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'bookings' && (
            <motion.div key="bookings_view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              
              {/* VISUAL STATS SUMMARY */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm italic">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4"><Clock size={20} /></div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Active Requests</p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white italic">{activeBookings.length}</h3>
                </div>
                <div className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm italic">
                  <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4"><CheckCircle2 size={20} /></div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Services Done</p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white italic">{completedCount}</h3>
                </div>
                <div className="bg-white dark:bg-[#121212] p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm italic">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4"><IndianRupee size={20} /></div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Invested</p>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white italic">₹{totalSpent}</h3>
                </div>
              </div>

              {/* BOOKINGS GRID */}
              <section className="space-y-6">
                <h3 className="font-black text-xl italic tracking-tighter text-slate-800 dark:text-slate-200 uppercase border-l-4 border-[var(--accent)] pl-4">Service Timeline</h3>
                
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-24 opacity-50">
                    <Loader2 size={40} className="animate-spin text-[var(--accent)] mb-4" />
                    <p className="font-black italic uppercase tracking-widest text-[10px]">Syncing Records...</p>
                  </div>
                ) : bookings.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 italic">
                    {bookings.map((booking) => (
                      <BookingCard key={booking._id} booking={booking} onRefresh={fetchMyBookings} />
                    ))}
                  </div>
                ) : (
                  <div className="py-24 text-center bg-white dark:bg-[#121212] border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[50px] italic flex flex-col items-center">
                    <PackageOpen size={60} className="text-slate-200 dark:text-slate-800 mb-6" />
                    <p className="font-black uppercase tracking-[0.2em] text-xs text-slate-400">No Service History Found In Bhopal</p>
                    <Link to="/services" className="mt-6 text-[var(--accent)] font-black uppercase text-xs underline decoration-2 underline-offset-4">Explore Expert Services</Link>
                  </div>
                )}
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default UserDashboard;