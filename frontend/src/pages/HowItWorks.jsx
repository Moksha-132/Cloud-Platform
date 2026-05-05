import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, Share2, FolderTree, Globe, ShieldCheck, Zap, Server } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/shnoor-logo.png';
import Footer from '../components/Footer';

const HowItWorks = () => {
  const steps = [
    { n: "01", t: "Simple Upload", d: "Upload PDFs, high-res images, and legal documents from your local storage directly to our secure Shnoor Cloud. Support for bulk uploads up to 5GB.", i: <Upload size={32} />, c: "bg-amber-500" },
    { n: "02", t: "Smart Indexing", d: "Our platform automatically indexes your files. Create folder structures, rename on the fly, and categorize with intelligent metadata tags.", i: <FolderTree size={32} />, c: "bg-slate-900" },
    { n: "03", t: "Instant Preview", d: "No more downloading to view. Our native browser engine previews complex PDFs and large images with zero lag and high-fidelity rendering.", i: <Search size={32} />, c: "bg-blue-600" },
    { n: "04", t: "Secure Sharing", d: "Collaborate with peace of mind. Share files via encrypted links. Set expiry dates, custom passwords, and granular view/edit permissions.", i: <Share2 size={32} />, c: "bg-emerald-600" }
  ];

  return (
    <div className="base">
      <nav className="gate">
        <div className="loft">
          <Link to="/" className="cloud">
            <img src={logo} alt="Shnoor" className="h-10 w-auto" />
            <span className="logo">SHNOOR <span className="text-amber-500 font-black">INTERNATIONAL</span></span>
          </Link>
          <div className="hidden lg:flex items-center gap-10">
            <Link to="/" className="link">Home</Link>
            <Link to="/how-it-works" className="link font-bold text-amber-500">How It Works</Link>
            <Link to="/features" className="link">Features</Link>
            <Link to="/about" className="link">About</Link>
            <Link to="/contact" className="link">Contact</Link>
          </div>
          <Link to="/register" className="stem">Start Now</Link>
        </div>
      </nav>

      <main className="pt-48 pb-32 px-6">
        <div className="vault">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
            <h1 className="title">Your Files, <br /><span className="text-amber-500 italic serif text-8xl">Cloud Powered.</span></h1>
            <p className="text">
              Shnoor Cloud provides a seamless, intelligence-driven experience for storing, organizing, and sharing your most mission-critical documents globally.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-32">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="core group p-12">
                <div className="flex justify-between items-start mb-10">
                  <motion.div whileHover={{ rotate: 5 }} className={`icon ${s.c}`}>
                    {s.i}
                  </motion.div>
                  <span className="skin">{s.n}</span>
                </div>
                <h3 className="sub text-3xl">{s.t}</h3>
                <p className="body text-lg">
                  {s.d}
                </p>
              </motion.div>
            ))}
          </div>


        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;