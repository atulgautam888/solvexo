import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate add kiya
import { 
  ShieldCheck, Zap, Search, MapPin, ChevronRight, 
  Users, Award, Loader2, ArrowRight 
} from 'lucide-react';
import API from '../api/axios';
import ServiceCard from '../components/ServiceCard';

const SERVICES = [
  { id: 1, name: "Electrician", icon: "⚡", color: "bg-amber-50", darkColor: "dark:bg-amber-900/10", shadow: "shadow-amber-100", path: "/services?cat=Electrician" },
  { id: 2, name: "Plumber", icon: "🔧", color: "bg-blue-50", darkColor: "dark:bg-blue-900/10", shadow: "shadow-blue-100", path: "/services?cat=Plumber" },
  { id: 3, name: "AC Repair", icon: "❄️", color: "bg-cyan-50", darkColor: "dark:bg-cyan-900/10", shadow: "shadow-cyan-100", path: "/services?cat=AC Repair" },
  { id: 4, name: "Cleaning", icon: "🧹", color: "bg-purple-50", darkColor: "dark:bg-purple-900/10", shadow: "shadow-purple-100", path: "/services?cat=Cleaning" },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [topProviders, setTopProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Top Rated Experts Logic
  useEffect(() => {
    const fetchTopExperts = async () => {
      try {
        setLoading(true);
        const res = await API.get('/auth/top-providers');
        setTopProviders(res.data);
      } catch (err) {
        console.error("Top Providers Fetch Error");
      } finally {
        setLoading(false);
      }
    };
    fetchTopExperts();
  }, []);

  // 2. Search Handler Function
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Encode query to handle spaces and special chars
      navigate(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/services');
    }
  };

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
    <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }} className="relative min-h-screen overflow-hidden bg-white dark:bg-[#111111] font-sans">
      
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
          
          <motion.h1 variants={itemVars} className="text-6xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tighter text-slate-950 dark:text-white italic uppercase">
            Expert Help, <br />
            <span style={{ color: 'var(--accent)' }} className="relative inline-block uppercase italic">
              One Tap Away.
              <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }} className="absolute left-0 bottom-2 w-full h-1 opacity-30 rounded-full origin-left" style={{ backgroundColor: 'var(--accent)' }} />
            </span>
          </motion.h1>
          
          <motion.p variants={itemVars} className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-lg leading-relaxed font-medium italic">
            The reliable alternative to unverified local contacts. Get transparent pricing & professional service in Bhopal.
          </motion.p>

          {/* --- FUNCTIONAL SEARCH BAR --- */}
          <motion.form 
            onSubmit={handleSearch}
            variants={itemVars} 
            className="bg-white dark:bg-slate-900 p-2.5 rounded-3xl shadow-xl dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-2 transition-all"
          >
            <div className="flex-1 flex items-center px-4 py-3 border-r border-slate-100 dark:border-slate-800">
              <Search className="text-slate-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="What do you need help with?" 
                className="w-full outline-none text-sm font-black bg-transparent italic"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center px-4 py-3">
              <MapPin style={{ color: 'var(--accent)' }} className="mr-3" size={20} />
              <span className="text-sm font-black text-slate-700 dark:text-slate-300 italic">Bhopal, MP</span>
            </div>
            <button 
              type="submit"
              className="text-white px-8 py-4 rounded-2xl font-black hover:opacity-90 transition active:scale-95 text-sm flex items-center justify-center uppercase italic"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Search Experts
            </button>
          </motion.form>
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
                  <h3 className="text-xl font-black mb-1.5 text-slate-950 dark:text-white italic uppercase tracking-tighter">{s.name}</h3>
                  <p className="text-xs text-slate-500 font-black flex items-center gap-1.5 transition-colors italic uppercase tracking-widest">
                    <span className="group-hover:text-[var(--accent)] transition-colors">Book Now</span> 
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform group-hover:text-[var(--accent)]" />
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* --- TOP RATED EXPERTS SECTION --- */}
      <section className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 italic">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <Zap size={20} className="text-amber-500" fill="#f59e0b" />
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest">Bhopal's Best</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
              Bhopal Hub's <span style={{ color: 'var(--accent)' }}>Choice</span>
            </h2>
            <p className="text-slate-500 italic font-medium max-w-lg mt-1 text-sm uppercase tracking-tight">
                Verified experts with 4.5+ average rating.
            </p>
          </div>
          <Link to="/services" className="flex items-center gap-2 text-[var(--accent)] font-black uppercase tracking-tighter text-sm underline italic">
             View All Professionals <ArrowRight size={18}/>
          </Link>
        </header>

        {loading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-50">
                <Loader2 size={40} className="animate-spin text-[var(--accent)] mb-4" />
                <p className="font-black italic text-slate-400 uppercase tracking-widest text-xs">Fetching Live Ratings...</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 italic">
            {topProviders.map((p) => (
              <ServiceCard 
                key={p.id} 
                provider={{
                  ...p,
                  rating: p.avgRating || "0.0",
                  totalReviews: p.totalReviews || 0,
                  location: "Bhopal Hub",
                  isVerified: true,
                  image: p.image || "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=400"
                }} 
              />
            ))}
          </div>
        )}
      </section>

      {/* --- TRUST STATS --- */}
      <motion.section variants={containerVars} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="relative z-10 bg-slate-50 dark:bg-[#0a0a0a] border-y border-slate-100 dark:border-slate-800 py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {[
            { id: 1, icon: Users, stat: "1k+", label: "Trusted Customers", color: "text-blue-600", bg: "bg-blue-50" },
            { id: 2, icon: Award, stat: "50+", label: "Verified Partners", color: "text-orange-600", bg: "bg-orange-50" },
            { id: 3, icon: ShieldCheck, stat: "Bhopal", label: "Local & Reliable", color: "text-[var(--accent)]", bg: "bg-purple-50", useAccent: true },
          ].map(item => (
            <motion.div key={item.id} variants={itemVars} whileHover={{ scale: 1.03 }} className="bg-white dark:bg-slate-900 p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm transition-all italic" style={item.useAccent ? { borderColor: 'var(--accent)' } : {}}>
              <div className={`w-16 h-16 ${item.bg} dark:bg-opacity-10 rounded-2xl flex items-center justify-center ${item.color} mb-6 mx-auto shadow-inner`} style={item.useAccent ? { color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' } : {}}>
                <item.icon size={32} />
              </div>
              <h4 className="text-5xl font-black mb-2 leading-none uppercase tracking-tighter italic">{item.stat}</h4>
              <p className="text-slate-500 font-black uppercase text-xs tracking-widest italic">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;