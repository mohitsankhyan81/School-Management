import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { PackageCheck } from 'lucide-react';

export const InventoryPage = () => {
  const { authFetch } = useAuth();
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    authFetch('/api/inventory').then(res => res.json()).then(data => { if (data.success) setInventory(data.inventory); });
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <PackageCheck className="h-6 w-6 text-emerald-400" /> School Inventory & Asset Manager
          </h1>
          <p className="text-xs text-slate-400">Sports shoes, lab laptops, projectors, books stock & issue tracking.</p>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">Stock & Asset Inventory Register</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-800/60 text-slate-400 font-semibold border-b border-slate-700">
              <tr>
                <th className="p-3">Item ID</th>
                <th className="p-3">Item Description</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-center">Total Stock</th>
                <th className="p-3 text-center">Issued Out</th>
                <th className="p-3 text-center">Available Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40">
                  <td className="p-3 font-mono text-indigo-400 font-bold">{item.id}</td>
                  <td className="p-3 font-bold text-white">{item.item}</td>
                  <td className="p-3 text-slate-300">{item.category}</td>
                  <td className="p-3 text-center font-bold text-slate-200">{item.totalQty}</td>
                  <td className="p-3 text-center font-bold text-amber-400">{item.issuedQty}</td>
                  <td className="p-3 text-center font-bold text-emerald-400">{item.availableQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
