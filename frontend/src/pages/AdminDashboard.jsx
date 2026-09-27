import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  UserCheck, 
  BookOpen, 
  Clock, 
  CreditCard, 
  Calendar, 
  FileSpreadsheet, 
  Megaphone,
  TrendingUp,
  AlertCircle,
  FileQuestion,
  Sparkles
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

export const AdminDashboard = () => {
  const { authFetch } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    authFetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          if (data && data.success && data.stats) {
            setStats(data.stats);
          } else {
            setStats(defaultFallbackStats);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setStats(defaultFallbackStats);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  const defaultFallbackStats = {
    totalStudents: 420,
    totalTeachers: 25,
    totalStaff: 16,
    totalClasses: 12,
    todayAttendancePct: 94.8,
    pendingFees: 500000,
    totalFeesCollected: 2000000,
    upcomingExams: 2,
    upcomingEvents: 4,
    newAdmissions: 35,
    pendingLeaves: 1,
    noticesCount: 2,
    monthlyAttendanceChart: [
      { month: 'Apr', percentage: 95 },
      { month: 'May', percentage: 94 },
      { month: 'Jun', percentage: 96 },
      { month: 'Jul', percentage: 92 },
      { month: 'Aug', percentage: 97 },
      { month: 'Sep', percentage: 95 }
    ],
    feeCollectionChart: [
      { category: 'Tuition Fee', collected: 1500000, pending: 300000 },
      { category: 'Transport Fee', collected: 350000, pending: 150000 },
      { category: 'Activity Fee', collected: 150000, pending: 50000 }
    ],
    studentPerformanceChart: [
      { subject: 'Maths', avgScore: 82 },
      { subject: 'Science', avgScore: 78 },
      { subject: 'English', avgScore: 85 },
      { subject: 'Hindi', avgScore: 81 },
      { subject: 'Computer', avgScore: 92 }
    ],
    classWiseDistribution: [
      { class: 'Class 10', count: 114 },
      { class: 'Class 9', count: 81 },
      { class: 'Class 8', count: 95 },
      { class: 'Class 7', count: 88 },
      { class: 'Class 6', count: 78 }
    ]
  };

  const activeStats = stats || defaultFallbackStats;

  if (loading && !stats) {
    return <div className="p-8 text-center text-slate-400 font-medium">Loading Dashboard Analytics...</div>;
  }

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-6 pb-12">
      <div className="glass-card rounded-3xl p-6 border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" /> School Main Control Center
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">St. Xavier Admin Overview</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time attendance, fee collections, exam analytics & operational metrics.</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Academic Session 2026
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total Students', value: activeStats.totalStudents, icon: Users, color: 'from-indigo-500 to-blue-600', sub: '+35 New Admissions' },
          { label: 'Total Teachers', value: activeStats.totalTeachers, icon: UserCheck, color: 'from-emerald-500 to-teal-600', sub: '3 Assigned Today' },
          { label: 'Total Staff', value: activeStats.totalStaff, icon: UserCheck, color: 'from-purple-500 to-pink-600', sub: 'Non-teaching Staff' },
          { label: 'Classes / Sec', value: `${activeStats.totalClasses} / 28`, icon: BookOpen, color: 'from-cyan-500 to-blue-600', sub: 'Rooms Occupied' },
          { label: "Today's Attendance", value: `${activeStats.todayAttendancePct}%`, icon: Clock, color: 'from-emerald-500 to-green-600', sub: 'Roll-call marked' },
          { label: 'Pending Fees', value: `₹${((activeStats.pendingFees || 0) / 100000).toFixed(1)}L`, icon: CreditCard, color: 'from-amber-500 to-orange-600', sub: 'Due in Oct' },
          { label: 'Upcoming Exams', value: activeStats.upcomingExams, icon: FileSpreadsheet, color: 'from-rose-500 to-pink-600', sub: 'Mid Term Sep' },
          { label: 'Upcoming Events', value: activeStats.upcomingEvents, icon: Calendar, color: 'from-violet-500 to-purple-600', sub: 'PTM & Sports Day' },
          { label: 'New Admissions', value: activeStats.newAdmissions, icon: TrendingUp, color: 'from-blue-500 to-indigo-600', sub: 'This Quarter' },
          { label: 'Active Notices', value: activeStats.noticesCount, icon: Megaphone, color: 'from-amber-500 to-yellow-600', sub: 'Broadcasted' },
          { label: 'Leave Requests', value: activeStats.pendingLeaves, icon: FileQuestion, color: 'from-orange-500 to-rose-600', sub: 'Awaiting Action' },
          { label: 'Helpdesk Alerts', value: 2, icon: AlertCircle, color: 'from-slate-600 to-slate-800', sub: 'Parent Queries' }
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">{card.label}</span>
                <div className={`h-8 w-8 rounded-xl bg-gradient-to-tr ${card.color} text-white flex items-center justify-center shadow-md`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-xl font-bold text-white">{card.value}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{card.sub}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Monthly Attendance Percentage</h3>
              <p className="text-xs text-slate-400">Average student presence across all grades</p>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              95% Avg
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeStats.monthlyAttendanceChart || []}>
                <defs>
                  <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[80, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="percentage" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Fee Collection Overview</h3>
              <p className="text-xs text-slate-400">Collected vs Pending breakdown (₹)</p>
            </div>
            <span className="text-xs text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              ₹20 Lakh Collected
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeStats.feeCollectionChart || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="collected" fill="#6366f1" radius={[4, 4, 0, 0]} name="Collected (₹)" />
                <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Average Student Academic Score</h3>
              <p className="text-xs text-slate-400">Subject-wise mean marks out of 100</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeStats.studentPerformanceChart || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <YAxis dataKey="subject" type="category" stroke="#64748b" fontSize={11} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="avgScore" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Avg Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-100">Class-Wise Student Distribution</h3>
              <p className="text-xs text-slate-400">Enrolled students per grade</p>
            </div>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeStats.classWiseDistribution || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="class"
                  label={({ class: cName, count }) => `${cName}: ${count}`}
                >
                  {(activeStats.classWiseDistribution || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
