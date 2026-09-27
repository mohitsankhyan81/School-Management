import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Layers, Plus } from 'lucide-react';

export const ClassManagement = () => {
  const { authFetch } = useAuth();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    authFetch('/api/classes').then(res => res.json()).then(data => setClasses(data.classes || []));
    authFetch('/api/subjects').then(res => res.json()).then(data => setSubjects(data.subjects || []));
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-400" /> Class, Section & Subject Management
        </h1>
        <p className="text-xs text-slate-400">Manage academic hierarchy, class teachers, room allocations and teacher-subject matrix.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-indigo-400" /> Classes & Sections Tree
            </h3>
            <button className="text-xs text-indigo-400 font-semibold hover:underline flex items-center gap-1">
              <Plus className="h-3.5 w-3.5" /> Add Class / Section
            </button>
          </div>

          <div className="space-y-4">
            {classes.map((c, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-base text-indigo-300">{c.className}</span>
                  <span className="text-xs text-slate-400">{c.sections.length} Active Sections</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {c.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="glass-card rounded-xl p-3 text-xs space-y-1">
                      <div className="flex justify-between items-center font-bold text-white">
                        <span>Section {sec.section}</span>
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">{sec.roomNo}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">Teacher: <span className="text-slate-200 font-medium">{sec.classTeacher}</span></p>
                      <p className="text-slate-400 text-[11px]">Enrolled: <span className="text-emerald-400 font-bold">{sec.studentCount} Students</span></p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-400" /> Subject Allocation Matrix
            </h3>
          </div>

          <table className="w-full text-xs text-left">
            <thead className="bg-slate-800/60 text-slate-400 border-b border-slate-700">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Subject Name</th>
                <th className="p-3">Assigned Teacher</th>
                <th className="p-3 text-center">Periods/Wk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {subjects.map((sub, i) => (
                <tr key={i} className="hover:bg-slate-800/30">
                  <td className="p-3 font-mono text-indigo-400 font-bold">{sub.code}</td>
                  <td className="p-3 font-bold text-white">{sub.name}</td>
                  <td className="p-3 text-emerald-400 font-medium">{sub.teacher}</td>
                  <td className="p-3 text-center font-bold text-slate-300">{sub.weeklyPeriods}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
