import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/shnoor-logo.png';
import Footer from '../components/Footer';

const Contact = () => {
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
            <a href="/#how-it-works" className="link">How It Works</a>
            <a href="/#about" className="link">About</a>
            <a href="/#features" className="link">Features</a>
            <Link to="/contact" className="link font-bold text-amber-500">Contact</Link>
          </div>
          <Link to="/register" className="stem">Start Now</Link>
        </div>
      </nav>

      <main className="pt-48 pb-32 px-6">
        <div className="vault">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
            <h1 className="title">Get in <span className="text-amber-500 italic serif text-8xl">Touch.</span></h1>
            <p className="text">
              Have questions about Shnoor Cloud? Our global intelligence and support teams are available 24/7 to assist with your enterprise needs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12 mb-24">
            <div className="lg:col-span-1 space-y-6">
              <motion.div whileHover={{ x: 10 }} className="shell cloud p-8 rounded-[2.5rem]">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="label">Global Inquiries</div>
                  <div className="font-black text-slate-900">info@shnoor.com</div>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 10 }} className="shell cloud p-8 rounded-[2.5rem]">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="label">Phone Support</div>
                  <div className="font-black text-slate-900">+91-9429694298</div>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 10 }} className="shell cloud p-8 rounded-[2.5rem]">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="label">Headquarters</div>
                  <div className="font-black text-slate-900">Odessa, Missouri, US</div>
                </div>
              </motion.div>

              <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4">
                <div className="cloud gap-3">
                  <Clock className="text-amber-500" size={20} />
                  <span className="font-bold">Always Online</span>
                </div>
                <p className="text-slate-400 text-sm">Our neural support system and global team ensure a response time under 15 minutes.</p>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 core p-12">
              <div className="mb-10">
                <h2 className="sub text-3xl">Send a Message</h2>
                <p className="body">Our engineers will get back to you shortly.</p>
              </div>
              <form className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label">Full Name</label>
                  <input type="text" placeholder="John Doe" className="soil" />
                </div>
                <div className="space-y-2">
                  <label className="label">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="soil" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="label">Department</label>
                  <select className="soil">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Enterprise Sales</option>
                    <option>Media & Press</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="label">Message</label>
                  <textarea placeholder="How can we help your business?" className="soil h-48 resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="root w-full justify-center">
                    Send Message <Send size={20} />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>


        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;