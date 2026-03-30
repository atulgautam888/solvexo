import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Save, Loader2, ShieldCheck, Camera } from 'lucide-react';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    image: user?.image || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "profile_upload");
    data.append("cloud_name", "dk1dehovp");

    const uploadToast = toast.loading("Uploading image...");
    setUploading(true);
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dk1dehovp/image/upload", {
        method: "POST",
        body: data,
      });
      const fileData = await res.json();
      
      setFormData(prev => ({ ...prev, image: fileData.secure_url }));
      toast.success("Image uploaded! Click Save to confirm.", { id: uploadToast });
    } catch (err) {
      toast.error("Image upload failed.", { id: uploadToast });
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updateToast = toast.loading("Saving changes...");

    try {
      const res = await API.put('/auth/update-profile', formData);
      const updatedUserData = res.data.user || res.data;

      if (updatedUserData) {
        if (typeof setUser === 'function') setUser(updatedUserData);

        const savedData = JSON.parse(localStorage.getItem('trustLocalUser'));
        if (savedData) {
          const newData = { ...savedData, user: updatedUserData };
          localStorage.setItem('trustLocalUser', JSON.stringify(newData));
        }

        toast.success("Profile Updated Successfully! ✨", { id: updateToast });
        setFormData(prev => ({ ...prev, password: '' }));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.", { id: updateToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070707] p-6 md:p-12 flex justify-center items-start font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white dark:bg-[#121212] rounded-[40px] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-800"
      >
        <header className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">Account Settings</h2>
          <p className="text-slate-500 font-bold italic text-sm">Manage your TrustLocal identity</p>
        </header>

        <div className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-[var(--accent)] shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {formData.image ? (
                <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-black text-slate-300">{formData.name[0]}</span>
              )}
              
              {uploading && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 className="animate-spin text-white" size={24} />
                </div>
              )}
            </div>
            
            <label className="absolute bottom-0 right-0 p-3 bg-[var(--accent)] text-white rounded-2xl cursor-pointer shadow-lg hover:scale-110 active:scale-95 transition-all">
              <Camera size={18} />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
            </label>
          </div>
          <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Change Profile Photo</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block italic">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[var(--accent)] transition-colors" size={20} />
                <input 
                  type="text" value={formData.name} required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--accent)]/20 font-bold italic"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block italic">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400 transition-colors" size={20} />
                <input 
                  type="email" value={formData.email} required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--accent)]/20 font-bold italic"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="relative group">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block italic">New Password (Optional)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-400 group-focus-within:text-[var(--accent)] transition-colors" size={20} />
              <input 
                type="password" placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-[var(--accent)]/20 font-bold italic"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-widest italic">
              <ShieldCheck size={18} /> Verified Account
            </div>
            <button 
              type="submit" disabled={loading || uploading}
              className="w-full md:w-auto px-12 py-4 bg-[var(--accent)] text-white rounded-2xl font-black italic shadow-xl shadow-[var(--accent)]/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> SAVE CHANGES</>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;