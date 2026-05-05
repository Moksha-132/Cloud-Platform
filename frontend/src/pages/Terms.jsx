import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, FileText, Globe, Check } from 'lucide-react';
import logo from '../assets/shnoor-logo.png';
import Footer from '../components/Footer';

const Terms = () => {
  const navigate = useNavigate();
  const isAuthFlow = !localStorage.getItem('shnoor_user');

  return (
    <div className="base bg-white">
      <nav className="gate">
        <div className="loft">
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Shnoor" className="h-10 w-auto" />
            <span className="logo">SHNOOR <span className="text-amber-500">INTERNATIONAL</span></span>
          </Link>
          <Link to={isAuthFlow ? "/login" : "/dashboard"} className="leaf py-3 px-8 rounded-full text-sm flex items-center gap-2">
            <ArrowLeft size={16} /> {isAuthFlow ? 'Back to Login' : 'Back to Dashboard'}
          </Link>
        </div>
      </nav>

      <main className="flex-1 py-40 px-6">
        <div className="vault max-w-4xl mx-auto">
          <div className="badge">Legal Protocol</div>
          <h1 className="text-6xl font-black text-slate-900 mb-12 tracking-tighter">Terms of Service</h1>
          
          <div className="space-y-16">
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-amber-500">
                <Shield size={24} />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">1. Acceptance of Terms</h2>
              </div>
              <p className="body text-lg">
                By accessing the Shnoor Cloud Platform, you agree to comply with our global trade intelligence protocols. This platform is designed for the secure storage and management of high-stakes trade documentation. Unauthorized use or breach of data integrity is strictly prohibited.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-amber-500">
                <Lock size={24} />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">2. Data Security & Encryption</h2>
              </div>
              <p className="body text-lg">
                Shnoor International employs 256-bit AES encryption for all data at rest and TLS 1.3 for data in transit. You are responsible for maintaining the confidentiality of your vault credentials. We are not liable for losses resulting from compromised account security due to user negligence.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-amber-500">
                <FileText size={24} />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">3. Document Ownership</h2>
              </div>
              <p className="body text-lg">
                All documents, shipment data, and intellectual property uploaded to your vault remain your exclusive property. Shnoor International does not claim ownership over user-generated content. However, by using our AI indexing service, you grant us a limited license to process metadata for your internal search functionality.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4 text-amber-500">
                <Globe size={24} />
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">4. Global Compliance</h2>
              </div>
              <p className="body text-lg">
                Users must ensure that all uploaded documents comply with international trade laws, including HSN classification standards and customs regulations. Shnoor International reserves the right to suspend accounts involved in illegal trade activities or document falsification.
              </p>
            </section>
          </div>

          <div className="mt-24 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
             <p className="text-sm font-bold text-slate-500 italic">
               Last Updated: May 2026. For high-security inquiries, contact legal@shnoor.com.
             </p>
             {isAuthFlow && (
               <button 
                 onClick={() => {
                   localStorage.setItem('shnoor_terms_accepted', 'true');
                   navigate('/login');
                 }}
                 className="root whitespace-nowrap px-10 py-5 rounded-2xl flex items-center gap-3 shadow-xl shadow-amber-500/20"
               >
                 <Check size={20} /> I Accept & Return to Login
               </button>
             )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
