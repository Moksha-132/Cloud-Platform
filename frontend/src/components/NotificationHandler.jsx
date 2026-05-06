import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Bell, X, MessageSquare, Edit3, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationHandler = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    const socket = io('http://localhost:5000');
    socket.on('new_contact_message', (data) => {
      const newNotification = {
        id: Date.now(),
        type: 'inquiry',
        title: 'New Inquiry',
        name: data.name,
        message: data.message,
        icon: <MessageSquare size={24} />,
        color: 'amber'
      };
      addNotification(newNotification);

      if (Notification.permission === 'granted') {
        new Notification('New Contact Message', {
          body: `${data.name} sent a message regarding ${data.department}.`,
          icon: '/favicon.ico'
        });
      }
    });
    socket.on('shared_item_modified', (data) => {
      const newNotification = {
        id: Date.now(),
        type: 'modification',
        title: 'Asset Modified',
        name: data.name,
        message: `Someone ${data.type === 'rename' ? 'renamed' : 'edited'} the shared ${data.itemType}: "${data.name}"`,
        icon: data.type === 'rename' ? <Type size={24} /> : <Edit3 size={24} />,
        color: 'blue'
      };
      addNotification(newNotification);
      if (Notification.permission === 'granted') {
        new Notification('Asset Modified', {
          body: `A shared ${data.itemType} has been ${data.type === 'rename' ? 'renamed' : 'edited'}.`,
          icon: '/favicon.ico'
        });
      }
    });

    return () => socket.disconnect();
  }, []);

  const addNotification = (n) => {
    setNotifications(prev => [n, ...prev]);
    setTimeout(() => {
      removeNotification(n.id);
    }, 10000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="pointer-events-auto bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 w-96 flex gap-4 relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${notification.color === 'amber' ? 'bg-amber-500' : 'bg-blue-500'}`} />
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notification.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
              {notification.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-black uppercase tracking-widest ${notification.color === 'amber' ? 'text-amber-600' : 'text-blue-600'}`}>
                  {notification.title}
                </span>
                <button 
                  onClick={() => removeNotification(notification.id)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              </div>
              <h4 className="font-bold text-slate-900 leading-tight truncate">{notification.name}</h4>
              <p className="text-sm text-slate-500 line-clamp-2 mt-1">{notification.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationHandler;