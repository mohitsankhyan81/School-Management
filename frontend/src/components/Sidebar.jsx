import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  Clock,
  CheckSquare,
  CreditCard,
  FileSpreadsheet,
  Megaphone,
  FileText,
  Bus,
  PackageCheck,
  FileQuestion,
  Trophy,
  Award
} from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { role } = useAuth();

  const allMenuItems = [
    { id: 'dashboard', label: 'Admin Dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN'] },
    { id: 'teacher-dashboard', label: 'Teacher Dashboard', icon: LayoutDashboard, roles: ['TEACHER'] },
    { id: 'parent-portal', label: 'Parent Portal', icon: LayoutDashboard, roles: ['PARENT'] },
    { id: 'students', label: 'Student Management', icon: Users, roles: ['SUPER_ADMIN', 'TEACHER'] },
    { id: 'teachers', label: 'Teacher & Staff', icon: UserCheck, roles: ['SUPER_ADMIN'] },
    { id: 'classes', label: 'Class & Sections', icon: BookOpen, roles: ['SUPER_ADMIN'] },
    { id: 'timetable', label: 'Timetable Grid', icon: Clock, roles: ['SUPER_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
    { id: 'attendance', label: 'Attendance Roll', icon: CheckSquare, roles: ['SUPER_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
    { id: 'fees', label: 'Fee Management', icon: CreditCard, roles: ['SUPER_ADMIN', 'PARENT', 'STUDENT'] },
    { id: 'exams', label: 'Exams & Report Cards', icon: FileSpreadsheet, roles: ['SUPER_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
    { id: 'homework', label: 'Homework & Assignments', icon: FileText, roles: ['SUPER_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
    { id: 'notices', label: 'Notice & Announcements', icon: Megaphone, roles: ['SUPER_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
    { id: 'sports', label: 'Sports & Achievements', icon: Trophy, roles: ['SUPER_ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] },
    { id: 'transport', label: 'Transport & Routes', icon: Bus, roles: ['SUPER_ADMIN', 'PARENT', 'STUDENT'] },
    { id: 'inventory', label: 'School Inventory', icon: PackageCheck, roles: ['SUPER_ADMIN'] },
    { id: 'leave', label: 'Leave Requests', icon: FileQuestion, roles: ['SUPER_ADMIN', 'TEACHER', 'STUDENT'] }
  ];

  const filteredItems = allMenuItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 min-h-[calc(100vh-65px)] flex flex-col justify-between shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold tracking-wider uppercase text-slate-400">
          Navigation Menu ({role})
        </div>
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 glass-card rounded-xl p-3 border border-indigo-500/20 text-center">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-400">
          <Award className="h-4 w-4" /> Academic Year 2026
        </div>
        <p className="text-[11px] text-slate-400 mt-1">St. Xavier International School</p>
      </div>
    </aside>
  );
};
