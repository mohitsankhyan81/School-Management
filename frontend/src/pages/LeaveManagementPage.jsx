import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileQuestion, CheckCircle2, XCircle, Calendar } from 'lucide-react';

export const LeaveManagementPage = () => {
  const { authFetch } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    authFetch('/api/leave-requests')
      .then(res => res.json())
      .then(data => { if (data.success) setLeaveRequests(data.leaveRequests); });
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    authFetch('/api/leave-requests/update', {
      method: 'POST',
      body: JSON.stringify({ id, status: newStatus })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLeaveRequests(prev => prev.map(l => l.id === id ? data.leaveRequest : l));
        }
      });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileQuestion className="h-6 w-6 text-indigo-400" /> Student & Teacher Leave Requests
          </h1>
          <p className="text-xs text-slate-400">Leave applications, medical reasons, date duration, and admin approval buttons.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">Applications Desk</h3>

        <div className="space-y-3">
          {leaveRequests.map((l) => (
            <div key={l.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{l.applicantName}</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">{l.userRole}</span>
                </div>
                <p className="text-slate-300">Reason: <strong className="text-slate-100">{l.reason}</strong></p>
                <p className="text-slate-400 text-[11px] flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5 text-indigo-400" /> Duration: {l.fromDate} to {l.toDate}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-lg font-bold text-xs ${
                  l.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {l.status}
                </span>

                {l.status === 'Pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(l.id, 'Approved')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(l.id, 'Rejected')}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg transition flex items-center gap-1"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
