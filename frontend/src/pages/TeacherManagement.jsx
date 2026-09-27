import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserCheck, BookOpen, Clock, Calendar, Mail, Phone, ShieldCheck, DollarSign, Award } from 'lucide-react';

export const TeacherManagement = () => {
  const { authFetch } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [viewTab, setViewTab] = useState('teachers');

  useEffect(() => {
    authFetch('/api/teachers')
      .then(res => res.json())
      .then(data => { if (data.success) setTeachers(data.teachers); });
    
    authFetch('/api/staff')
      .then(res => res.json())
      .then(data => { if (data.success) setStaff(data.staff); });
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <UserCheck className="h-6 w-6 text-emerald-400" /> Teacher & Staff Management
          </h1>
          <p className="text-xs text-slate-400">Complete faculty profiles, subject allocation, attendance & payroll status.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1">
          <button
            onClick={() => setViewTab('teachers')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${viewTab === 'teachers' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Teaching Staff ({teachers.length})
          </button>
          <button
            onClick={() => setViewTab('staff')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${viewTab === 'staff' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            Non-Teaching Staff ({staff.length})
          </button>
        </div>
      </div>

      {viewTab === 'teachers' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachers.map((t) => (
            <div key={t.id} className="glass-card glass-card-hover rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-14 w-14 rounded-2xl object-cover ring-2 ring-emerald-500/30"
                />
                <div>
                  <h3 className="font-bold text-base text-white">{t.name}</h3>
                  <p className="text-xs text-emerald-400 font-medium">ID: {t.id} • {t.subject}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.qualification}</p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-3 text-xs space-y-2 text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Assigned Classes:</span>
                  <div className="flex gap-1">
                    {t.classesAssigned.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-indigo-300 text-[10px] font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Joining Date:</span>
                  <span className="font-medium text-slate-200">{t.joiningDate}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Monthly Payroll:</span>
                  <span className="font-bold text-emerald-400">{t.salary}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Attendance Rating:</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold text-[10px]">
                    {t.attendance} Present
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-6">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-700">
              <tr>
                <th className="p-3">Staff ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Role / Department</th>
                <th className="p-3">Contact Phone</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono text-indigo-400 font-bold">{s.id}</td>
                  <td className="p-3 font-bold text-white">{s.name}</td>
                  <td className="p-3 text-slate-300 font-medium">{s.role}</td>
                  <td className="p-3 text-slate-400">{s.phone}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
