import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import BookingCard from '../components/BookingCard';
import { 
  Calendar, 
  User as UserIcon, 
  LogOut, 
  Compass, 
  Plus,
  Menu,
  X
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle state

  const MOCK_BOOKINGS = [
    { id: 'BK-9921', provider: 'Atul Electric Services', service: 'Ceiling Fan Repair', date: '28 March, 2026', status: 'Pending', price: 249, location: 'MP Nagar' },
    { id: 'BK-8852', provider: 'Bhopal PlumbFix', service: 'Kitchen Tap Leakage', date: '25 March, 2026', status: 'Completed', price: 199, location: 'Arera Colony' },
    { id: 'BK-7741', provider: 'Quick AC Repair', service: 'AC Gas Refill', date: '20 March, 2026', status: 'Cancelled', price: 499, location: 'Indrapuri' },
  ];

  const sidebarItems = [
    { id: 'explore', label: 'Explore Services', icon: Compass, link: '/services' },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile Settings', icon: UserIcon },
  ];

  const handleNavigation = (item) => {
    if (item.link) {
      navigate(item.link);
    } else {
      setActiveTab(item.id);
      setIsSidebarOpen(false); // Mobile par click ke baad close
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] flex flex-col md:flex-row overflow-x-hidden">
      
      {/* --- 1. MOBILE TOP HEADER --- */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0c0c0c] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] w-full">
        <h2 className="text-xl font-black italic text-[var(--accent)]">TrustLocal</h2>
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
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg text-xl shrink-0" style={{ backgroundColor: 'var(--accent)' }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-black text-sm truncate">{user?.name}</h4>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">Verified Customer</p>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${
                  activeTab === item.id 
                    ? 'text-white shadow-xl' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
                } ${item.id === 'explore' ? 'mb-4 border border-dashed border-slate-200 dark:border-slate-700' : ''}`}
                style={activeTab === item.id ? { backgroundColor: 'var(--accent)' } : {}}
              >
                <item.icon size={20} className={item.id === 'explore' ? 'text-[var(--accent)]' : ''} />
                <span className={item.id === 'explore' ? 'text-slate-900 dark:text-white' : ''}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <button 
          onClick={() => { logout(); navigate('/'); }}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-all mt-10"
        >
          <LogOut size={20} />
          <span>Logout</span>
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

      {/* --- 4. MAIN CONTENT AREA --- */}
      <main className="flex-1 p-4 md:p-12 overflow-y-auto w-full max-w-full">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">User Dashboard</h2>
            <p className="text-slate-500 font-medium">Manage and track your expert bookings.</p>
          </div>

          <Link 
            to="/services"
            className="group w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-black shadow-xl hover:scale-105 active:scale-95 transition-all"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <Plus size={20} />
            Instant Booking
          </Link>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'bookings' ? (
            <motion.section 
              key="bookings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="font-black text-xl mb-4">Active Bookings</h3>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {MOCK_BOOKINGS.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
              {MOCK_BOOKINGS.length === 0 && (
                <div className="py-20 text-center opacity-30 border-2 border-dashed rounded-[40px]">
                   <p className="font-bold">No bookings yet. Start exploring services!</p>
                </div>
              )}
            </motion.section>
          ) : (
            <motion.section key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white dark:bg-[#111111] rounded-[40px] p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-2xl font-black mb-6">Account Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                   <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                      <p className="font-bold text-lg mt-1">{user?.name}</p>
                   </div>
                   <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                      <p className="font-bold text-lg mt-1">{user?.email}</p>
                   </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default UserDashboard;