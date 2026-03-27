import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Search, MapPin, ChevronRight, Users, Award } from 'lucide-react';

const SERVICES = [
  { id: 1, name: "Electrician", icon: "⚡", color: "bg-amber-50", darkColor: "dark:bg-amber-900/10", shadow: "shadow-amber-100", path: "/services?cat=Electrician" },
  { id: 2, name: "Plumber", icon: "🔧", color: "bg-blue-50", darkColor: "dark:bg-blue-900/10", shadow: "shadow-blue-100", path: "/services?cat=Plumber" },
  { id: 3, name: "AC Repair", icon: "❄️", color: "bg-cyan-50", darkColor: "dark:bg-cyan-900/10", shadow: "shadow-cyan-100", path: "/services?cat=AC Repair" },
  { id: 4, name: "Cleaning", icon: "🧹", color: "bg-purple-50", darkColor: "dark:bg-purple-900/10", shadow: "shadow-purple-100", path: "/services?cat=Cleaning" },
];

const Home = () => {
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const floatingVars = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="relative min-h-screen overflow-hidden bg-white dark:bg-[#111111]">
      
      {/* 🌌 DYNAMIC BACKGROUND ANIMATION */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-10 pointer-events-none">
        <motion.div variants={floatingVars} animate="animate" className="absolute top-1/4 left-10 w-64 h-64 rounded-full blur-[100px]" style={{ backgroundColor: 'var(--accent)' }}></motion.div>
        <motion.div variants={floatingVars} animate="animate" className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-400 rounded-full blur-[120px]" style={{ animationDelay: '2s' }}></motion.div>
        <ShieldCheck className="absolute top-40 right-[15%] text-slate-100 dark:text-slate-800" size={120} strokeWidth={1} />
        <Zap className="absolute bottom-40 left-[10%] text-slate-100 dark:text-slate-800" size={100} strokeWidth={1} />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={containerVars}>
          <motion.div 
            variants={itemVars} 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black mb-6 uppercase tracking-widest shadow-inner border"
            style={{ backgroundColor: 'rgba(var(--accent-rgb), 0.1)', color: 'var(--accent)', borderColor: 'rgba(var(--accent-rgb), 0.2)' }}
          >
            <ShieldCheck size={14} fill="currentColor" className="opacity-20" /> 100% Verified in Bhopal
          </motion.div>
          
          <motion.h1 variants={itemVars} className="text-6xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tighter text-slate-950 dark:text-white">
            Expert Help, <br />
            <span style={{ color: 'var(--accent)' }} className="relative inline-block">
              One Tap Away.
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }} className="absolute left-0 bottom-2 w-full h-1 opacity-30 rounded-full origin-left" style={{ backgroundColor: 'var(--accent)' }} />
            </span>
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-lg leading-relaxed">
            The reliable alternative to unverified local contacts. Get transparent pricing & professional service in Bhopal.
          </motion.p>

          {/* Search Bar */}
          <motion.div variants={itemVars} className="bg-white dark:bg-slate-900 p-2.5 rounded-3xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2 transition-all">
            <div className="flex-1 flex items-center px-4 py-3 border-r border-slate-100 dark:border-slate-800">
              <Search className="text-slate-400 mr-3" size={20} />
              <input type="text" placeholder="What do you need help with?" className="w-full outline-none text-sm font-semibold bg-transparent" />
            </div>
            <div className="flex items-center px-4 py-3">
              <MapPin style={{ color: 'var(--accent)' }} className="mr-3" size={20} />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Bhopal, MP</span>
            </div>
            <Link 
              to="/services" 
              className="text-white px-8 py-4 rounded-2xl font-black hover:opacity-90 transition active:scale-95 text-sm flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Search Pro
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: Interactive Grid */}
        <motion.div variants={containerVars} className="grid grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <Link to={s.path} key={s.id}>
              <motion.div 
                variants={itemVars}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative bg-white dark:bg-slate-900 border dark:border-slate-800 p-8 rounded-[32px] shadow-sm hover:shadow-2xl transition-all ${s.shadow} dark:shadow-none overflow-hidden group h-full`}
              >
                <div className={`absolute -inset-1 ${s.color} ${s.darkColor} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className={`${s.color} ${s.darkColor} h-20 w-20 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-inner`}>
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-1.5 text-slate-950 dark:text-white">{s.name}</h3>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 transition-colors" style={{ '--hover-color': 'var(--accent)' }}>
                    <span className="group-hover:text-[var(--accent)] transition-colors">Book Service</span> 
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform group-hover:text-[var(--accent)]" />
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* --- TRUST STATS --- */}
      <motion.section variants={containerVars} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative z-10 bg-slate-50 dark:bg-[#0a0a0a] border-y border-slate-100 dark:border-slate-800 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            { id: 1, icon: Users, stat: "10k+", label: "Trusted Customers", color: "text-blue-600", bg: "bg-blue-50" },
            { id: 2, icon: Award, stat: "500+", label: "Verified Partners", color: "text-orange-600", bg: "bg-orange-50" },
            { id: 3, icon: ShieldCheck, stat: "Bhopal", label: "Focused & Reliable", color: "text-[var(--accent)]", bg: "bg-purple-50", useAccent: true },
          ].map(item => (
            <motion.div key={item.id} variants={itemVars} whileHover={{ scale: 1.03 }} className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:border-opacity-50" style={item.useAccent ? { borderColor: 'var(--accent)' } : {}}>
              <div className={`w-16 h-16 ${item.bg} dark:bg-opacity-10 rounded-2xl flex items-center justify-center ${item.color} mb-6 mx-auto shadow-inner`} style={item.useAccent ? { color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' } : {}}>
                <item.icon size={32} />
              </div>
              <h4 className="text-5xl font-black mb-2 leading-none">{item.stat}</h4>
              <p className="text-slate-500 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;