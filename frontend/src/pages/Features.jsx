import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Search, Shield, Zap, Share2, FolderTree, FileText, Smartphone, Globe, Clock, Download, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/shnoor-logo.png';
import Footer from '../components/Footer';

const Features = () => {
  const features = [
    {
      icon: <Cloud className="text-amber-500" size={32} />,
      title: "Local-to-Cloud Sync",
      desc: "Instantly upload PDFs, images, and docs from your local machine. Our sync engine ensures your files are available globally in milliseconds."
    },
    {
      icon: <FolderTree className="text-blue-500" size={32} />,
      title: "Dynamic Folders",
      desc: "Organize your data exactly how you like. Create nested folders, rename items, and move files with a simple drag-and-drop interface."
    },
    {
      icon: <Eye className="text-emerald-500" size={32} />,
      title: "Instant Previews",
      desc: "View PDFs and high-resolution images directly in your browser. No need to download files just to check their content."
    },
    {
      icon: <Share2 className="text-purple-500" size={32} />,
      title: "Granular Sharing",
      desc: "Generate secure sharing links with custom permissions. Choose who can 'View Only' or 'Edit' your documents with one click."
    },
    {
      icon: <Search className="text-rose-500" size={32} />,
      title: "Semantic Search",
      desc: "Find any file instantly using our advanced search filters. Search by name, date, file type, or even content tags."
    },
    {
      icon: <Shield className="text-cyan-500" size={32} />,
      title: "OAuth Protection",
      desc: "Your account is secured with Google and Github OAuth. Industry-standard encryption keeps your document vault private."
    },
    {
      icon: <Clock className="text-orange-500" size={32} />,
      title: "Activity Logs",
      desc: "Monitor every action on your files. Track who viewed, shared, or edited a document with detailed real-time activity logs."
    },
    {
      icon: <Download className="text-indigo-500" size={32} />,
      title: "Bulk Operations",
      desc: "Download entire folders as ZIPs or delete multiple files at once. Our platform is built for high-speed bulk management."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Shnoor Cloud" className="h-10 w-auto" />
            <span className="text-xl font-bold block leading-none tracking-tight">SHNOOR <span className="text-amber-500 font-black">INTERNATIONAL</span></span>
          </Link>
          <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-slate-600">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <Link to="/how-it-works" className="hover:text-slate-900 transition-colors">How It Works</Link>
            <Link to="/features" className="text-amber-500">Features</Link>
            <Link to="/about" className="hover:text-slate-900 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
          </div>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <section className="pt-48 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h1 className="text-7xl font-black tracking-tighter mb-8 leading-tight">Platform <br /><span className="text-amber-500 italic font-serif serif-font">Capabilities.</span></h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Everything you need to manage your digital documents at scale, with the speed of cloud intelligence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-amber-500/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
             <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                <div>
                   <h2 className="text-5xl font-black text-white mb-8 leading-tight">Advanced Document <br />Intelligence Engine</h2>
                   <p className="text-slate-400 text-lg font-medium mb-10">
                      Our platform doesn't just store files; it understands them. From automated tagging to neural search, we provide the tools to make your data work for you.
                   </p>
                   <button className="bg-amber-500 text-black px-10 py-4 rounded-full font-black hover:bg-amber-600 transition-all flex items-center gap-3 shadow-xl shadow-amber-500/20">
                      Explore Technical Docs <Zap size={20} />
                   </button>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   {[
                      { l: "High Speed", v: "10GB/s" },
                      { l: "Uptime", v: "99.99%" },
                      { l: "Encryption", v: "AES-256" },
                      { l: "Nodes", v: "Global" }
                   ].map((stat, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
                         <div className="text-3xl font-black text-amber-500 mb-2">{stat.v}</div>
                         <div className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.l}</div>
                      </div>
                   ))}
                </div>
             </div>
             <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
