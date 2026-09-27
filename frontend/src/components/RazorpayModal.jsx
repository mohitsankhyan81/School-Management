import React, { useState } from 'react';
import { Lock, CheckCircle2, X, Shield, ArrowRight } from 'lucide-react';

export const RazorpayModal = ({ studentRecord, onClose, onPaymentSuccess }) => {
  const [payAmount, setPayAmount] = useState(studentRecord?.pendingAmount || 5000);
  const [method, setMethod] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!studentRecord) return null;

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(payAmount, method);
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-200 uppercase tracking-widest mb-1">
            <Lock className="h-3.5 w-3.5" /> Razorpay Secure Gateway
          </div>
          <h2 className="text-xl font-bold">St. Xavier International School</h2>
          <p className="text-xs text-blue-200 mt-1">Fee Payment for: <span className="font-semibold text-white">{studentRecord.studentName}</span> ({studentRecord.className})</p>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10 animate-bounce">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Payment Successful!</h3>
            <p className="text-xs text-slate-300">Transaction ID: <span className="font-mono text-indigo-400">PAY-2026- razorpay-{Date.now()}</span></p>
            <p className="text-xs text-emerald-400 font-semibold">₹{Number(payAmount).toLocaleString()} added to school fee ledger.</p>
          </div>
        ) : (
          <form onSubmit={handlePayNow} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Payment Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  value={payAmount}
                  max={studentRecord.pendingAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 py-2 text-sm text-white font-bold outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Total Pending Dues: ₹{studentRecord.pendingAmount.toLocaleString()}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'UPI', label: 'GPay / PhonePe' },
                  { id: 'Card', label: 'Credit/Debit Card' },
                  { id: 'NetBanking', label: 'Net Banking' }
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={`p-2.5 rounded-xl border text-xs font-medium transition ${
                      method === m.id 
                        ? 'border-indigo-500 bg-indigo-950/60 text-white font-bold ring-2 ring-indigo-500/20' 
                        : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing || payAmount <= 0}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <span>Pay ₹{Number(payAmount).toLocaleString()}</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-800">
              <Shield className="h-3.5 w-3.5 text-emerald-500" /> 256-Bit SSL Encrypted Payment Demo
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
