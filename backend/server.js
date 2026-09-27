import express from 'express';
import cors from 'cors';
import { initialData } from './data/seedData.js';
import { generateToken, verifyToken, authorizeRoles } from './middleware/auth.js';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

let db = JSON.parse(JSON.stringify(initialData));

app.post('/api/auth/login', (req, res) => {
  const { role, email } = req.body;
  const user = db.users.find(u => (email && u.email === email) || (role && u.role === role));
  if (user) {
    const token = generateToken(user);
    return res.json({
      success: true,
      token,
      user
    });
  }
  return res.json({
    success: true,
    token: `demo-token-${role || 'SUPER_ADMIN'}`,
    user: db.users[0]
  });
});

app.get('/api/auth/users', verifyToken, (req, res) => {
  res.json({ success: true, users: db.users });
});

app.get('/api/dashboard/stats', verifyToken, (req, res) => {
  const stats = {
    totalStudents: db.students.length + 416,
    totalTeachers: db.teachers.length + 22,
    totalStaff: db.staff.length + 12,
    totalClasses: 12,
    todayAttendancePct: 94.8,
    pendingFees: db.fees.pending,
    totalFeesCollected: db.fees.collected,
    upcomingExams: db.exams.length,
    upcomingEvents: 4,
    newAdmissions: 35,
    pendingLeaves: db.leaveRequests.filter(l => l.status === 'Pending').length,
    noticesCount: db.notices.length,

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
  res.json({ success: true, stats });
});

app.get('/api/students', verifyToken, (req, res) => {
  res.json({ success: true, students: db.students });
});

app.post('/api/students', verifyToken, authorizeRoles('SUPER_ADMIN', 'TEACHER'), (req, res) => {
  const newStudent = {
    id: `STU-2026-00${db.students.length + 1}`,
    admissionNo: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
    admissionDate: new Date().toISOString().split('T')[0],
    documents: [{ name: 'Birth Certificate.pdf', date: new Date().toISOString().split('T')[0], size: '1.2 MB', status: 'Verified' }],
    health: { bloodGroup: 'B+', allergies: 'None', medicalNotes: 'Fit for school activities' },
    sportsActivities: [],
    ...req.body
  };
  db.students.push(newStudent);
  res.status(201).json({ success: true, student: newStudent, message: 'Student created successfully' });
});

app.get('/api/teachers', verifyToken, (req, res) => {
  res.json({ success: true, teachers: db.teachers });
});

app.get('/api/staff', verifyToken, (req, res) => {
  res.json({ success: true, staff: db.staff });
});

app.get('/api/classes', verifyToken, (req, res) => {
  res.json({ success: true, classes: db.classes });
});

app.get('/api/subjects', verifyToken, (req, res) => {
  res.json({ success: true, subjects: db.subjects });
});

app.get('/api/timetable', verifyToken, (req, res) => {
  res.json({ success: true, timetable: db.timetable });
});

app.get('/api/attendance', verifyToken, (req, res) => {
  res.json({ success: true, attendance: db.attendanceToday });
});

app.post('/api/attendance/mark', verifyToken, authorizeRoles('SUPER_ADMIN', 'TEACHER'), (req, res) => {
  const { studentId, status } = req.body;
  const item = db.attendanceToday.find(a => a.studentId === studentId);
  if (item) {
    item.status = status;
  }
  res.json({ success: true, message: 'Attendance updated successfully', attendance: db.attendanceToday });
});

app.get('/api/fees', verifyToken, (req, res) => {
  res.json({ success: true, fees: db.fees });
});

app.post('/api/fees/pay', verifyToken, (req, res) => {
  const { studentId, amount, paymentMethod } = req.body;
  const record = db.fees.studentRecords.find(r => r.studentId === studentId);
  if (record) {
    record.paidAmount += Number(amount);
    record.pendingAmount = Math.max(0, record.totalFee - record.paidAmount);
    record.status = record.pendingAmount === 0 ? 'Paid' : 'Partial';

    const newReceipt = {
      receiptNo: `REC-2026-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      amount: Number(amount),
      mode: paymentMethod || 'Online Razorpay'
    };
    record.receipts.push(newReceipt);

    db.fees.collected += Number(amount);
    db.fees.pending = Math.max(0, db.fees.pending - Number(amount));

    return res.json({ success: true, receipt: newReceipt, record, message: 'Payment recorded successfully' });
  }
  res.status(404).json({ success: false, message: 'Student fee record not found' });
});

app.get('/api/exams', verifyToken, (req, res) => {
  res.json({ success: true, exams: db.exams });
});

app.get('/api/results', verifyToken, (req, res) => {
  res.json({ success: true, results: db.results });
});

app.get('/api/homework', verifyToken, (req, res) => {
  res.json({ success: true, homework: db.homework });
});

app.post('/api/homework/submit', verifyToken, (req, res) => {
  const { hwId, studentId, fileName } = req.body;
  const hw = db.homework.find(h => h.id === hwId);
  if (hw) {
    hw.submissions.push({
      studentId: studentId || 'STU-2026-001',
      name: 'Mohit Sharma',
      date: new Date().toISOString().split('T')[0],
      file: fileName || 'Solution_Submitted.pdf',
      status: 'Submitted',
      marks: '10/10',
      feedback: 'Verified & Evaluated'
    });
    return res.json({ success: true, homework: hw, message: 'Homework submitted successfully' });
  }
  res.status(404).json({ success: false, message: 'Homework record not found' });
});

app.get('/api/notices', verifyToken, (req, res) => {
  res.json({ success: true, notices: db.notices });
});

app.post('/api/notices', verifyToken, authorizeRoles('SUPER_ADMIN', 'TEACHER'), (req, res) => {
  const newNotice = {
    id: `NTC-0${db.notices.length + 1}`,
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    postedBy: req.user?.name || 'School Administration',
    ...req.body
  };
  db.notices.unshift(newNotice);
  res.status(201).json({ success: true, notice: newNotice });
});

app.get('/api/transport', verifyToken, (req, res) => res.json({ success: true, transport: db.transport }));
app.get('/api/inventory', verifyToken, (req, res) => res.json({ success: true, inventory: db.inventory }));
app.get('/api/leave-requests', verifyToken, (req, res) => res.json({ success: true, leaveRequests: db.leaveRequests }));

app.post('/api/leave-requests/update', verifyToken, authorizeRoles('SUPER_ADMIN', 'TEACHER'), (req, res) => {
  const { id, status } = req.body;
  const reqItem = db.leaveRequests.find(l => l.id === id);
  if (reqItem) {
    reqItem.status = status;
    return res.json({ success: true, leaveRequest: reqItem });
  }
  res.status(404).json({ success: false, message: 'Leave request record not found' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', service: 'MERN Student Management Server', timestamp: new Date() });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error(err);
    }
  });
};

startServer(process.env.PORT || 5000);
