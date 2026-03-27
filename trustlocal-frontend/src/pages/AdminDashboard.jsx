import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ShieldCheck, AlertCircle, IndianRupee, UserX, 
  CheckCircle, BarChart3, Trash2, Menu, X, Search 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- 1. States (Approve/Reject Logic Ke Liye) ---
  const [pendingProviders, setPendingProviders] = useState([
    { id: 'P-901', name: 'Suresh Kumar', email: 'suresh@test.com', category: 'Electrician', area: 'Kolar Road', date: '2 hours ago' },
    { id: 'P-902', name: 'Ramesh Yadav', email: 'ramesh@test.com', category: 'Plumber', area: 'Bairagarh', date: '5 hours ago' },
  ]);

  const [allUsers, setAllUsers] = useState([
    { id: 'U-101', name: 'Abhishek Sahu', email: 'abhishek@test.com', role: 'Customer', status: 'Active' },
    { id: 'U-102', name: 'Rahul Sharma', email: 'rahul@test.com', role: 'Provider', status: 'Active' },
  ]);

  // --- 2. Handlers ---
  const handleVerify = (provider, action) => {
    if (action === 'approve') {
      const newUser = { id: provider.id, name: provider.name, email: provider.email, role: 'Provider', status: 'Active' };
      setAllUsers([...allUsers, newUser]);
    }
    setPendingProviders(pendingProviders.filter(p => p.id !== provider.id));
  };

  const deleteUser = (id) => {
    if(window.confirm("Remove user?")) setAllUsers(allUsers.filter(u => u.id !== id));
  };

  const navItems = [
    { id: 'stats', label: 'Overview', icon: BarChart3 },
    { id: 'verify', label: 'Verify Workers', icon: ShieldCheck, count: pendingProviders.length },
    { id: 'users', label: 'Manage Users', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] flex flex-col md:flex-row overflow-x-hidden">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#0c0c0c] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] w-full">
        <h2 className="text-xl font-black italic text-[var(--accent)]">Admin Central</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[var(--accent)]">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-[110] w-72 bg-white dark:bg-[#0c0c0c] border-r border-slate-100 dark:border-slate-800 p-6 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 px-2 hidden md:block">
          <h2 className="text-2xl font-black italic text-[var(--accent)]">Admin Central</h2>
          <p className="text-[10px] font-black uppercase text-slate-400">Control Tower</p>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }} 
              className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold text-sm transition-all ${activeTab === item.id ? 'text-white shadow-xl' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
              style={activeTab === item.id ? { backgroundColor: 'var(--accent)' } : {}}>
              <div className="flex items-center gap-4"><item.icon size={20} /> {item.label}</div>
              {item.count > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{item.count}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* BACKDROP */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] md:hidden" />
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-12 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: STATS */}
          {activeTab === 'stats' && (
            <motion.div key="stats" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <h3 className="text-2xl md:text-4xl font-black">System Overview</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="bg-white dark:bg-[#121212] p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
                    <IndianRupee className="text-purple-500 mb-4" size={28} />
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Revenue</p>
                    <h4 className="text-3xl font-black mt-1">₹45,200</h4>
                 </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: VERIFY WORKERS */}
          {activeTab === 'verify' && (
            <motion.section key="verify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h3 className="text-2xl font-black italic">Verification Queue</h3>
              <div className="space-y-4">
                {pendingProviders.map((p) => (
                  <div key={p.id} className="bg-white dark:bg-[#121212] p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--accent)]/10 text-[var(--accent)] rounded-2xl flex items-center justify-center font-black">{p.name[0]}</div>
                      <div><h4 className="font-black">{p.name}</h4><p className="text-xs text-slate-500">{p.category} • {p.area}</p></div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleVerify(p, 'reject')} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-red-500"><UserX size={20} /></button>
                      <button onClick={() => handleVerify(p, 'approve')} className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-bold shadow-lg">Approve</button>
                    </div>
                  </div>
                ))}
                {pendingProviders.length === 0 && <p className="text-center py-10 opacity-50">No pending requests!</p>}
              </div>
            </motion.section>
          )}

          {/* TAB 3: MANAGE USERS */}
          {activeTab === 'users' && (
            <motion.section key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <h3 className="text-2xl font-black">Platform Users</h3>
              <div className="bg-white dark:bg-[#121212] rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-400">User</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-400">Role</th>
                      <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {allUsers.map((u) => (
                      <tr key={u.id}>
                        <td className="p-6"><div className="font-bold text-sm">{u.name}</div><div className="text-xs text-slate-400">{u.email}</div></td>
                        <td className="p-6"><span className="text-[10px] font-black px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full">{u.role}</span></td>
                        <td className="p-6 text-right"><button onClick={() => deleteUser(u.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={18} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;