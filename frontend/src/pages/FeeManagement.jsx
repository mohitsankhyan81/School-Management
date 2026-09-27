import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CreditCard } from 'lucide-react';
import { RazorpayModal } from '../components/RazorpayModal';
import { FeeReceiptModal } from '../components/FeeReceiptModal';

export const FeeManagement = () => {
  const { authFetch } = useAuth();
  const [fees, setFees] = useState(null);
  const [selectedRecordForPayment, setSelectedRecordForPayment] = useState(null);
  const [selectedReceiptData, setSelectedReceiptData] = useState(null);

  useEffect(() => {
    authFetch('/api/fees')
      .then(res => res.json())
      .then(data => { if (data.success) setFees(data.fees); });
  }, []);

  const handlePaymentSuccess = (amount, paymentMethod) => {
    if (!selectedRecordForPayment) return;
    authFetch('/api/fees/pay', {
      method: 'POST',
      body: JSON.stringify({
        studentId: selectedRecordForPayment.studentId,
        amount,
        paymentMethod
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          authFetch('/api/fees')
            .then(res => res.json())
            .then(d => { if (d.success) setFees(d.fees); });
          setSelectedRecordForPayment(null);
        }
      });
  };

  if (!fees) return <div className="p-8 text-center text-slate-400">Loading Fee Ledger...</div>;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-amber-400" /> School Fee & Financial Management
          </h1>
          <p className="text-xs text-slate-400">Fee structures, collection progress, payment history, and online checkout gateway.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-indigo-500/30">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Expected Revenue</span>
          <div className="text-2xl font-black text-white mt-1">₹{fees.totalExpected.toLocaleString()}</div>
          <p className="text-[10px] text-indigo-400 mt-1">Academic Session 2026-27</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-emerald-500/30">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Total Fees Collected</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">₹{fees.collected.toLocaleString()}</div>
          <p className="text-[10px] text-emerald-300 mt-1">80% Collection Rate</p>
        </div>
        <div className="glass-card rounded-2xl p-5 border border-amber-500/30">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Total Pending Dues</span>
          <div className="text-2xl font-black text-amber-400 mt-1">₹{fees.pending.toLocaleString()}</div>
          <p className="text-[10px] text-amber-300 mt-1">Due Date: 10 October 2026</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">Class 10 Standard Annual Fee Structure</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400">Tuition Fee</span>
            <div className="text-base font-bold text-white mt-1">₹30,000</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400">Transport Fee</span>
            <div className="text-base font-bold text-white mt-1">₹10,000</div>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400">Activity & Lab Fee</span>
            <div className="text-base font-bold text-white mt-1">₹2,000</div>
          </div>
          <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-500/30">
            <span className="text-indigo-300 font-semibold">Total Annual Fee</span>
            <div className="text-base font-extrabold text-indigo-300 mt-1">₹42,000</div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white">Student Fee Ledger & Online Checkout</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-700">
              <tr>
                <th className="p-3">Student Name</th>
                <th className="p-3">Class</th>
                <th className="p-3">Total Fee</th>
                <th className="p-3">Paid Amount</th>
                <th className="p-3">Pending Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {fees.studentRecords.map((r) => (
                <tr key={r.studentId} className="hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-white">{r.studentName}</td>
                  <td className="p-3 text-slate-300">{r.className}</td>
                  <td className="p-3 font-semibold text-slate-200">₹{r.totalFee.toLocaleString()}</td>
                  <td className="p-3 font-bold text-emerald-400">₹{r.paidAmount.toLocaleString()}</td>
                  <td className="p-3 font-bold text-amber-400">₹{r.pendingAmount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {r.pendingAmount > 0 && (
                      <button
                        onClick={() => setSelectedRecordForPayment(r)}
                        className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg text-[11px] transition shadow"
                      >
                        Pay Online (Razorpay)
                      </button>
                    )}
                    {r.receipts && r.receipts.length > 0 && (
                      <button
                        onClick={() => setSelectedReceiptData({ receipt: r.receipts[r.receipts.length - 1], studentRecord: r })}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-[11px] border border-slate-700 transition"
                      >
                        View Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRecordForPayment && (
        <RazorpayModal
          studentRecord={selectedRecordForPayment}
          onClose={() => setSelectedRecordForPayment(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {selectedReceiptData && (
        <FeeReceiptModal
          receipt={selectedReceiptData.receipt}
          studentRecord={selectedReceiptData.studentRecord}
          onClose={() => setSelectedReceiptData(null)}
        />
      )}
    </div>
  );
};
