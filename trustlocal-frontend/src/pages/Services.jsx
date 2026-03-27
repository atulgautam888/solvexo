import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { MapPin, SlidersHorizontal } from 'lucide-react';

const MOCK_PROVIDERS = [
  { id: 1, name: "Atul Electric Services", category: "Electrician", rating: 4.9, basePrice: 249, location: "MP Nagar", isVerified: true, image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400" },
  { id: 2, name: "Bhopal PlumbFix", category: "Plumber", rating: 4.7, basePrice: 199, location: "Arera Colony", isVerified: true, image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=400" },
  { id: 3, name: "Quick AC Repair", category: "AC Repair", rating: 4.5, basePrice: 499, location: "Indrapuri", isVerified: false, image: "https://images.unsplash.com/photo-1599931024310-720610f60751?q=80&w=400" },
];

const Services = () => {
  const [filter, setFilter] = useState("All");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    if (cat) setFilter(cat);
  }, [location]);

  const filtered = filter === "All" ? MOCK_PROVIDERS : MOCK_PROVIDERS.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2">
            Verified Pros in <span style={{ color: 'var(--accent)' }}>Bhopal</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 font-medium">
            <MapPin size={18} style={{ color: 'var(--accent)' }} /> 
            Showing {filter === "All" ? "all services" : filter} experts.
          </p>
        </div>
      </div>
      
      {/* Category Tabs */}
      <div className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {["All", "Electrician", "Plumber", "AC Repair", "Cleaning"].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${
              filter === cat ? 'text-white shadow-xl' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
            }`}
            style={filter === cat ? { backgroundColor: 'var(--accent)' } : {}}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid: No more Modal logic here, ServiceCard handles the navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(p => <ServiceCard key={p.id} provider={p} />)}
      </div>
    </div>
  );
};

export default Services;