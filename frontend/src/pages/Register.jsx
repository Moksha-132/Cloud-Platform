import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Loader2, User, Building2, Mail, Lock, Zap, LayoutDashboard, Globe2, Cpu, ShieldCheck } from 'lucide-react';
import logo from '../assets/shnoor-logo.png';
import Footer from '../components/Footer';
import { register } from '../api/auth';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', company: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await register(form.name, form.company, form.email, form.password);
      localStorage.setItem('shnoor_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { i: <LayoutDashboard size={20} />, t: "Intelligent Document Vault" },
    { i: <Globe2 size={20} />, t: "Global Asset Replication" },
    { i: <Cpu size={20} />, t: "Neural-Speed Processing" }
  ];

  return (
    <div className="base bg-[#F8FAFC]">
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-4 group">
          <img src={logo} alt="Shnoor" className="h-10 w-auto" />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black tracking-tight text-slate-900">SHNOOR <span className="text-amber-500">INTERNATIONAL</span></span>
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase">Intelligent Cloud Ecosystem</span>
          </div>
        </Link>
        <Link to="/" className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-100 py-3 px-8 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>

      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block space-y-10">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              <Zap size={14} fill="currentColor" /> System Initialization
            </div>
            <h1 className="text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Join the Next <br />
              <span className="text-amber-500 italic">Cloud Generation</span> <br />
              Today.
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed mb-12">
              Experience ultra-secure document management, intelligent storage, and seamless global sharing. Built for modern enterprises and visionary creators.
            </p>

            <div className="space-y-4">
              {features.map((f, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6 max-w-md hover:translate-x-2 transition-transform">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                    {f.i}
                  </div>
                  <span className="font-black text-slate-900 uppercase tracking-wide text-[11px]">{f.t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-slate-100 max-w-2xl mx-auto w-full relative">
            <div className="mb-10">
              <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                <ShieldCheck size={14} /> Cloud Registration
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Create your Cloud Identity</h2>
              <p className="text-slate-500 font-medium text-sm">Configure your secure workspace to begin managing your digital ecosystem.</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold mb-8 border border-red-100">{error}</div>}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" required placeholder="John Doe" className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl py-5 pl-14 pr-6 font-bold text-sm outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Organization Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" placeholder="Global Systems Inc" className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl py-5 pl-14 pr-6 font-bold text-sm outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Enterprise Email</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="email" required placeholder="name@company.com" className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl py-5 pl-14 pr-6 font-bold text-sm outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="password" required placeholder="Min 8 characters" className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl py-5 pl-14 pr-6 font-bold text-sm outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
              </div>

              <button className="w-full py-6 bg-[#0F172A] hover:bg-black text-white rounded-xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 transition-all disabled:opacity-50" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <>Initialize Access <ArrowRight size={20} /></>}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-sm font-bold text-slate-400">
                Already have an account? <Link to="/login" className="text-amber-600 hover:text-amber-700">Sign In</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;