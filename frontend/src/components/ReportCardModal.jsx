import React from 'react';
import { Printer, X, Award, CheckCircle2 } from 'lucide-react';

export const ReportCardModal = ({ result, onClose }) => {
  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Award className="h-4 w-4" /> Student Report Card Preview
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
            >
              <Printer className="h-4 w-4" /> Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div id="printable-section" className="p-8 bg-white text-slate-900 space-y-6">
          <div className="text-center border-b pb-6 border-slate-200">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-900 text-white mb-2 font-bold text-xl">
              SX
            </div>
            <h2 className="text-2xl font-extrabold uppercase tracking-wide text-indigo-950">
              St. Xavier International School
            </h2>
            <p className="text-xs text-slate-600">Affiliated to CBSE Board • Code: 2026-SXIS</p>
            <p className="text-xs text-slate-500">Model Town, Bilaspur, Chhattisgarh - 495001</p>
            <div className="mt-3 inline-block px-4 py-1 bg-indigo-100 text-indigo-900 rounded-full text-xs font-bold tracking-wide uppercase">
              Official Academic Progress Report Card - 2026
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p><span className="font-semibold text-slate-600">Student Name:</span> <span className="font-bold text-slate-900">{result.studentName}</span></p>
              <p><span className="font-semibold text-slate-600">Roll Number:</span> {result.rollNo}</p>
              <p><span className="font-semibold text-slate-600">Class & Section:</span> {result.className}</p>
            </div>
            <div>
              <p><span className="font-semibold text-slate-600">Exam Name:</span> {result.examName}</p>
              <p><span className="font-semibold text-slate-600">Academic Term:</span> Mid Term 2026</p>
              <p><span className="font-semibold text-slate-600">Class Rank:</span> Rank #{result.rank}</p>
            </div>
          </div>

          <div>
            <table className="w-full text-xs text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-indigo-950 text-white">
                  <th className="p-3 border border-indigo-900">#</th>
                  <th className="p-3 border border-indigo-900">Subject</th>
                  <th className="p-3 border border-indigo-900 text-center">Max Marks</th>
                  <th className="p-3 border border-indigo-900 text-center">Marks Obtained</th>
                  <th className="p-3 border border-indigo-900 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.marks.map((m, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 border border-slate-200 font-medium">{idx + 1}</td>
                    <td className="p-3 border border-slate-200 font-semibold">{m.subject}</td>
                    <td className="p-3 border border-slate-200 text-center">{m.max}</td>
                    <td className="p-3 border border-slate-200 text-center font-bold text-indigo-950">{m.obtained}</td>
                    <td className="p-3 border border-slate-200 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        PASS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold">
                  <td colSpan="2" className="p-3 border border-slate-300 text-right">TOTAL SUMMARY:</td>
                  <td className="p-3 border border-slate-300 text-center">{result.totalMax}</td>
                  <td className="p-3 border border-slate-300 text-center text-indigo-950 text-sm">{result.totalObtained}</td>
                  <td className="p-3 border border-slate-300 text-center">{result.percentage}%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-950 text-xs">
            <div>
              <p className="font-semibold">Overall Percentage: <span className="text-base font-extrabold">{result.percentage}%</span></p>
              <p className="text-emerald-700">Grade: <span className="font-bold">{result.grade}</span> (Pass with Distinction)</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-600 text-white font-bold px-4 py-2 rounded-lg">
              <CheckCircle2 className="h-4 w-4" /> PASSED
            </div>
          </div>

          <div className="pt-12 flex justify-between items-end text-xs text-slate-500 border-t border-slate-200">
            <div className="text-center">
              <div className="border-b border-slate-400 w-36 mb-1"></div>
              <p className="font-semibold">Class Teacher Signature</p>
            </div>
            <div className="text-center">
              <div className="h-10 w-10 border border-slate-300 rounded-full flex items-center justify-center text-[9px] text-slate-400 font-bold mx-auto mb-1">
                SEAL
              </div>
              <p className="text-[10px]">Official Stamp</p>
            </div>
            <div className="text-center">
              <div className="border-b border-slate-400 w-36 mb-1"></div>
              <p className="font-semibold">Principal Signature</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
