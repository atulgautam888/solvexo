import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import API from '../api/axios';
import { MapPin, Loader2, SearchX } from 'lucide-react';

const Services = () => {
  const [providers, setProviders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // 1. Fetch all providers from Backend
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const res = await API.get('/auth/providers');
        setProviders(res.data);
      } catch (err) {
        console.error("Error fetching providers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, []);

  // 2. Sync State with URL Params (Category 'cat' or Search 'search')
  const params = new URLSearchParams(location.search);
  const catParam = params.get('cat');
  const searchParam = params.get('search');

  useEffect(() => {
    if (catParam) {
      setFilter(catParam);
    } else {
      setFilter("All");
    }
  }, [catParam]);

  // 3. Advanced Filtering Logic (Category + Search Search)
  const filtered = providers.filter(p => {
    // Category check
    const matchesCategory = filter === "All" || p.category === filter;
    
    // Search query check (Matches name or category)
    const matchesSearch = searchParam 
      ? p.name.toLowerCase().includes(searchParam.toLowerCase()) || 
        p.category.toLowerCase().includes(searchParam.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2 italic uppercase">
            Verified Pros in <span style={{ color: 'var(--accent)' }}>Bhopal</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-black italic uppercase text-xs tracking-widest">
            <MapPin size={18} style={{ color: 'var(--accent)' }} /> 
            {loading ? "Syncing Bhopal Database..." : 
             searchParam ? `Results for "${searchParam}"` : 
             `Showing ${filter === "All" ? "all categories" : filter} experts`}
          </p>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {["All", "Electrician", "Plumber", "AC Repair", "Cleaning", "Painter", "Carpenter"].map(cat => (
          <button 
            key={cat}
            onClick={() => {
              setFilter(cat);
              // Search clear karne ke liye optional: window.history.pushState({}, '', '/services');
            }}
            className={`px-8 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap italic uppercase tracking-tighter ${
              filter === cat ? 'text-white shadow-xl shadow-[var(--accent)]/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            style={filter === cat ? { backgroundColor: 'var(--accent)' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <Loader2 size={48} className="animate-spin mb-4" style={{ color: 'var(--accent)' }} />
          <p className="font-black italic uppercase tracking-widest text-xs">Finding the best experts for you...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 italic">
          {filtered.length > 0 ? (
            filtered.map(p => (
              <ServiceCard 
                key={p._id} 
                provider={{
                  id: p._id,
                  name: p.name,
                  category: p.category,
                  rating: p.avgRating || "0.0",
                  totalReviews: p.totalReviews || 0, 
                  basePrice: p.basePrice || 249,
                  location: "Bhopal Hub",
                  isVerified: p.isVerified || true,
                  image: p.image || `https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400`
                }} 
              />
            ))
          ) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[40px] flex flex-col items-center">
              <SearchX size={48} className="text-slate-300 mb-4" />
              <p className="text-slate-400 font-black uppercase tracking-widest italic text-sm">
                No experts found matching your criteria in Bhopal.
              </p>
              <button 
                onClick={() => {setFilter("All"); window.location.href='/services'}}
                className="mt-4 text-[var(--accent)] font-black uppercase text-xs underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;