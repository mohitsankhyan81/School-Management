import React from 'react';
import { Clock } from 'lucide-react';

export const TeacherDashboard = () => {
  const teacher = {
    name: "Rahul Sharma",
    id: "T-101",
    subject: "Mathematics",
    classes: ["Class 10-A", "Class 10-B", "Class 9-A"],
    todaySchedule: [
      { time: "09:00 AM", class: "Class 10-A", subject: "Mathematics", room: "Room 101" },
      { time: "10:00 AM", class: "Class 10-B", subject: "Mathematics", room: "Room 102" },
      { time: "11:15 AM", class: "Class 9-A", subject: "Mathematics", room: "Room 201" }
    ]
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="glass-card rounded-3xl p-6 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold inline-block mb-1">
            Faculty Workspace
          </span>
          <h1 className="text-2xl font-extrabold text-white">Welcome, Mr. {teacher.name}</h1>
          <p className="text-xs text-slate-400">Senior Faculty • {teacher.subject} Department</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-indigo-500/30">
          <span className="text-xs font-semibold text-slate-400">Assigned Classes</span>
          <div className="flex gap-2 mt-2">
            {teacher.classes.map((c, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-indigo-950 border border-indigo-800 text-indigo-300 text-xs font-bold">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-emerald-500/30">
          <span className="text-xs font-semibold text-slate-400">Today's Lectures</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">{teacher.todaySchedule.length} Periods</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-amber-500/30">
          <span className="text-xs font-semibold text-slate-400">Assignments to Grade</span>
          <div className="text-2xl font-black text-amber-400 mt-1">1 Pending</div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Clock className="h-4 w-4 text-indigo-400" /> Today's Period Schedule (25 Sept)
        </h3>

        <div className="space-y-3">
          {teacher.todaySchedule.map((s, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex justify-between items-center text-xs">
              <div className="flex items-center gap-4">
                <span className="font-mono text-indigo-400 font-bold bg-indigo-950/80 px-3 py-1.5 rounded-lg border border-indigo-800">
                  {s.time}
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">{s.class} — {s.subject}</h4>
                  <p className="text-slate-400 text-[11px]">Venue: {s.room}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-semibold rounded-lg">
                Marked Present
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
