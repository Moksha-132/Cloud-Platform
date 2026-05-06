import React from 'react';
import { motion } from 'framer-motion';
import {
  Cloud, Share2, ArrowRight, Upload,
  Globe, Search, Clock, Smartphone,
  Shield, Zap, Cpu, Server, Lock,
  CheckCircle2, HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/shnoor-logo.png';
import cloudHq from '../assets/cloud-hq.png';
import Footer from '../components/Footer';

const Landing = () => {
  const stagger = { animate: { transition: { staggerChildren: 0.1 } } };
  const up = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="base overflow-x-hidden">
      <nav className="gate">
        <div className="loft">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="cloud">
            <img src={logo} alt="Shnoor" className="h-10 w-auto" />
            <span className="logo">SHNOOR <span className="text-amber-500 font-black">INTERNATIONAL</span></span>
          </motion.div>

          <div className="hidden lg:flex items-center gap-10">
            <Link to="/" className="link">Home</Link>
            <a href="#how-it-works" className="link">How It Works</a>
            <a href="#features" className="link">Features</a>
            <a href="#about" className="link">About</a>
            <Link to="/contact" className="link">Contact</Link>
          </div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-6">
            <Link to="/login" className="link">Log In</Link>
            <Link to="/register" className="stem">Get Started</Link>
          </motion.div>
        </div>
      </nav>

      <section className="relative pt-48 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-50 blur-[120px]" />
          <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-25" />
        </div>

        <motion.div initial="initial" animate="animate" variants={stagger} className="vault max-w-5xl">
          <motion.h1 variants={up} className="title">
            Shnoor Cloud <span className="text-amber-500 italic serif">Platform.</span>
          </motion.h1>
          <motion.p variants={up} className="text">
            Simple, automated, intelligent. <span className="text-slate-900 font-bold">The Shnoor Cloud Ecosystem</span> is built to transform your document workflows into a streamlined intelligence engine with global reach and neural-speed processing.
          </motion.p>
          <motion.div variants={up} className="mt-12 flex justify-center gap-6">
            <Link to="/register" className="root group">
              Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#how-it-works" className="leaf">Platform Overview</a>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="pb-32 px-6 scroll-mt-20">
        <div className="vault">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="shell node">
            <div>
              <div className="badge">
                <Globe size={14} /> Global Leader
              </div>
              <h2 className="title text-5xl mb-8 leading-tight">Meet <span className="text-amber-500">Shnoor International.</span></h2>
              <p className="body text-lg mb-8">
                Shnoor International is a global technology powerhouse dedicated to redefining the cloud ecosystem. Headquartered in Odessa, Missouri, we serve thousands of enterprises with mission-critical document intelligence and ultra-secure storage solutions.
              </p>
              <div className="flex gap-10">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl font-black text-slate-900">Missouri, United States</div>
                  <div className="label">Headquarters</div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <div className="text-3xl font-black text-slate-900">99.9%</div>
                  <div className="label">Uptime</div>
                </motion.div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} className="relative aspect-video bg-slate-100 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl">
              <img src={cloudHq} className="w-full h-full object-cover" alt="Cloud HQ" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="vault">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="stack">
              <h2 className="title text-5xl text-left mb-6">Storage <span className="text-amber-500 italic serif">Intelligence.</span></h2>
              <p className="body text-lg mb-10">
                Our platform isn't just about storage. It's about understanding your data. Shnoor's engine indexes your files the moment they land, making them instantly searchable and actionable.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="quote mb-12">
                "Shnoor Cloud changed how we handle our global documents. The speed and security are unmatched."
              </div>
              <div className="cloud">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-black text-xl">SJ</div>
                <div>
                  <div className="font-black text-slate-900">Sarah Jenkins</div>
                  <div className="label mb-0">CTO, Global Logistics Corp</div>
                </div>
              </div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-32 px-6 scroll-mt-20">
        <div className="vault text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="title text-5xl md:text-7xl">
            The Shnoor <span className="text-amber-500 italic serif">Process.</span>
          </motion.h2>
          <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="grid lg:grid-cols-2 gap-8 mt-24 text-left">
            {[
              { s: "01", t: "Simple Upload", d: "Experience lightning-fast sync with our neural upload engine. Support for files up to 10MB on the free ecosystem.", i: <Upload size={32} />, b: "bg-amber-500" },
              { s: "02", t: "Smart Indexing", d: "Our platform automatically indexes your files. Create folder structures, rename on the fly, and categorize with intelligent metadata tags.", i: <Cloud size={32} />, b: "bg-slate-900" },
              { s: "03", t: "Instant Preview", d: "No more downloading to view. Our native browser engine previews complex PDFs and large images with zero lag and high-fidelity rendering.", i: <Search size={32} />, b: "bg-blue-600" },
              { s: "04", t: "Secure Sharing", d: "Collaborate with peace of mind. Share files via encrypted links. Set expiry dates, custom passwords, and granular view/edit permissions.", i: <Share2 size={32} />, b: "bg-emerald-600" }
            ].map((s, i) => (
              <motion.div key={i} variants={up} className="core group">
                <motion.div whileHover={{ rotate: 5 }} className={`icon ${s.b}`}>{s.i}</motion.div>
                <div className="skin group-hover:text-amber-500/10 transition-colors">{s.s}</div>
                <h3 className="sub text-3xl">{s.t}</h3>
                <p className="body text-lg">{s.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-32 px-6 scroll-mt-20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="vault dark">
          <div className="text-center mb-24 relative z-10">
            <h2 className="title text-white text-5xl md:text-6xl">Enterprise <span className="text-amber-500 italic serif">Features.</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-6">
              Built for high-stakes environments where security and accessibility are non-negotiable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              { i: <Cloud size={20} />, t: "Cloud Sync", d: "Instantly upload and sync files across all devices with real-time replication." },
              { i: <Search size={20} />, t: "Smart Search", d: "Find documents using advanced neural filters and metadata extraction." },
              { i: <Share2 size={20} />, t: "File Sharing", d: "Share files with enterprise-grade secure links and granular permissions." },
              { i: <Clock size={20} />, t: "Activity Logs", d: "Detailed tracking of every file action with tamper-proof audit trails." },
              { i: <Smartphone size={20} />, t: "Mobile Ready", d: "Access your secure vault on the go with our fully responsive mobile app." },
              { i: <Shield size={20} />, t: "Secure Access", d: "Identity management and multi-factor authentication for every user." },
              { i: <Cpu size={20} />, t: "Neural Engine", d: "Automated tagging and intelligent classification of your digital assets." },
              { i: <Zap size={20} />, t: "Zero-Lag Preview", d: "High-fidelity rendering of large documents and images directly in-browser." }
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="gem text-center group">
                <motion.div whileHover={{ scale: 1.1 }} className="glow mx-auto">{f.i}</motion.div>
                <h4 className="sub text-white text-xl group-hover:text-amber-500 transition-colors">{f.t}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-32 px-6">
        <div className="vault">
          <div className="text-center mb-24">
            <h2 className="title text-5xl mb-6">Frequently <span className="text-amber-500 italic serif">Asked.</span></h2>
            <p className="body">Quick answers to common questions about Shnoor Cloud.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { q: "How much storage do I get?", a: "Every free account starts with 1GB of secure storage. Premium plans offer up to 10TB." },
              { q: "What file types are supported?", a: "Shnoor supports all major file types including PDFs, high-res images, and CAD files." },
              { q: "Is there a mobile app?", a: "Yes, you can access your vault via our progressive web app on any mobile device." },
              { q: "How do I share a folder?", a: "Simply click the 'Share' icon on any folder to generate a secure, encrypted link." }
            ].map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="plus">
                <div className="cloud gap-4 mb-4">
                  <HelpCircle className="text-amber-500" size={24} />
                  <h4 className="font-black text-slate-900">{item.q}</h4>
                </div>
                <p className="body text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="wrap">
          <h2 className="title text-white">Join Shnoor <span className="text-amber-500 italic serif">Today.</span></h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto">
            Experience the future of cloud document intelligence. Secure, fast, and remarkably simple.
          </p>
          <Link to="/register" className="stem py-5 px-12 text-xl inline-flex items-center gap-3 hover:scale-105 transition-transform">
            Initialize Workspace <ArrowRight size={24} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
