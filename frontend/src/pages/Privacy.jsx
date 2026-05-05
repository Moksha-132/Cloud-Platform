import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, Check } from 'lucide-react';
import logo from '../assets/shnoor-logo.png';
import Footer from '../components/Footer';

const Privacy = () => {
  const navigate = useNavigate();
  const isAuthFlow = !localStorage.getItem('shnoor_user');

  return (
    <div className="base">
      <nav className="gate">
        <div className="loft">
          <Link to="/" className="cloud">
            <img src={logo} alt="Shnoor" className="h-8 w-auto" />
            <span className="logo">SHNOOR <span className="text-amber-500 font-black">INTERNATIONAL</span></span>
          </Link>
          <Link to={isAuthFlow ? "/login" : "/dashboard"} className="leaf px-6 py-2.5 rounded-full text-sm flex items-center gap-2">
            <ArrowLeft size={16} /> {isAuthFlow ? 'Back to Login' : 'Back to Dashboard'}
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="badge bg-blue-50 text-blue-700">
            <Lock size={14} /> Data Protection
          </div>
          <h1 className="title mb-12">Privacy <span className="text-amber-500 italic serif">Policy.</span></h1>

          <div className="space-y-12 body">
            <section>
              <h2 className="sub">1. Information Collection</h2>
              <p>We collect information you provide directly to us when you create an account, upload files, or contact our support team. This includes your name, email address, and document metadata.</p>
            </section>

            <section>
              <h2 className="sub">2. Use of Information</h2>
              <p>We use the collected data to provide, maintain, and improve our cloud services, process your transactions, and communicate with you about updates or security alerts.</p>
            </section>

            <section>
              <h2 className="sub">3. Data Security</h2>
              <p>We implement robust technical and organizational measures to protect your data. This includes encryption of files at rest and in transit, as well as regular security audits.</p>
            </section>

            <section>
              <h2 className="sub">4. Sharing of Information</h2>
              <p>We do not sell your personal data. We only share information with service providers who assist us in operating our platform, such as Cloudinary for file storage.</p>
            </section>

            <section>
              <h2 className="sub">5. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information at any time. You can manage your data directly through your dashboard.</p>
            </section>

            <section>
              <h2 className="sub">6. Links to Other Websites</h2>
              <p>Our website may contain links to other websites not owned by us. We are not responsible for their privacy practices. We encourage you to read their statements.</p>
            </section>

            <section>
              <h2 className="sub">7. Information Security</h2>
              <p>We secure information on computer servers in a controlled, secure environment. However, no data transmission over the Internet can be guaranteed.</p>
            </section>

            <section>
              <h2 className="sub">8. Legal Disclosure</h2>
              <p>We will disclose any information if required or permitted by law, such as to comply with a subpoena, to protect our rights, or respond to government requests.</p>
            </section>

            <section>
              <h2 className="sub">9. Contact Information</h2>
              <p>If you have any questions about this Policy, you may send an email to <span className="text-amber-500 font-black">info@shnoor.com</span>.</p>
            </section>
          </div>

          {isAuthFlow && (
            <div className="mt-24 p-12 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <h4 className="text-2xl font-black mb-2 tracking-tighter">Understand our policy?</h4>
                <p className="text-slate-500 font-bold">By clicking accept, you acknowledge our data practices.</p>
              </div>
              <button 
                onClick={() => {
                  localStorage.setItem('shnoor_privacy_accepted', 'true');
                  navigate('/login');
                }} 
                className="root whitespace-nowrap px-10 py-5 rounded-2xl flex items-center gap-3 shadow-xl shadow-amber-500/20"
              >
                <Check size={20} /> I Accept & Return to Login
              </button>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;