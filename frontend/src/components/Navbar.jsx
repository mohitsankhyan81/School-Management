import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Bell, 
  ShieldCheck, 
  UserCheck, 
  GraduationCap, 
  Users, 
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

export const Navbar = () => {
  const { user, role, switchRole, notifications, markAllNotificationsAsRead } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleConfigs = [
    { key: 'SUPER_ADMIN', label: 'Super Admin', icon: ShieldCheck, color: 'from-amber-500 to-orange-600' },
    { key: 'TEACHER', label: 'Teacher (Rahul)', icon: UserCheck, color: 'from-emerald-500 to-teal-600' },
    { key: 'STUDENT', label: 'Student (Mohit)', icon: GraduationCap, color: 'from-indigo-500 to-blue-600' },
    { key: 'PARENT', label: 'Parent (Rajesh)', icon: Users, color: 'from-purple-500 to-pink-600' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent leading-none">
                EduSmart
              </h1>
              <span className="text-[10px] tracking-wider text-indigo-400 font-semibold uppercase">MERN SaaS System</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-slate-800/70 border border-slate-700/60 rounded-xl px-3 py-1.5 w-64">
            <Search className="h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students, teachers, fees..." 
              className="bg-transparent text-sm text-slate-200 placeholder-slate-400 outline-none w-full"
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl p-1 shadow-inner">
            <span className="hidden xl:flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-indigo-400">
              <Sparkles className="h-3.5 w-3.5" /> Quick Access:
            </span>
            <div className="flex gap-1">
              {roleConfigs.map((r) => {
                const Icon = r.icon;
                const isActive = role === r.key;
                return (
                  <button
                    key={r.key}
                    onClick={() => switchRole(r.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive 
                        ? `bg-gradient-to-r ${r.color} text-white shadow-md font-semibold` 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-card border border-slate-700/80 shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-indigo-400" />
                    <h3 className="font-semibold text-sm text-slate-100">Live Notifications</h3>
                  </div>
                  <button 
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-3 w-3" /> Mark read
                  </button>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto mt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className={`py-2.5 px-2 text-xs flex gap-3 ${!n.read ? 'bg-indigo-950/20' : ''}`}>
                      <div className="h-2 w-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      <div>
                        <p className="text-slate-200 font-medium">{n.message}</p>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-9 w-9 rounded-xl object-cover ring-2 ring-indigo-500/40"
            />
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-100 leading-tight">{user.name}</div>
              <div className="text-[10px] font-medium text-indigo-400">{user.roleLabel || user.role}</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
