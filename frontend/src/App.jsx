import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';

import { AdminDashboard } from './pages/AdminDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { ParentPortal } from './pages/ParentPortal';
import { StudentManagement } from './pages/StudentManagement';
import { TeacherManagement } from './pages/TeacherManagement';
import { ClassManagement } from './pages/ClassManagement';
import { TimetablePage } from './pages/TimetablePage';
import { AttendancePage } from './pages/AttendancePage';
import { FeeManagement } from './pages/FeeManagement';
import { ExamManagement } from './pages/ExamManagement';
import { HomeworkPage } from './pages/HomeworkPage';
import { NoticeBoard } from './pages/NoticeBoard';
import { TransportPage } from './pages/TransportPage';
import { InventoryPage } from './pages/InventoryPage';
import { LeaveManagementPage } from './pages/LeaveManagementPage';
import { SportsActivitiesPage } from './pages/SportsActivitiesPage';

const MainLayout = () => {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState(() => {
    if (role === 'TEACHER') return 'teacher-dashboard';
    if (role === 'PARENT') return 'parent-portal';
    return 'dashboard';
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'teacher-dashboard':
        return <TeacherDashboard />;
      case 'parent-portal':
        return <ParentPortal />;
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'classes':
        return <ClassManagement />;
      case 'timetable':
        return <TimetablePage />;
      case 'attendance':
        return <AttendancePage />;
      case 'fees':
        return <FeeManagement />;
      case 'exams':
        return <ExamManagement />;
      case 'homework':
        return <HomeworkPage />;
      case 'notices':
        return <NoticeBoard />;
      case 'transport':
        return <TransportPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'leave':
        return <LeaveManagementPage />;
      case 'sports':
        return <SportsActivitiesPage />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
