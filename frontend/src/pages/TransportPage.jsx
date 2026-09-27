import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bus, MapPin, Phone } from 'lucide-react';

export const TransportPage = () => {
  const { authFetch } = useAuth();
  const [transport, setTransport] = useState([]);

  useEffect(() => {
    authFetch('/api/transport').then(res => res.json()).then(data => { if (data.success) setTransport(data.transport); });
  }, []);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bus className="h-6 w-6 text-indigo-400" /> Transport & Bus Route Management
        </h1>
        <p className="text-xs text-slate-400">School fleet tracking, driver contact details, bus stops, and student passenger roster.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {transport.map((bus, idx) => (
          <div key={idx} className="glass-card rounded-2xl p-6 space-y-4 border border-indigo-500/20">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                  Vehicle No: {bus.vehicleNo}
                </span>
                <h3 className="font-extrabold text-lg text-white mt-1">{bus.busNo}</h3>
                <p className="text-xs text-slate-400 font-medium">Route: {bus.route}</p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-lg text-xs">
                {bus.assignedStudentsCount} Students Assigned
              </span>
            </div>

            <div className="bg-slate-950/60 rounded-xl p-3.5 flex items-center justify-between text-xs border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-indigo-400">
                  DR
                </div>
                <div>
                  <h4 className="font-bold text-white">{bus.driverName}</h4>
                  <p className="text-slate-400 text-[11px]">Senior School Driver</p>
                </div>
              </div>
              <a href={`tel:${bus.driverPhone}`} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> {bus.driverPhone}
              </a>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-300">Bus Route Stops & Schedule</h4>
              <div className="space-y-2">
                {bus.stops.map((stop, sIdx) => (
                  <div key={sIdx} className="flex justify-between items-center text-xs p-2.5 rounded-lg bg-slate-900 border border-slate-800/80">
                    <span className="flex items-center gap-2 font-medium text-slate-200">
                      <MapPin className="h-3.5 w-3.5 text-rose-400" /> {stop.stopName}
                    </span>
                    <span className="font-mono text-indigo-400 font-bold bg-indigo-950 px-2 py-0.5 rounded border border-indigo-900 text-[10px]">
                      {stop.pickupTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
