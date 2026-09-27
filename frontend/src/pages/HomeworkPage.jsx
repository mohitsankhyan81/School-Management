import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileText, Calendar, Upload, CheckCircle2, Clock } from 'lucide-react';

export const HomeworkPage = () => {
  const { authFetch } = useAuth();
  const [homework, setHomework] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  useEffect(() => {
    authFetch('/api/homework')
      .then(res => res.json())
      .then(data => { if (data.success) setHomework(data.homework); });
  }, []);

  const handleSubmitAssignment = (hwId) => {
    authFetch('/api/homework/submit', {
      method: 'POST',
      body: JSON.stringify({ hwId, fileName: 'Mohit_Solutions_Quadratic.pdf' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSubmissionSuccess(true);
          setTimeout(() => setSubmissionSuccess(false), 3000);
          authFetch('/api/homework').then(r => r.json()).then(d => setHomework(d.homework));
        }
      });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-400" /> Homework & Assignment Hub
          </h1>
          <p className="text-xs text-slate-400">Assignment creation, online document submissions, and teacher evaluation.</p>
        </div>
      </div>

      {submissionSuccess && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" /> Assignment PDF submitted successfully to teacher!
        </div>
      )}

      <div className="space-y-4">
        {homework.map((hw) => (
          <div key={hw.id} className="glass-card rounded-2xl p-6 space-y-4 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                  {hw.subject} • {hw.className}
                </span>
                <h3 className="font-bold text-base text-white mt-1">{hw.topic}</h3>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-indigo-400" /> Assigned: {hw.assignedDate}</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold"><Clock className="h-3.5 w-3.5" /> Due: {hw.dueDate}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300">{hw.instructions}</p>
            <p className="text-[11px] text-slate-400">Assigned by Faculty: <strong className="text-slate-200">{hw.teacher}</strong></p>

            <div className="bg-slate-950/60 rounded-xl p-4 space-y-3">
              <h4 className="font-bold text-xs text-slate-200">Submissions & Teacher Feedback</h4>
              {hw.submissions.map((sub, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div>
                    <span className="font-bold text-white">{sub.name}</span>
                    <p className="text-[10px] text-indigo-400 mt-0.5">File: {sub.file} ({sub.date})</p>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {sub.status} • Score: {sub.marks}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5 italic">"{sub.feedback}"</p>
                  </div>
                </div>
              ))}

              <button
                onClick={() => handleSubmitAssignment(hw.id)}
                className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition"
              >
                <Upload className="h-3.5 w-3.5" /> Submit Homework PDF Solution
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
