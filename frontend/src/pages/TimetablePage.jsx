import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Clock } from 'lucide-react';

export const TimetablePage = () => {
  const { authFetch } = useAuth();
  const [timetable, setTimetable] = useState([]);
  const [selectedClass, setSelectedClass] = useState('Class 10-A');

  useEffect(() => {
    authFetch('/api/timetable')
      .then(res => res.json())
      .then(data => { if (data.success) setTimetable(data.timetable); });
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Clock className="h-6 w-6 text-indigo-400" /> Weekly Timetable Management
          </h1>
          <p className="text-xs text-slate-400">Class period schedules, room allocations, and teacher timetable matrix.</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-semibold">Select View:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-indigo-500"
          >
            <option>Class 10-A (Room 101)</option>
            <option>Class 10-B (Room 102)</option>
            <option>Class 9-A (Room 201)</option>
            <option>Teacher View (Rahul Sharma)</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-800/80 text-slate-300 font-bold border-b border-slate-700">
              <th className="p-4 border-r border-slate-700 w-44">Time / Period</th>
              <th className="p-4 text-center">Monday</th>
              <th className="p-4 text-center">Tuesday</th>
              <th className="p-4 text-center">Wednesday</th>
              <th className="p-4 text-center">Thursday</th>
              <th className="p-4 text-center">Friday</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {timetable.map((t, idx) => {
              const isRecess = t.monday.includes('RECESS');
              return (
                <tr key={idx} className={isRecess ? 'bg-indigo-950/40 text-indigo-300 font-bold' : 'hover:bg-slate-800/30'}>
                  <td className="p-4 font-semibold text-slate-200 border-r border-slate-800 bg-slate-900/60">
                    {t.time}
                  </td>
                  {isRecess ? (
                    <td colSpan="5" className="p-3 text-center tracking-widest uppercase text-indigo-400 font-bold text-xs bg-indigo-950/30">
                      ☕ RECESS BREAK (45 MINS)
                    </td>
                  ) : (
                    <>
                      <td className="p-3 text-center font-bold text-white"><span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 inline-block">{t.monday}</span></td>
                      <td className="p-3 text-center font-bold text-white"><span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 inline-block">{t.tuesday}</span></td>
                      <td className="p-3 text-center font-bold text-white"><span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 inline-block">{t.wednesday}</span></td>
                      <td className="p-3 text-center font-bold text-white"><span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 inline-block">{t.thursday}</span></td>
                      <td className="p-3 text-center font-bold text-white"><span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 inline-block">{t.friday}</span></td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
