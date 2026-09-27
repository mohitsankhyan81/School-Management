import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Megaphone, Calendar, Plus, Send } from 'lucide-react';

export const NoticeBoard = () => {
  const { authFetch } = useAuth();
  const [notices, setNotices] = useState([]);
  const [filterTarget, setFilterTarget] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    target: 'Parents',
    content: ''
  });

  useEffect(() => {
    authFetch('/api/notices').then(res => res.json()).then(data => { if (data.success) setNotices(data.notices); });
  }, []);

  const handleCreateNotice = (e) => {
    e.preventDefault();
    authFetch('/api/notices', {
      method: 'POST',
      body: JSON.stringify(newNotice)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNotices(prev => [data.notice, ...prev]);
          setShowAdd(false);
          setNewNotice({ title: '', target: 'Parents', content: '' });
        }
      });
  };

  const filtered = filterTarget === 'All' 
    ? notices 
    : notices.filter(n => n.target === filterTarget || n.target === 'All Students');

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-amber-400" /> Notice & Announcement System
          </h1>
          <p className="text-xs text-slate-400">Official broadcasts for parents, teachers, students, and administrative staff.</p>
        </div>

        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition"
        >
          <Plus className="h-4 w-4" /> Publish New Notice
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreateNotice} className="glass-card rounded-2xl p-5 space-y-4 border border-amber-500/30">
          <h3 className="font-bold text-sm text-white">Create Official Circular Notice</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Notice Title (e.g. 📢 Parent-Teacher Meeting)"
              value={newNotice.title}
              onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
              required
            />
            <select
              value={newNotice.target}
              onChange={(e) => setNewNotice({ ...newNotice, target: e.target.value })}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
            >
              <option value="Parents">Target: Parents</option>
              <option value="All Students">Target: All Students</option>
              <option value="Teachers">Target: Teachers</option>
              <option value="Staff">Target: Staff</option>
            </select>
          </div>
          <textarea
            placeholder="Write announcement details..."
            rows="3"
            value={newNotice.content}
            onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-amber-500"
            required
          />
          <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5">
            <Send className="h-3.5 w-3.5" /> Broadcast Notice
          </button>
        </form>
      )}

      <div className="flex gap-2 text-xs">
        {['All', 'Parents', 'All Students', 'Teachers'].map((t) => (
          <button
            key={t}
            onClick={() => setFilterTarget(t)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition ${
              filterTarget === t 
                ? 'bg-amber-500 text-slate-950 font-bold shadow' 
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {t} Notices
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((n) => (
          <div key={n.id} className="glass-card rounded-2xl p-5 space-y-3 border border-slate-800">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                {n.target}
              </span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Calendar className="h-3 w-3 text-indigo-400" /> {n.date}
              </span>
            </div>
            <h3 className="font-bold text-base text-white">{n.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{n.content}</p>
            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
              <span>Posted by: {n.postedBy}</span>
              <span>Time: {n.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
