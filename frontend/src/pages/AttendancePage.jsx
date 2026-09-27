import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AttendancePage = () => {
  const { authFetch } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    authFetch('/api/attendance')
      .then(res => res.json())
      .then(data => { if (data.success) setAttendance(data.attendance); });
  }, []);

  const handleStatusChange = (studentId, newStatus) => {
    authFetch('/api/attendance/mark', {
      method: 'POST',
      body: JSON.stringify({ studentId, status: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAttendance(data.attendance);
        }
      });
  };

  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const absentCount = attendance.filter(a => a.status === 'Absent').length;

  const triggerParentAbsentAlert = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 4000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-emerald-400" /> Attendance Roll-Call & Reports
          </h1>
          <p className="text-xs text-slate-400">Class 10-A Daily Roll-Call • 25 September 2026</p>
        </div>

        <button
          onClick={triggerParentAbsentAlert}
          className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-rose-600/30 transition"
        >
          <AlertTriangle className="h-4 w-4" /> Send Absent Alerts to Parents
        </button>
      </div>

      {alertSent && (
        <div className="bg-rose-950/60 border border-rose-500/40 p-4 rounded-2xl text-xs text-rose-200 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-rose-400" />
            <span><strong>Notification Broadcasted:</strong> "Your child was marked absent today." sent to 1 parent via App Alert & SMS.</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Total Students</span>
          <div className="text-xl font-bold text-white mt-1">{attendance.length}</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <span className="text-[10px] text-emerald-400 font-bold uppercase">Present Today</span>
          <div className="text-xl font-bold text-emerald-400 mt-1">{presentCount}</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <span className="text-[10px] text-rose-400 font-bold uppercase">Absent Today</span>
          <div className="text-xl font-bold text-rose-400 mt-1">{absentCount}</div>
        </div>
        <div className="glass-card rounded-xl p-4">
          <span className="text-[10px] text-indigo-400 font-bold uppercase">Class Attendance %</span>
          <div className="text-xl font-bold text-indigo-400 mt-1">
            {attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 0}%
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">Class 10-A Student Attendance Sheet</h3>

        <div className="space-y-3">
          {attendance.map((item) => (
            <div key={item.studentId} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 gap-3">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center">
                  #{item.rollNo}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">ID: {item.studentId} • Remark: {item.remark}</p>
                </div>
              </div>

              <div className="flex gap-1.5">
                {[
                  { status: 'Present', color: 'bg-emerald-600 text-white', inactive: 'bg-slate-800 text-slate-400 hover:text-slate-200' },
                  { status: 'Absent', color: 'bg-rose-600 text-white', inactive: 'bg-slate-800 text-slate-400 hover:text-slate-200' },
                  { status: 'Late', color: 'bg-amber-600 text-white', inactive: 'bg-slate-800 text-slate-400 hover:text-slate-200' },
                  { status: 'Half Day', color: 'bg-indigo-600 text-white', inactive: 'bg-slate-800 text-slate-400 hover:text-slate-200' }
                ].map((btn) => (
                  <button
                    key={btn.status}
                    onClick={() => handleStatusChange(item.studentId, btn.status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      item.status === btn.status ? btn.color : btn.inactive
                    }`}
                  >
                    {btn.status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
