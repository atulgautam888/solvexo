import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { 
  Users, ShieldCheck, IndianRupee, UserX, CheckCircle,
  BarChart3, Trash2, Menu, X, Search, Loader2, Briefcase, Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [stats, setStats] = useState({ totalUsers: 0, totalProviders: 0, totalBookings: 0, revenue: 0 });
  const [recentBookings, setRecentBookings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const res = await API.get('/admin/stats');
      const usersRes = await API.get('/admin/users');
      
      setStats({
        totalUsers: res.data.totalUsers,
        totalProviders: res.data.totalProviders,
        totalBookings: res.data.totalBookings,
        revenue: res.data.revenue 
      });
      
      setRecentBookings(res.data.recentBookings || []);
      setAllUsers(usersRes.data);

    } catch (err) {
      console.error("Admin Fetch Error:", err);
      toast.error("Failed to load Bhopal Hub data ⚠️");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const pendingProviders = allUsers.filter(u => u.role === 'provider' && !u.isVerified);

  const handleVerify = async (id, action) => {
    const actionToast = toast.loading("Processing...");
    try {
      if (action === 'approve') {
        await API.put(`/admin/verify/${id}`);
        toast.success("Provider Verified! ✅", { id: actionToast });
      } else {
        await API.delete(`/admin/users/${id}`);
        toast.error("Application Rejected.", { id: actionToast });
      }
      fetchAdminData(); 
    } catch (err) {
      toast.error("Action failed!", { id: actionToast });
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Remove this user from TrustLocal?")) {
      try {
        await API.delete(`/admin/users/${id}`);
        toast.success("User deleted.");
        fetchAdminData();
      } catch (err) {
        toast.error("Delete failed!");
      }
    }
  };

  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.category && u.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const navItems = [
    { id: 'stats', label: 'Overview', icon: BarChart3 },
    { id: 'verify', label: 'Verify Workers', icon: ShieldCheck, count: pendingProviders.length },
    { id: 'users', label: 'Manage Users', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] flex flex-col md:flex-row overflow-x-hidden font-sans transition-colors duration-300">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0c0c0c] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] w-full">
        <h2 className="text-xl font-black italic text-[var(--accent)] uppercase tracking-tighter">Admin Central</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--accent)]">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-[110] w-72 bg-white dark:bg-[#0c0c0c] border-r border-slate-100 dark:border-slate-800 p-6 flex flex-col justify-between transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        <div>
          <div className="mb-10 px-2 italic">
            <h2 className="text-2xl font-black italic text-[var(--accent)] tracking-tighter uppercase">TrustLocal</h2>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Bhopal Control Tower</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }} 
                className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold text-sm transition-all ${activeTab === item.id ? 'text-white shadow-xl shadow-[var(--accent)]/20' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                style={activeTab === item.id ? { backgroundColor: 'var(--accent)' } : {}}>
                <div className="flex items-center gap-4 italic uppercase tracking-tighter"><item.icon size={20} /> {item.label}</div>
                {item.count > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse font-black italic">{item.count}</span>}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-12 w-full overflow-x-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full py-20">
            <Loader2 className="animate-spin text-[var(--accent)] mb-4" size={40} />
            <p className="font-black italic text-slate-400 uppercase tracking-widest text-xs">Accessing Secure Database...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            
            {activeTab === 'stats' && (
              <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <header>
                    <h3 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Bhopal Hub Overview</h3>
                    <p className="text-slate-500 italic font-medium">Real-time platform analytics</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   <div className="bg-white dark:bg-[#121212] p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                      <IndianRupee className="text-green-500 mb-4" size={28} />
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Est. Revenue</p>
                      <h4 className="text-3xl font-black mt-1 italic uppercase tracking-tighter">₹{stats.revenue}</h4>
                   </div>
                   <div className="bg-white dark:bg-[#121212] p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                      <Users className="text-blue-500 mb-4" size={28} />
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Total Users</p>
                      <h4 className="text-3xl font-black mt-1 italic uppercase tracking-tighter">{stats.totalUsers}</h4>
                   </div>
                   <div className="bg-white dark:bg-[#121212] p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                      <Briefcase className="text-[var(--accent)] mb-4" size={28} />
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Active Experts</p>
                      <h4 className="text-3xl font-black mt-1 italic uppercase tracking-tighter">{stats.totalProviders}</h4>
                   </div>
                </div>

                <section>
                    <h4 className="text-xl font-black italic uppercase tracking-tighter mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-[var(--accent)]" /> Recent Bookings
                    </h4>
                    <div className="space-y-4">
                        {recentBookings.map((b) => (
                            <div key={b._id} className="bg-white dark:bg-[#121212] p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center italic">
                                <div>
                                    <p className="text-sm font-black italic"><span className="text-[var(--accent)]">{b.customer?.name}</span> booked <span className="text-blue-500">{b.provider?.name}</span></p>
                                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">{b.serviceCategory} • {b.status}</p>
                                </div>
                                <span className="text-xs font-black text-slate-400">₹{b.price}</span>
                            </div>
                        ))}
                    </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'verify' && (
              <motion.section key="verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-2xl font-black italic uppercase tracking-tighter">Verification Queue</h3>
                <div className="space-y-4">
                  {pendingProviders.map((p) => (
                    <div key={p._id} className="bg-white dark:bg-[#121212] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[var(--accent)]/10 text-[var(--accent)] rounded-2xl flex items-center justify-center font-black italic text-xl uppercase">{p.name[0]}</div>
                        <div>
                          <h4 className="font-black text-lg italic uppercase tracking-tighter">{p.name}</h4>
                          <p className="text-[10px] font-black uppercase text-[var(--accent)] tracking-widest">{p.category} • {p.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={() => handleVerify(p._id, 'reject')} className="flex-1 md:flex-none p-4 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-red-500 transition-all rounded-2xl"><UserX size={20} /></button>
                        <button onClick={() => handleVerify(p._id, 'approve')} className="flex-[2] md:flex-none px-8 py-4 bg-[var(--accent)] text-white rounded-2xl font-black italic shadow-xl shadow-[var(--accent)]/30 uppercase tracking-tighter">APPROVE PRO</button>
                      </div>
                    </div>
                  ))}
                  {pendingProviders.length === 0 && <div className="py-20 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[40px] italic opacity-50 font-black uppercase tracking-widest text-xs">All experts verified 🛡️</div>}
                </div>
              </motion.section>
            )}

            {/* TAB 3: MANAGE USERS (With Verify Badges) */}
            {activeTab === 'users' && (
              <motion.section key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">Bhopal Hub Directory</h3>
                  <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--accent)] transition-colors" size={18} />
                    <input type="text" placeholder="Search name, email or category..." className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#121212] border border-slate-100 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--accent)]/20 font-bold text-sm transition-all italic" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  </div>
                </div>

                <div className="bg-white dark:bg-[#121212] rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 dark:bg-slate-900/50">
                        <tr>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Member Details</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest italic">Role & Verification</th>
                          <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest italic text-right">Delete</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-bold italic">
                        {filteredUsers.map((u) => (
                          <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors uppercase tracking-tighter text-xs">
                            <td className="p-6">
                              <div className="flex items-center gap-2 font-black text-sm italic">
                                {u.name}
                                {/* Naya: Verify Badge Badge */}
                                {u.role === 'provider' && u.isVerified && (
                                  <CheckCircle size={14} className="text-blue-500 fill-blue-500/10" />
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 font-black lowercase tracking-normal flex items-center gap-1">
                                {u.email} {u.category && <span className="uppercase text-[8px] bg-slate-100 dark:bg-slate-800 px-1 rounded">({u.category})</span>}
                              </div>
                            </td>
                            <td className="p-6">
                              <div className="flex flex-col gap-1">
                                <span className={`w-fit text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest ${u.role === 'provider' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20'}`}>
                                  {u.role}
                                </span>
                                {u.role === 'provider' && (
                                  <span className={`text-[8px] font-black italic ${u.isVerified ? 'text-green-500' : 'text-amber-500'}`}>
                                    {u.isVerified ? '● Verified Professional' : '● Verification Pending'}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-6 text-right">
                              <button onClick={() => deleteUser(u._id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.section>
            )}

          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;