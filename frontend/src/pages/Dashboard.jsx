import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, FileText, Search, Plus, 
  LogOut, HardDrive, Clock, Star, 
  Trash2, Users, Grid, List, 
  MoreVertical, Upload, FolderPlus, 
  Download, Share2, Loader2, ChevronLeft,
  Edit2, Move, Link as LinkIcon, Eye, X, RefreshCw, Save
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/shnoor-logo.png';
import { getFiles, uploadFile, createFolder, renameFile, deleteFile, shareFile, toggleStar, restoreFile, deleteForever, updateFileContent, moveFile } from '../api/files';

const Dashboard = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('grid');
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState([]);
  const [history, setHistory] = useState([null]);
  const [parentId, setParentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState(null);
  const [activeTab, setActiveTab] = useState('files');
  const [previewItem, setPreviewItem] = useState(null);
  const [previewText, setPreviewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [shareDialog, setShareDialog] = useState(null);
  const [moveDialog, setMoveDialog] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.action-menu')) {
        setMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (previewItem && previewItem.mimeType === 'text/plain') {
      fetch(previewItem.url)
        .then(res => res.text())
        .then(setPreviewText)
        .catch(err => setPreviewText('Could not load text content.'));
    } else {
      setPreviewText('');
    }
  }, [previewItem]);

  useEffect(() => {
    const storedUser = localStorage.getItem('shnoor_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [parentId, activeTab]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const data = await getFiles(parentId || '', activeTab);
      setFiles(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadFile(file, parentId || '');
      await fetchFiles();
      alert('File synced to cloud successfully!');
    } catch (e) {
      console.error(e);
      alert('Upload failed: ' + (e.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
  };

  const handleNewFolder = async () => {
    const name = prompt('Folder name:');
    if (!name) return;
    try {
      await createFolder(name, parentId || '');
      await fetchFiles();
    } catch (e) {
      console.error(e);
    }
  };

  const handleRename = async (id, oldName) => {
    const name = prompt('New name:', oldName);
    if (!name || name === oldName) return;
    try {
      await renameFile(id, name);
      await fetchFiles();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await deleteFile(id);
      await fetchFiles();
    } catch (e) {
      console.error(e);
    }
  };

  const confirmShare = (item) => {
    setShareDialog(item);
  };

  const handleShare = async (id, permission = 'view') => {
    try {
      const { url } = await shareFile(id, permission);
      navigator.clipboard.writeText(url);
      alert(`Shared link (${permission === 'edit' ? 'Can Edit' : 'View Only'}) copied to clipboard!`);
      setShareDialog(null);
    } catch (e) {
      console.error(e);
      alert('Share failed: ' + e.message);
    }
  };

  const handleMove = async (targetFolderId) => {
    if (!moveDialog) return;
    try {
      await moveFile(moveDialog._id, targetFolderId);
      await fetchFiles();
      setMoveDialog(null);
      alert('Asset moved successfully!');
    } catch (e) {
      alert('Move failed: ' + e.message);
    }
  };

  const handleToggleStar = async (id) => {
    setFiles(prev => prev.map(f => f._id === id ? { ...f, isStarred: !f.isStarred } : f));
    try {
      await toggleStar(id);
    } catch (e) {
      console.error(e);
      setFiles(prev => prev.map(f => f._id === id ? { ...f, isStarred: !f.isStarred } : f));
    }
  };

  const handleRestore = async (id) => {
    try {
      await restoreFile(id);
      fetchFiles();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteForever = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this file? This action cannot be undone.')) return;
    try {
      await deleteForever(id);
      fetchFiles();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveContent = async () => {
    try {
      await updateFileContent(previewItem._id, previewText);
      alert('Changes saved successfully!');
      setIsEditing(false);
      fetchFiles();
    } catch (e) {
      alert('Save failed: ' + e.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('shnoor_user');
    navigate('/login');
  };
  
  const handlePreview = async (item) => {
    setIsEditing(false);
    setPreviewText('Synchronizing vault buffer...');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/files/${item._id}`, {
        headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('shnoor_user')).token}` }
      });
      const latest = await res.json();
      setPreviewItem(latest);
    } catch (e) {
      console.error('Meta sync failed', e);
      setPreviewItem(item);
    }
  };

  const getDownloadUrl = (item) => {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const user = JSON.parse(localStorage.getItem('shnoor_user') || '{}');
    const token = user.token;
    const type = item.type === 'folder' ? 'folder' : 'file';
    return `${apiBase}/files/download/${type}/${item._id}?token=${token}`;
  };

  const enterFolder = (folder) => {
    setParentId(folder._id);
    setHistory([...history, folder._id]);
  };

  const goBack = () => {
    if (history.length <= 1) return;
    const prev = history[history.length - 2];
    setParentId(prev);
    setHistory(history.slice(0, -1));
  };

  const filtered = files.filter(f => f.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      
      <aside className="wing border-r border-slate-100 bg-[#FBFBFC]">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <img src={logo} alt="Shnoor" className="h-8 w-auto" />
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">Shnoor <span className="text-amber-500">Cloud</span></span>
          </Link>

          <div className="relative group mb-10">
            <button className="root w-full shadow-lg shadow-amber-500/10">
              <Plus size={20} /> New
            </button>
            <div className="absolute top-full left-0 w-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
               <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                  <label className="flex items-center gap-3 px-6 py-4 hover:bg-slate-50 cursor-pointer text-sm font-bold text-slate-600">
                    <Upload size={18} /> Upload File
                    <input type="file" className="hidden" onChange={handleUpload} />
                  </label>
                  <button onClick={handleNewFolder} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-slate-50 text-sm font-bold text-slate-600 border-t border-slate-50">
                    <FolderPlus size={18} /> New Folder
                  </button>
               </div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { icon: <HardDrive size={20} />, label: 'My Files', id: 'files' },
              { icon: <Users size={20} />, label: 'Shared', id: 'shared' },
              { icon: <Star size={20} />, label: 'Starred', id: 'starred' },
              { icon: <Clock size={20} />, label: 'Recent', id: 'recent' },
              { icon: <Trash2 size={20} />, label: 'Trash', id: 'trash' },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === item.id ? 'bg-amber-50 text-amber-600' : 'text-slate-400 hover:bg-white hover:text-slate-900'}`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>Storage</span>
              <span className="text-slate-900">{user?.storageUsed ? Math.round((user.storageUsed / user.storageLimit) * 100) : 0}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${user?.storageUsed ? (user.storageUsed / user.storageLimit) * 100 : 0}%` }} />
            </div>
            <p className="text-[10px] text-slate-400 font-bold text-center">Using free tier (100MB) • Max 10MB/file</p>
          </div>
        </div>
      </aside>

      <div className="deck bg-white flex-1 flex flex-col overflow-hidden">
        <header className="bar border-b border-slate-50">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input type="text" placeholder="Search your vault..." className="soil pl-16 py-4 border-transparent focus:border-amber-500/20" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Welcome back,</p>
              <h4 className="font-black text-slate-900 text-lg tracking-tighter">Hello, {user?.name?.split(' ')[0]}!</h4>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-amber-500/20">
                {user?.name?.charAt(0) || 'S'}
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-500 font-bold text-sm hover:bg-red-50 rounded-xl transition-all"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </header>

        <main className="main">
          <div className="mb-12 flex justify-between items-end">
            <div className="flex items-center gap-6">
               {parentId && (
                 <button onClick={goBack} className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all">
                    <ChevronLeft size={24} />
                 </button>
               )}
               <div>
                  <h2 className="text-4xl font-black text-slate-900 tracking-tighter">My Files</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Personal Secure Vault</p>
               </div>
            </div>
            {uploading && <div className="flex items-center gap-3 text-amber-500 font-black text-xs uppercase tracking-widest bg-amber-50 px-4 py-2 rounded-full"><Loader2 className="animate-spin" size={16} /> Syncing...</div>}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 text-slate-200">
              <Loader2 className="animate-spin mb-6" size={48} />
              <p className="font-black uppercase tracking-[0.2em] text-[10px] text-slate-400">Opening Vault...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-slate-200">
              <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center mb-8">
                <HardDrive size={48} />
              </div>
              <p className="font-black text-2xl text-slate-300">Vault Empty</p>
              <p className="text-sm text-slate-400 mt-2 font-medium">Upload files to secure your trade assets</p>
            </div>
          ) : view === 'grid' ? (
            <motion.div initial="initial" animate="animate" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
              {filtered.map((item) => (
                <motion.div key={item._id} onDoubleClick={() => item.type === 'folder' ? enterFolder(item) : handlePreview(item)} className="card-sm group relative hover:-translate-y-2">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.type === 'folder' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                      {item.type === 'folder' ? <Folder size={32} /> : <FileText size={32} />}
                    </div>
                    
                    <div className="flex items-center gap-1">
                       <button 
                         onClick={(e) => { e.stopPropagation(); handleToggleStar(item._id); }} 
                         className={`p-2 transition-all ${item.isStarred ? 'text-amber-500 scale-125' : 'text-slate-200 hover:text-slate-400 opacity-0 group-hover:opacity-100'}`}
                       >
                         <Star size={18} fill={item.isStarred ? "currentColor" : "none"} />
                       </button>
                       <div className="relative action-menu">
                         <button onClick={(e) => { e.stopPropagation(); setMenu(menu === item._id ? null : item._id); }} className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                           <MoreVertical size={20} />
                         </button>
                         <AnimatePresence>
                           {menu === item._id && (
                             <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }} className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                                {activeTab === 'trash' ? (
                                  <>
                                    <button onClick={() => handleRestore(item._id)} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-emerald-50 text-sm font-bold text-emerald-600">
                                      <RefreshCw size={16} /> Restore
                                    </button>
                                    <button onClick={() => handleDeleteForever(item._id)} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-50 text-sm font-bold text-red-600 border-t border-slate-50">
                                      <Trash2 size={16} /> Delete Forever
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    {item.type === 'file' && (
                                      <button onClick={() => handlePreview(item)} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-slate-50 text-sm font-bold text-slate-600">
                                        <Eye size={16} /> Preview
                                      </button>
                                    )}
                                    <button onClick={() => handleRename(item._id, item.name)} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-slate-50 text-sm font-bold text-slate-600 border-t border-slate-50">
                                      <Edit2 size={16} /> Rename
                                    </button>
                                    <button onClick={() => confirmShare(item)} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-slate-50 text-sm font-bold text-slate-600 border-t border-slate-50">
                                      <LinkIcon size={16} /> Share Link
                                    </button>
                                    <button onClick={() => setMoveDialog(item)} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-slate-50 text-sm font-bold text-slate-600 border-t border-slate-50">
                                      <Move size={16} /> Move to Folder
                                    </button>
                                    <button onClick={() => handleDelete(item._id)} className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-50 text-sm font-bold text-red-500 border-t border-slate-50">
                                      <Trash2 size={16} /> Delete
                                    </button>
                                  </>
                                )}
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </div>
                    </div>
                  </div>
                  <h3 className="font-black text-slate-900 mb-1 truncate text-lg pr-4">{item.name}</h3>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {item.type === 'folder' ? 'Vault Folder' : item.size < 1024 ? `${item.size} B` : `${(item.size / 1024).toFixed(1)} KB`}
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => handlePreview(item)} className="p-2 text-slate-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all"><Eye size={18} /></button>
                        <a href={getDownloadUrl(item)} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-all"><Download size={18} /></a>
                      </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="bg-white rounded-[3.5rem] border border-slate-50 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-50">
                  <tr>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Name</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Type</th>
                    <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Size</th>
                    <th className="px-10 py-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((item) => (
                    <tr key={item._id} onDoubleClick={() => item.type === 'folder' ? enterFolder(item) : handlePreview(item)} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6 font-black text-slate-900 text-lg">
                           <button 
                             onClick={(e) => { e.stopPropagation(); handleToggleStar(item._id); }} 
                             className={`p-1 transition-all ${item.isStarred ? 'text-amber-500' : 'text-slate-200 hover:text-slate-400 opacity-0 group-hover:opacity-100'}`}
                           >
                             <Star size={16} fill={item.isStarred ? "currentColor" : "none"} />
                           </button>
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'folder' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                               {item.type === 'folder' ? <Folder size={20} /> : <FileText size={20} />}
                            </div>
                           {item.name}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.type}</td>
                      <td className="px-10 py-8 text-sm font-bold text-slate-500">{item.type === 'folder' ? '--' : item.size < 1024 ? `${item.size} B` : `${(item.size / 1024).toFixed(1)} KB`}</td>
                      <td className="px-10 py-8 text-right">
                        <div className="flex gap-4 justify-end opacity-0 group-hover:opacity-100 transition-all">
                          {activeTab === 'trash' ? (
                            <>
                              <button onClick={() => handleRestore(item._id)} className="p-3 bg-white text-slate-400 rounded-xl hover:text-emerald-600 border border-slate-100 shadow-sm" title="Restore"><RefreshCw size={18} /></button>
                              <button onClick={() => handleDeleteForever(item._id)} className="p-3 bg-white text-slate-400 rounded-xl hover:text-red-600 border border-slate-100 shadow-sm" title="Delete Forever"><Trash2 size={18} /></button>
                            </>
                          ) : (
                            <>
                              {item.type === 'file' && (
                                <button onClick={() => handlePreview(item)} className="p-3 bg-white text-slate-400 rounded-xl hover:text-blue-600 border border-slate-100 shadow-sm"><Eye size={18} /></button>
                              )}
                              <button onClick={() => handleRename(item._id, item.name)} className="p-3 bg-white text-slate-400 rounded-xl hover:text-blue-600 border border-slate-100 shadow-sm"><Edit2 size={18} /></button>
                              <button onClick={() => confirmShare(item)} className="p-3 bg-white text-slate-400 rounded-xl hover:text-emerald-600 border border-slate-100 shadow-sm"><Share2 size={18} /></button>
                              <button onClick={() => handleDelete(item._id)} className="p-3 bg-white text-slate-400 rounded-xl hover:text-red-600 border border-slate-100 shadow-sm"><Trash2 size={18} /></button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>

      <AnimatePresence>
        {previewItem && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-10"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-6xl h-full rounded-[3rem] overflow-hidden flex flex-col relative"
            >
              <div className="flex justify-between items-center px-10 py-6 border-b border-slate-100">
                <div>
                  <h3 className="font-black text-slate-900 text-xl">{previewItem.name}</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    {previewItem.mimeType} • {previewItem.size < 1024 ? `${previewItem.size} B` : `${(previewItem.size / 1024).toFixed(1)} KB`}
                  </p>
                </div>
                <button onClick={() => { setPreviewItem(null); setIsEditing(false); }} className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all flex items-center justify-center">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 bg-slate-50 flex items-center justify-center overflow-hidden">
                {previewItem.mimeType.startsWith('image/') ? (
                  <img src={previewItem.url} alt={previewItem.name} className="max-w-full max-h-full object-contain shadow-2xl" />
                ) : previewItem.mimeType === 'text/plain' ? (
                  <div className="w-full h-full p-12 md:p-20 overflow-auto bg-white">
                    {isEditing ? (
                      <textarea 
                        className="w-full h-full text-sm md:text-base text-slate-900 font-mono whitespace-pre-wrap leading-relaxed border-none focus:ring-0 p-0"
                        value={previewText}
                        onChange={(e) => setPreviewText(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <pre className="text-sm md:text-base text-slate-600 font-mono whitespace-pre-wrap leading-relaxed">{previewText || 'Reading secure document...'}</pre>
                    )}
                  </div>
                ) : (
                  <iframe 
                    src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(previewItem.url)}`}
                    className="w-full h-full border-none"
                    title="Preview"
                  />
                )}
              </div>
              <div className="px-10 py-6 bg-white border-t border-slate-100 flex justify-between items-center">
                <div className="flex gap-4">
                   {previewItem.mimeType === 'text/plain' && (
                     <button 
                       onClick={() => setIsEditing(!isEditing)} 
                       className={`root-sm ${isEditing ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'}`}
                     >
                        <Edit2 size={18} /> {isEditing ? 'Cancel Edit' : 'Edit Content'}
                     </button>
                   )}
                   {isEditing && (
                     <button onClick={handleSaveContent} className="root-sm bg-emerald-500 text-white hover:bg-emerald-600">
                        <Save size={18} /> Save Changes
                     </button>
                   )}
                </div>
                <div className="flex gap-4">
                  <a href={getDownloadUrl(previewItem)} target="_blank" rel="noreferrer" className="root-sm bg-slate-100 text-slate-600 hover:bg-slate-200">
                    <Download size={18} /> Download
                  </a>
                  <button onClick={() => { setPreviewItem(null); setIsEditing(false); }} className="root-sm">
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {shareDialog && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-10"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden flex flex-col relative"
            >
              <div className="px-10 pt-10 pb-6 text-center">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                  <Share2 size={40} />
                </div>
                <h3 className="font-black text-slate-900 text-3xl tracking-tighter">Share with others</h3>
                <p className="text-slate-400 font-medium mt-2">Generate a secure link to collaborate on <span className="text-slate-900 font-bold">{shareDialog.name}</span></p>
              </div>

              <div className="px-10 pb-10 space-y-4">
                <button 
                  onClick={() => handleShare(shareDialog._id, 'view')}
                  className="w-full flex items-center gap-6 p-6 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 flex items-center justify-center transition-all">
                    <Eye size={24} />
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">View Only</div>
                    <div className="text-xs text-slate-400 font-medium">Recipient can only view and download.</div>
                  </div>
                </button>

                <button 
                  onClick={() => handleShare(shareDialog._id, 'edit')}
                  className="w-full flex items-center gap-6 p-6 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600 flex items-center justify-center transition-all">
                    <Edit2 size={24} />
                  </div>
                  <div>
                    <div className="font-black text-slate-900 text-lg">Can Edit</div>
                    <div className="text-xs text-slate-400 font-medium">Recipient can rename, move, and modify.</div>
                  </div>
                </button>

                <button 
                  onClick={() => setShareDialog(null)}
                  className="w-full py-4 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {moveDialog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-10">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white w-full max-w-lg rounded-[3rem] overflow-hidden flex flex-col relative">
              <div className="px-10 pt-10 pb-6 text-center">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                  <Move size={40} />
                </div>
                <h3 className="font-black text-slate-900 text-3xl tracking-tighter">Move Asset</h3>
                <p className="text-slate-400 font-medium mt-2">Select destination for <span className="text-slate-900 font-bold">{moveDialog.name}</span></p>
              </div>
              <div className="px-10 pb-10 space-y-3 max-h-[400px] overflow-auto">
                <button onClick={() => handleMove('')} className="w-full flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all text-left font-bold text-slate-600">
                  <HardDrive size={18} /> Root Directory (My Files)
                </button>
                {files.filter(f => f.type === 'folder' && f._id !== moveDialog._id).map(folder => (
                  <button key={folder._id} onClick={() => handleMove(folder._id)} className="w-full flex items-center gap-4 p-5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all text-left font-bold text-slate-600">
                    <Folder size={18} className="text-amber-500" /> {folder.name}
                  </button>
                ))}
                {files.filter(f => f.type === 'folder').length === 0 && (
                  <p className="text-center py-10 text-slate-400 font-medium text-sm italic">No other folders available</p>
                )}
                <button onClick={() => setMoveDialog(null)} className="w-full py-4 text-slate-400 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors border-t border-slate-50 mt-4">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div> 
  );
};

export default Dashboard;