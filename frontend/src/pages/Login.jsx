import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Loader2, Mail, Lock, ShieldCheck, Zap } from 'lucide-react';
import logo from '../assets/shnoor-logo.png';
import Footer from '../components/Footer';
import { login } from '../api/auth';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    const termsAccepted = localStorage.getItem('shnoor_terms_accepted') === 'true';
    const privacyAccepted = localStorage.getItem('shnoor_privacy_accepted') === 'true';
    const globalAgreement = localStorage.getItem('shnoor_agreement') === 'true';
    
    if ((termsAccepted && privacyAccepted) || globalAgreement) {
      setTerms(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!terms) {
      setError('Accept Terms and Privacy Policy');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const user = await login(form.email, form.password);
      localStorage.setItem('shnoor_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="base bg-[#F8FAFC]">
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link to="/" className="flex items-center gap-4 group">
          <img src={logo} alt="Shnoor" className="h-10 w-auto" />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-black tracking-tight text-slate-900">SHNOOR <span className="text-amber-500">INTERNATIONAL</span></span>
            <span className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase"> Cloud Platform</span>
          </div>
        </Link>
        <Link to="/" className="bg-white hover:bg-slate-50 text-slate-600 border border-slate-100 py-3 px-8 rounded-full font-bold text-sm flex items-center gap-2 transition-all shadow-sm">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </nav>

      <main className="flex-1 flex items-start justify-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-start">

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block space-y-10 mt-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              <Zap size={14} fill="currentColor" /> Secure Authentication
            </div>
            <h1 className="text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Access your <br />
              <span className="text-amber-500 italic">Cloud Ecosystem</span> <br />
              Dashboard.
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
              Re-establish secure connection to manage your intelligent document vault, encrypted assets, and global cloud operations.
            </p>
            <div className="pt-8">
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6 max-w-md">
                 <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                    <ShieldCheck size={24} />
                 </div>
                 <span className="font-black text-slate-900 uppercase tracking-wide text-xs">Certified Secure Node: Missouri, United States</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-16 rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-slate-100 max-w-xl mx-auto w-full relative">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-4">
                 <ShieldCheck size={14} />
              </div>
              <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Verify Identity</h2>
              <p className="text-slate-500 font-medium">Enter your credentials to access the Shnoor Cloud Platform.</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-5 rounded-2xl text-sm font-bold mb-8 border border-red-100">{error}</div>}

            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input type="email" required placeholder="Enter your email" className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl py-6 pl-16 pr-6 font-bold outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Password</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                  <input type="password" required placeholder="Enter your password" className="w-full bg-[#F8FAFC] border border-slate-100 rounded-2xl py-6 pl-16 pr-6 font-bold outline-none focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link to="/forgot-password" name="forgot-password" id="forgot-password" className="text-sm font-bold text-amber-600 hover:text-amber-700">Forgot password?</Link>
              </div>

              <div className="pt-4 border-t border-slate-50">
                <label className="flex items-center gap-3 text-xs font-bold text-slate-500 cursor-pointer">
                  <input type="checkbox" checked={terms} onChange={(e) => { setTerms(e.target.checked); localStorage.setItem('shnoor_agreement', e.target.checked); }} className="w-5 h-5 rounded border-slate-300 text-amber-500 focus:ring-amber-500" />
                  <span>I agree to the <Link to="/terms" className="text-amber-600 underline">Terms</Link> and <Link to="/privacy" className="text-amber-600 underline">Privacy Policy</Link></span>
                </label>
              </div>

              <button className="w-full py-6 bg-[#0F172A] hover:bg-black text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 transition-all" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
              </button>
            </form>


            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-sm font-bold text-slate-400">
                New? <Link to="/register" className="text-amber-600 hover:text-amber-700 underline underline-offset-4">Create Account</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
