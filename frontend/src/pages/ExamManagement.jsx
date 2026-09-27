import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FileSpreadsheet, Printer, Calendar, Clock } from 'lucide-react';
import { ReportCardModal } from '../components/ReportCardModal';

export const ExamManagement = () => {
  const { authFetch } = useAuth();
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedReportCard, setSelectedReportCard] = useState(null);

  useEffect(() => {
    authFetch('/api/exams').then(res => res.json()).then(data => { if (data.success) setExams(data.exams); });
    authFetch('/api/results').then(res => res.json()).then(data => { if (data.success) setResults(data.results); });
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-indigo-400" /> Examination & Gradebook System
          </h1>
          <p className="text-xs text-slate-400">Exam creation, subject score entry, grade & percentage computation, and PDF report cards.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">Scheduled Examination Timetable</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exams.map((ex) => (
            <div key={ex.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-white">{ex.name}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">{ex.className}</span>
              </div>
              <div className="text-xs text-slate-300 flex items-center gap-4">
                <span>Subject: <strong className="text-white">{ex.subject}</strong></span>
                <span>Max Marks: <strong>{ex.maxMarks}</strong> (Pass: {ex.passingMarks})</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-4 pt-1 border-t border-slate-900">
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-indigo-400" /> {ex.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-amber-400" /> {ex.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white">Evaluated Mid Term Results & Report Cards</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-700">
              <tr>
                <th className="p-3">Roll #</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Class</th>
                <th className="p-3">Total Score</th>
                <th className="p-3">Percentage</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {results.map((r) => (
                <tr key={r.studentId} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono text-slate-400">#{r.rollNo}</td>
                  <td className="p-3 font-bold text-white">{r.studentName}</td>
                  <td className="p-3 text-slate-300">{r.className}</td>
                  <td className="p-3 font-bold text-indigo-300">{r.totalObtained} / {r.totalMax}</td>
                  <td className="p-3 font-extrabold text-emerald-400">{r.percentage}%</td>
                  <td className="p-3 font-bold text-amber-300">{r.grade}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setSelectedReportCard(r)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition flex items-center gap-1.5 ml-auto"
                    >
                      <Printer className="h-3.5 w-3.5" /> View / Print PDF Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedReportCard && (
        <ReportCardModal
          result={selectedReportCard}
          onClose={() => setSelectedReportCard(null)}
        />
      )}
    </div>
  );
};
