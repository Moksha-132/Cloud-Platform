import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Eye, Loader2, 
  ShieldCheck, Globe, AlertTriangle, 
  X, ChevronLeft, Lock, Edit3, Save
} from 'lucide-react';
import { getSharedFile, renameSharedFile, updateSharedFileContent } from '../api/files';
import logo from '../assets/shnoor-logo.png';

const Share = () => {
  const { token } = useParams();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewText, setPreviewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const data = await getSharedFile(token);
        setFile(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFile();
  }, [token]);

  useEffect(() => {
    if (previewOpen && file && file.mimeType === 'text/plain') {
      fetch(file.url)
        .then(res => res.text())
        .then(setPreviewText)
        .catch(() => setPreviewText('Could not load text content.'));
    }
  }, [previewOpen, file]);

  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (e) {
      window.open(url, '_blank');
    }
  };

  const handleRename = async () => {
    const newName = prompt('Enter new filename:', file.name);
    if (!newName || newName === file.name) return;

    try {
      const updated = await renameSharedFile(token, newName);
      setFile(updated);
    } catch (e) {
      alert(e.message);
    }
  };

  const handleSaveContent = async () => {
    setSaving(true);
    try {
      await updateSharedFileContent(token, previewText);
      alert('Changes saved successfully!');
      setIsEditing(false);
    } catch (e) {
      alert('Save failed: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#334155,transparent)] opacity-20" />
        <Loader2 className="animate-spin text-amber-500 mb-6 relative z-10" size={64} />
        <p className="font-black text-white text-2xl tracking-tighter relative z-10">Decrypting Secure Vault...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-10 text-center">
        <div className="w-24 h-24 bg-red-100 text-red-600 rounded-[2.5rem] flex items-center justify-center mb-8">
          <AlertTriangle size={48} />
        </div>
        <h1 className="font-black text-slate-900 text-4xl tracking-tighter mb-4">Link Expired or Invalid</h1>
        <p className="text-slate-400 font-medium max-w-md mb-10">This secure link is no longer available. Please ask the owner to generate a new sharing link.</p>
        <Link to="/" className="root-sm">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c10] flex flex-col relative overflow-hidden selection:bg-amber-500/30">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <header className="relative z-10 px-10 py-8 flex justify-between items-center bg-white/5 backdrop-blur-md border-b border-white/10">
        <Link to="/" className="flex items-center gap-4 group">
          <img src={logo} alt="Shnoor Cloud" className="h-10 transition-transform group-hover:scale-110" />
          <span className="font-black text-2xl tracking-tighter text-white uppercase">Shnoor<span className="text-amber-500">Cloud</span></span>
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center p-6 md:p-20">
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white w-full max-w-4xl rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            <div className="p-12 md:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-inner">
                <FileText size={48} />
              </div>
              <h2 className="font-black text-slate-900 text-4xl md:text-5xl tracking-tighter mb-6 leading-none break-words">{file.name}</h2>
              <div className="flex flex-wrap items-center gap-3 mb-10">
                <span className="px-4 py-2 bg-slate-100 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest">{file.size < 1024 ? `${file.size} B` : `${(file.size / 1024).toFixed(1)} KB`}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-12 md:p-20 flex flex-col justify-center">
              <div className="space-y-6">
                <button 
                  onClick={() => setPreviewOpen(true)}
                  className="w-full h-24 rounded-3xl bg-slate-900 text-white flex items-center justify-between px-10 group hover:bg-slate-800 transition-all shadow-xl"
                >
                  <div className="text-left">
                    <p className="font-black text-xl tracking-tight">Preview Asset</p>
                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">View in cloud browser</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Eye size={24} />
                  </div>
                </button>

                <button 
                  onClick={() => handleDownload(file.url, file.name)}
                  className="w-full h-24 rounded-3xl bg-white text-slate-900 border-2 border-slate-900 flex items-center justify-between px-10 group hover:bg-slate-50 transition-all shadow-sm"
                >
                  <div className="text-left">
                    <p className="font-black text-xl tracking-tight">Download File</p>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Save to local device</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Download size={24} />
                  </div>
                </button>
                
                {file.sharePermission === 'edit' && (
                  <button 
                    onClick={handleRename}
                    className="w-full h-24 rounded-3xl bg-amber-50 text-amber-600 border-2 border-amber-200 flex items-center justify-between px-10 group hover:bg-amber-100 transition-all shadow-sm"
                  >
                    <div className="text-left">
                      <p className="font-black text-xl tracking-tight">Edit Filename</p>
                      <p className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">Update asset metadata</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-200/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Edit3 size={24} />
                    </div>
                  </button>
                )}
              </div>
              <div className="mt-12 pt-10 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                      <Lock size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Policy</p>
                      <p className="font-bold text-slate-900">{file.sharePermission === 'edit' ? 'Read/Write Access' : 'View Only Access'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {previewOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-7xl h-full rounded-[3.5rem] overflow-hidden flex flex-col relative"
            >
              <div className="flex justify-between items-center px-10 py-8 border-b border-slate-100">
                <div>
                  <h3 className="font-black text-slate-900 text-2xl md:text-3xl tracking-tighter">{file.name}</h3>
                </div>
                <button onClick={() => setPreviewOpen(false)} className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center shadow-inner">
                  <X size={28} />
                </button>
              </div>
              <div className="flex-1 bg-slate-50 flex items-center justify-center overflow-hidden">
                {file.mimeType.startsWith('image/') ? (
                  <img src={file.url} alt={file.name} className="max-w-full max-h-full object-contain shadow-2xl" />
                ) : file.mimeType === 'text/plain' ? (
                  <div className="w-full h-full p-12 md:p-20 overflow-auto bg-white">
                    {isEditing ? (
                      <textarea 
                        className="w-full h-full text-sm md:text-base text-slate-900 font-mono whitespace-pre-wrap leading-relaxed border-none focus:ring-0 p-0"
                        value={previewText}
                        onChange={(e) => setPreviewText(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <pre className="text-sm md:text-base text-slate-600 font-mono whitespace-pre-wrap leading-relaxed">{previewText || 'Synchronizing buffer...'}</pre>
                    )}
                  </div>
                ) : (
                  <iframe 
                    src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(file.url)}`}
                    className="w-full h-full border-none"
                    title="Preview"
                  />
                )}
              </div>
              <div className="px-10 py-8 bg-white border-t border-slate-100 flex justify-between items-center">
                <div className="flex gap-4">
                  {(file.mimeType === 'text/plain' || file.name.toLowerCase().endsWith('.txt')) && file.sharePermission === 'edit' && (
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 ${isEditing ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      <Edit3 size={18} /> {isEditing ? 'Cancel Edit' : 'Edit Document'}
                    </button>
                  )}
                  {isEditing && (
                    <button 
                      onClick={handleSaveContent}
                      disabled={saving}
                      className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center gap-3 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                    >
                      {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                      Save Changes
                    </button>
                  )}
                </div>
                <button onClick={() => { setPreviewOpen(false); setIsEditing(false); }} className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all">
                  Exit Viewer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 py-10 text-center">
      </footer>
    </div>
  );
};

export default Share;