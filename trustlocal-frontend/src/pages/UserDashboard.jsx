import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import BookingCard from '../components/BookingCard';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { 
  Calendar, 
  User as UserIcon, 
  LogOut, 
  Compass, 
  Plus,
  Menu,
  X,
  Loader2,
  PackageOpen,
  Settings
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

    // Auto-sync for status updates (Bhopal Live Sync)
    const interval = setInterval(() => {
      fetchMyBookings(true);
    }, 60000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const sidebarItems = [
    { id: 'explore', label: 'Explore Services', icon: Compass, link: '/services' },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] flex flex-col md:flex-row overflow-x-hidden font-sans">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0c0c0c] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] w-full">
        <h2 className="text-xl font-black italic text-[var(--accent)] tracking-tighter">TrustLocal</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--accent)]">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-[110] w-72 bg-white dark:bg-[#0c0c0c] border-r border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-between transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shrink-0 border-2 border-slate-100 dark:border-slate-800 flex items-center justify-center">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-black italic text-xl uppercase" style={{ backgroundColor: 'var(--accent)' }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
            </div>
            <div className="overflow-hidden text-sm italic font-black uppercase tracking-tight">
              <h4 className="truncate">{user?.name}</h4>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">Verified Customer</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${
                  activeTab === item.id ? 'text-white shadow-xl shadow-[var(--accent)]/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                style={activeTab === item.id ? { backgroundColor: 'var(--accent)' } : {}}
              >
                <item.icon size={20} className="italic" />
                <span className="italic">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <button onClick={handleLogout} className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-all italic uppercase tracking-widest text-xs">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto w-full max-w-full">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight italic uppercase tracking-tighter">User Dashboard</h2>
            <p className="text-slate-500 font-medium italic">Welcome back to Bhopal Hub, {user?.name.split(' ')[0]}!</p>
          </div>
          <Link to="/services" className="group w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-black shadow-xl hover:scale-105 transition-all italic uppercase tracking-tighter" style={{ backgroundColor: 'var(--accent)' }}>
            <Plus size={20} /> Instant Booking
          </Link>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'bookings' ? (
            <motion.section key="bookings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h3 className="font-black text-xl mb-4 italic tracking-tight text-slate-800 dark:text-slate-200 uppercase tracking-tighter">Active Bookings</h3>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20"><Loader2 size={40} className="animate-spin text-[var(--accent)] mb-4" /><p className="font-black italic text-slate-400 text-xs uppercase tracking-widest">Syncing with server...</p></div>
              ) : bookings.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 italic">
                  {bookings.map((booking) => (
                    // UPDATED: onRefresh pass kiya taaki review ke baad list reload ho
                    <BookingCard key={booking._id} booking={booking} onRefresh={fetchMyBookings} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-white dark:bg-[#111] border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[40px] italic">
                   <PackageOpen size={50} className="mx-auto text-slate-300 mb-4" />
                   <p className="font-bold text-slate-400 italic">No bookings found in Bhopal. Start exploring!</p>
                   <Link to="/services" className="mt-4 inline-block text-[var(--accent)] font-black uppercase tracking-tighter text-sm underline">Find Experts</Link>
                </div>
              )}
            </motion.section>
          ) : (
            <motion.section key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white dark:bg-[#111111] rounded-[40px] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-[30px] overflow-hidden border-4 border-[var(--accent)] shadow-2xl flex items-center justify-center bg-slate-50">
                    {user?.image ? (
                      <img src={user.image} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-black text-slate-300 uppercase">
                        {user?.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter">Quick Profile</h3>
                    <p className="text-slate-500 font-bold text-sm italic uppercase tracking-widest text-[10px]">Bhopal Hub Member</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 italic">
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Full Name</label>
                      <p className="font-bold text-lg mt-1 italic uppercase tracking-tighter">{user?.name}</p>
                   </div>
                   <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Email Address</label>
                      <p className="font-bold text-lg mt-1 italic uppercase tracking-tighter">{user?.email}</p>
                   </div>
                </div>
                <button onClick={() => navigate('/profile')} className="mt-8 text-[var(--accent)] font-black text-sm underline italic uppercase tracking-tighter">Edit Detailed Profile</button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default UserDashboard;