import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Loader2, ShieldCheck, Zap } from 'lucide-react';
import logo from '../assets/shnoor-logo.png';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await axios.post(`${apiBase}/auth/reset-password`, { token, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired token');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="base bg-[#F8FAFC]">
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-4 group">
          <img src={logo} alt="Shnoor" className="h-10 w-auto" />
          <span className="text-xl font-black tracking-tight text-slate-900 uppercase">Shnoor <span className="text-amber-500">Cloud</span></span>
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 max-w-xl w-full text-center">
          <div className="mb-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mb-6">
              <ShieldCheck size={32} fill="currentColor" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Reset Password</h2>
            <p className="text-slate-500 font-medium">Create a new secure password for your cloud identity.</p>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold mb-8 border border-red-100">{error}</div>}
          {success && <div className="bg-emerald-50 text-emerald-600 p-5 rounded-2xl text-sm font-bold mb-8 border border-emerald-100">Password updated! Redirecting to login...</div>}

          {!success && (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-3 text-left">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input type="password" required placeholder="Min 8 characters" className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl py-6 pl-16 pr-6 font-bold outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>

              <div className="space-y-3 text-left">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input type="password" required placeholder="Repeat password" className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl py-6 pl-16 pr-6 font-bold outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </div>

              <button className="w-full py-6 bg-[#0F172A] hover:bg-black text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 transition-all disabled:opacity-50" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <>Update Password <ArrowRight size={20} /></>}
              </button>
            </form>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default ResetPassword;
