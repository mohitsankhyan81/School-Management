import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const ParentPortal = () => {
  const [msgText, setMsgText] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const child = {
    name: "Mohit Sharma",
    className: "Class 10-A",
    rollNo: 15,
    attendancePct: 94.8,
    feesDue: 5000,
    upcomingExam: "Mathematics (28 Sept)",
    homeworkCount: 2,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    setMsgSent(true);
    setMsgText('');
    setTimeout(() => setMsgSent(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="glass-card rounded-3xl p-6 border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={child.avatar}
            alt={child.name}
            className="h-16 w-16 rounded-2xl object-cover ring-4 ring-purple-500/40"
          />
          <div>
            <div className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold inline-block mb-1">
              Parent Portal View
            </div>
            <h1 className="text-2xl font-extrabold text-white">Child: {child.name}</h1>
            <p className="text-xs text-slate-400">{child.className} • Roll Number #{child.rollNo}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-emerald-500/30">
          <span className="text-xs font-semibold text-emerald-400">Attendance Rate</span>
          <div className="text-2xl font-black text-white mt-1">{child.attendancePct}%</div>
          <p className="text-[10px] text-slate-400 mt-1">Excellent attendance record</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-amber-500/30">
          <span className="text-xs font-semibold text-amber-400">Pending Fees Due</span>
          <div className="text-2xl font-black text-amber-400 mt-1">₹{child.feesDue.toLocaleString()}</div>
          <p className="text-[10px] text-slate-400 mt-1">Due Date: 10 Oct 2026</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-indigo-500/30">
          <span className="text-xs font-semibold text-indigo-400">Upcoming Examination</span>
          <div className="text-base font-bold text-white mt-1">{child.upcomingExam}</div>
          <p className="text-[10px] text-slate-400 mt-1">Mid Term 2026</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-cyan-500/30">
          <span className="text-xs font-semibold text-cyan-400">Pending Homework</span>
          <div className="text-2xl font-black text-white mt-1">{child.homeworkCount} Tasks</div>
          <p className="text-[10px] text-slate-400 mt-1">Maths & Science</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-purple-400" /> Direct Communication with Class Teacher (Rahul Sharma)
        </h3>

        {msgSent && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Message sent to Class Teacher successfully!
          </div>
        )}

        <form onSubmit={handleSendMessage} className="space-y-3">
          <textarea
            placeholder="Type your inquiry or message for Mr. Rahul Sharma..."
            rows="3"
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white outline-none focus:border-purple-500"
            required
          />
          <button type="submit" className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition">
            <Send className="h-3.5 w-3.5" /> Send Message to Teacher
          </button>
        </form>
      </div>
    </div>
  );
};
