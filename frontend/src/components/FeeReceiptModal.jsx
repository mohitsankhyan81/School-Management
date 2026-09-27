import React from 'react';
import { Printer, X, CheckCircle } from 'lucide-react';

export const FeeReceiptModal = ({ receipt, studentRecord, onClose }) => {
  if (!receipt || !studentRecord) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <CheckCircle className="h-4 w-4" /> Official Fee Receipt
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
            >
              <Printer className="h-3.5 w-3.5" /> Print
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div id="printable-section" className="p-8 bg-white text-slate-900 space-y-4">
          <div className="text-center border-b pb-4 border-slate-200">
            <h2 className="text-xl font-bold text-indigo-950 uppercase">St. Xavier International School</h2>
            <p className="text-xs text-slate-500">Official Payment Confirmation Receipt</p>
          </div>

          <div className="flex justify-between text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div>
              <p><span className="font-semibold">Receipt No:</span> {receipt.receiptNo}</p>
              <p><span className="font-semibold">Student Name:</span> {studentRecord.studentName}</p>
              <p><span className="font-semibold">Class:</span> {studentRecord.className}</p>
            </div>
            <div className="text-right">
              <p><span className="font-semibold">Date:</span> {receipt.date}</p>
              <p><span className="font-semibold">Payment Mode:</span> {receipt.mode}</p>
              <p><span className="font-semibold">Status:</span> <span className="text-emerald-700 font-bold">CONFIRMED</span></p>
            </div>
          </div>

          <table className="w-full text-xs text-left border border-slate-200 mt-2">
            <thead className="bg-slate-100 font-bold text-slate-700">
              <tr>
                <th className="p-2 border">Description</th>
                <th className="p-2 border text-right">Amount Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border font-medium">School Tuition & Academic Fees</td>
                <td className="p-2 border text-right font-bold text-indigo-950">₹{Number(receipt.amount).toLocaleString()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-emerald-50 font-bold">
                <td className="p-2 border text-right">TOTAL PAID:</td>
                <td className="p-2 border text-right text-emerald-800 text-sm">₹{Number(receipt.amount).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>

          <div className="pt-8 flex justify-between items-end text-xs text-slate-500">
            <p>Computer Generated Receipt</p>
            <div className="text-center border-t border-slate-400 w-32">
              Authorized Signatory
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
