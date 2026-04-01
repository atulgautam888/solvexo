import React from 'react';
import { motion } from 'framer-motion';
import adityaImage from '../assets/adityaImage.jpeg'
import abhiImage from '../assets/abhiImage.jpeg'
import atulImage from '../assets/atulImage.jpeg'
import userEcosystem from '../assets/userEcosystem.jpeg'
import controllCenter from '../assets/controllCenter.png'

import { 
  ShieldCheck, 
  Code2, 
  Layout, 
  Database, 
  ExternalLink, 
  Mail 
} from 'lucide-react';

const TEAM = [
  { 
    name: "Abhishek Sahu", 
    role: "Lead Developer", 
    desc: "MERN Stack expert handling core backend infrastructure and security protocols.",
    img: abhiImage 
  },
  { 
    name: "Atul Gautam", 
    role: "Frontend Developer", 
    desc: "Specialist in UI/UX and Framer Motion animations for fluid user experiences.",
    img: atulImage 
  },
  { 
    name: "Aditya Prasad Pandey", 
    role: "System Designer", 
    desc: "Focuses on database optimization and scalable application architecture.",
    img: adityaImage
  }
];

const SHOWCASE = [
  { 
    title: "User Ecosystem", 
    category: "Login & Register", 
    img: userEcosystem 
  },
  { 
    title: "Control Center", 
    category: "Admin Dashboard", 
    img: controllCenter 
  }
];

// Custom SVG Components to bypass Lucide export errors
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#070707] py-24 px-6 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-32 relative">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-[var(--accent)] opacity-10"
          >
            <ShieldCheck size={200} />
          </motion.div>
          <h1 className="text-7xl md:text-8xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white relative z-10">
            Behind The <br /> <span style={{ color: 'var(--accent)' }}>Vision</span>
          </h1>
          <p className="mt-6 text-slate-400 font-bold italic uppercase tracking-[0.3em] text-xs">The TrustLocal Bhopal Team</p>
        </div>

        {/* TEAM CARDS */}
        <div className="grid md:grid-cols-3 gap-12 mb-40">
          {TEAM.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative mb-8 overflow-hidden rounded-[40px] border-4 border-slate-100 dark:border-slate-800 shadow-2xl bg-slate-50 dark:bg-slate-900">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent)]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                   <div className="flex gap-4 text-white">
                      <div className="cursor-pointer hover:scale-110 transition-transform"><GithubIcon /></div>
                      <div className="cursor-pointer hover:scale-110 transition-transform"><LinkedinIcon /></div>
                      <div className="cursor-pointer hover:scale-110 transition-transform"><Mail size={24} /></div>
                   </div>
                </div>
              </div>
              <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">{member.name}</h3>
              <p className="text-[var(--accent)] font-black text-[10px] uppercase tracking-widest mt-1 mb-4 italic">{member.role}</p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium italic leading-relaxed">{member.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* APP SHOWCASE SECTION */}
        <section className="bg-slate-50 dark:bg-[#0f0f0f] rounded-[60px] p-10 md:p-20 border border-slate-100 dark:border-slate-800">
          <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Built For <span style={{ color: 'var(--accent)' }}>Reliability</span></h2>
              <p className="text-slate-500 italic font-bold text-sm mt-4 uppercase tracking-tight">Visualizing the high-stakes environment developed for Bhopal's local ecosystem.</p>
            </div>
            <div className="flex gap-3">
               {[Code2, Layout, Database].map((Icon, i) => (
                 <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-800 text-[var(--accent)]">
                   <Icon size={24} />
                 </div>
               ))}
            </div>
          </header>

          <div className="grid lg:grid-cols-2 gap-12">
            {SHOWCASE.map((screen, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-slate-900 p-5 rounded-[48px] shadow-2xl border border-slate-100 dark:border-slate-800 group"
              >
                <div className="rounded-[36px] overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-200 dark:bg-slate-800">
                  <img src={screen.img} alt={screen.title} className="w-full h-auto" />
                </div>
                <div className="p-8 flex justify-between items-center">
                  <div>
                    <p className="text-[var(--accent)] font-black text-[9px] uppercase tracking-[0.2em] mb-1 italic">{screen.category}</p>
                    <h4 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">{screen.title}</h4>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-[var(--accent)] group-hover:bg-[var(--accent)]/10 transition-all">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;