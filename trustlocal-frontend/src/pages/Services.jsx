import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';

// Real-world dummy data based on your ideathon [cite: 4, 21]
const MOCK_PROVIDERS = [
  { id: 1, name: "Atul Electric Services", category: "Electrician", rating: 4.9, basePrice: 249, location: "MP Nagar", isVerified: true, image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400" },
  { id: 2, name: "Bhopal PlumbFix", category: "Plumber", rating: 4.7, basePrice: 199, location: "Arera Colony", isVerified: true, image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=400" },
  { id: 3, name: "Quick AC Repair", category: "AC Repair", rating: 4.5, basePrice: 499, location: "Indrapuri", isVerified: false, image: "https://images.unsplash.com/photo-1599931024310-720610f60751?q=80&w=400" },
];

const Services = () => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? MOCK_PROVIDERS : MOCK_PROVIDERS.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-black mb-8">Verified Pros in <span className="text-[#aa3bff]">Bhopal</span> [cite: 6, 19]</h2>
      
      {/* Category Tabs */}
      <div className="flex gap-4 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {["All", "Electrician", "Plumber", "AC Repair"].map(cat => (
          <button 
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-bold text-sm transition ${filter === cat ? 'bg-[#aa3bff] text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(p => <ServiceCard key={p.id} provider={p} />)}
      </div>
    </div>
  );
};

export default Services;