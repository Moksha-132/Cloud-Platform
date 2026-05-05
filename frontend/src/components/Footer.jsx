import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Share2, Globe, MessageSquare } from 'lucide-react';
import logo from '../assets/shnoor-logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white pt-24 pb-12 px-6">
      <div className="field grid md:grid-cols-3 gap-16 mb-20">
        <div className="space-y-8">
          <div className="vine">
            <img src={logo} alt="Shnoor" className="h-8 w-auto brightness-0 invert" />
            <span className="text-xl font-bold tracking-tight uppercase">SHNOOR <span className="text-slate-400 font-medium text-sm block">INTERNATIONAL</span></span>
          </div>
          <p className="text-slate-400 leading-relaxed max-w-xs font-medium">
            Transform your document management with a platform built for security, organization, and seamless cloud sharing.
          </p>
          <div className="flex gap-5 text-slate-400">
            <Share2 className="hover:text-white cursor-pointer transition-colors" size={20} />
            <Globe className="hover:text-white cursor-pointer transition-colors" size={20} />
            <MessageSquare className="hover:text-white cursor-pointer transition-colors" size={20} />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 font-medium">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
            <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-8">Contact & Support</h4>
          <div className="space-y-6 text-slate-400 font-medium text-sm">
            <div className="flex gap-4">
              <Mail className="text-amber-500 shrink-0" size={20} />
              <div>
                <p>info@shnoor.com</p>
                <p className="opacity-50 text-[10px] uppercase tracking-widest mt-1">Support & Inquiries</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="text-amber-500 shrink-0" size={20} />
              <div>
                <p>+91-9429694298</p>
                <p>+91-9041914601</p>
              </div>
            </div>
            <div className="flex gap-4">
              <MapPin className="text-amber-500 shrink-0" size={20} />
              <p>10009 Mount Tabor Road, Odessa, Missouri, United States</p>
            </div>
          </div>
        </div>
      </div>

      <div className="field pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-sm font-medium">&copy; 2026 Shnoor International. All rights reserved.</p>
        <div className="flex gap-8 text-slate-500 text-sm font-medium">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          <a href="/assets/Shnoor_Company_Profile.pdf" download="Shnoor_Company_Profile.pdf" className="hover:text-white transition-colors">Company Profile</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
