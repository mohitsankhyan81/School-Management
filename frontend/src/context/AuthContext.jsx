import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

const demoUsers = {
  SUPER_ADMIN: {
    id: "u1",
    name: "Dr. Vikram Sethi",
    email: "admin@school.com",
    role: "SUPER_ADMIN",
    roleLabel: "School Super Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+91 9876543210"
  },
  TEACHER: {
    id: "u2",
    name: "Rahul Sharma",
    email: "rahul.teacher@school.com",
    role: "TEACHER",
    roleLabel: "Senior Faculty (Maths)",
    teacherId: "T-101",
    subject: "Mathematics",
    assignedClasses: ["Class 10-A", "Class 10-B"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+91 9812345678"
  },
  STUDENT: {
    id: "u3",
    name: "Mohit Sharma",
    email: "mohit.student@school.com",
    role: "STUDENT",
    roleLabel: "Student (Class 10-A)",
    studentId: "STU-2026-001",
    className: "Class 10",
    section: "A",
    rollNo: 15,
    admissionNo: "ADM-9942",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    phone: "+91 9898989898"
  },
  PARENT: {
    id: "u4",
    name: "Rajesh Sharma",
    email: "parent.sharma@gmail.com",
    role: "PARENT",
    roleLabel: "Parent (Father of Mohit)",
    childId: "STU-2026-001",
    childName: "Mohit Sharma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+91 9871122334"
  }
};

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState('SUPER_ADMIN');
  const [user, setUser] = useState(demoUsers.SUPER_ADMIN);
  const [token, setToken] = useState('demo-token-u1');
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'FEE', message: 'Pending Fee Reminder: ₹5,000 due for Mohit Sharma', time: '10 mins ago', read: false },
    { id: 2, type: 'EXAM', message: 'Mid Term Exam Schedule published for Class 10', time: '1 hour ago', read: false },
    { id: 3, type: 'ATTENDANCE', message: 'Aman Singh marked Absent today (Class 10-A)', time: '2 hours ago', read: true },
    { id: 4, type: 'NOTICE', message: 'Parent-Teacher Meeting scheduled for 30 Sept', time: '1 day ago', read: true }
  ]);

  const fetchToken = async (targetRole) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: targetRole })
      });
      const data = await res.json();
      if (data.success && data.token) {
        setToken(data.token);
        if (data.user) setUser(data.user);
      }
    } catch (e) {
      setToken(`demo-token-${targetRole}`);
    }
  };

  useEffect(() => {
    fetchToken('SUPER_ADMIN');
  }, []);

  const switchRole = (newRole) => {
    if (demoUsers[newRole]) {
      setRole(newRole);
      setUser(demoUsers[newRole]);
      fetchToken(newRole);
    }
  };

  const authFetch = (url, options = {}) => {
    const fullUrl = url.startsWith('/api') ? `${API_BASE}${url}` : url;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || 'demo-token-u1'}`,
      ...(options.headers || {})
    };
    return fetch(fullUrl, { ...options, headers });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AuthContext.Provider value={{ user, role, token, switchRole, authFetch, notifications, markAllNotificationsAsRead, demoUsers, API_BASE }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
