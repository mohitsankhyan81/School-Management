# EduSmart - MERN Student & School Management System

An enterprise-grade MERN (MongoDB, Express.js, React.js, Node.js) School SaaS Platform featuring 23 modular systems, role-based access control (Super Admin, Teacher, Student, Parent), PDF Report Card generation, Razorpay fee payment integration, attendance roll-call, timetables, and student sports/activities logging.

## 🚀 Key Features
- **📊 Admin Dashboard**: 12 KPI widgets + 5 Recharts visualizations (Attendance, Fee Collection, Performance, Admissions, Class Count).
- **👨🎓 Student Management**: Bio profiles, encrypted document vault, medical cards, emergency contacts & sports trophies.
- **👨🏫 Teacher & Staff Management**: Subject allocation, class assignments, payroll breakdown, attendance rating & staff directory.
- **🏫 Class & Section Tree**: Nested academic hierarchy (Class 10 -> Sec A, B, C) with class teacher mapping.
- **📚 Subject Matrix**: Subject to teacher period allocation.
- **🕐 Timetable Grid**: Weekly period schedule grid with recess breaks.
- **✅ Attendance System**: 1-click Present/Absent/Late/Half-Day marking + parent absent alert notification generator.
- **💰 Fee Management & Online Payment**: Fee structure setup, pending fee calculation, simulated Razorpay checkout modal & fee receipts.
- **📝 Examination & Gradebook**: Exam schedules, mark entry with auto total, percentage, grade, pass/fail badge & class rank.
- **📊 Printable PDF Report Cards**: Clean report cards with school emblem, subject breakdown, and principal signature block.
- **📢 Notice & Announcement System**: Audience-targeted broadcasts (Parents, Teachers, Students, Staff).
- **👨👩👦 Parent Portal**: Child progress dashboard for Mohit Sharma (attendance %, fee dues, upcoming exams, teacher messages).
- **📚 Homework Hub**: Assignment creation, student PDF solution submission, teacher marks & feedback.
- **🚌 Transport Management**: Bus routes, driver contact details, stop schedules & passenger count.
- **🎒 Inventory Control**: School stock register (sports shoes, laptops, projectors, books).
- **📋 Leave Requests**: Student & Teacher leave applications with admin approval workflows.
- **🏆 Sports & Activities Trophy Wall**: Highlights District Football Winners, Science Exhibition Rank #1, and Debate medals.
- **🔒 JWT Security & RBAC**: JWT authentication middleware + role-based access authorization.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Lucide Icons
- **Backend**: Node.js, Express.js, JWT, CORS, Dotenv
- **Deployment**: Configured for Vercel (Frontend) and Render (Backend)

## 🏃 Local Setup Instructions

```bash
# Clone the repository
git clone https://github.com/mohitsankhyan81/School-Management.git
cd School-Management

# Start Backend Server
cd backend
npm install
npm start

# Start Frontend App (in second terminal)
cd ../frontend
npm install
npm run dev
```
"# School-Management" 
