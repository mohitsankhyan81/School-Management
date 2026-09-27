export const initialData = {
  users: [
    {
      id: "u1",
      name: "Super Admin",
      email: "admin@school.com",
      role: "SUPER_ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9876543210"
    },
    {
      id: "u2",
      name: "Rahul Sharma",
      email: "rahul.teacher@school.com",
      role: "TEACHER",
      teacherId: "T-101",
      subject: "Mathematics",
      assignedClasses: ["Class 10-A", "Class 10-B"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9812345678"
    },
    {
      id: "u3",
      name: "Mohit Sharma",
      email: "mohit.student@school.com",
      role: "STUDENT",
      studentId: "STU-2026-001",
      className: "Class 10",
      section: "A",
      rollNo: 15,
      admissionNo: "ADM-9942",
      parentName: "Rajesh Sharma",
      parentEmail: "parent.sharma@gmail.com",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9898989898"
    },
    {
      id: "u4",
      name: "Rajesh Sharma",
      email: "parent.sharma@gmail.com",
      role: "PARENT",
      childId: "STU-2026-001",
      childName: "Mohit Sharma",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      phone: "+91 9871122334"
    },
    {
      id: "u5",
      name: "Priya Verma",
      email: "priya.teacher@school.com",
      role: "TEACHER",
      teacherId: "T-102",
      subject: "Science",
      assignedClasses: ["Class 10-A", "Class 9-A"],
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    }
  ],

  students: [
    {
      id: "STU-2026-001",
      name: "Mohit Sharma",
      rollNo: 15,
      className: "10",
      section: "A",
      admissionNo: "ADM-9942",
      admissionDate: "2022-04-10",
      dob: "2010-08-14",
      gender: "Male",
      address: "124, Model Town, Bilaspur",
      parentName: "Rajesh Sharma",
      parentPhone: "+91 9871122334",
      emergencyContact: "+91 9871122335",
      previousSchool: "St. Xavier Public School",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      documents: [
        { name: "Birth Certificate.pdf", date: "2022-04-10", size: "1.2 MB", status: "Verified" },
        { name: "Previous Marksheet.pdf", date: "2022-04-10", size: "2.4 MB", status: "Verified" },
        { name: "Transfer Certificate.pdf", date: "2022-04-10", size: "850 KB", status: "Verified" }
      ],
      health: {
        bloodGroup: "B+",
        allergies: "Peanuts, Dust",
        medicalNotes: "Regular eye checkup recommended. Wears reading glasses.",
        emergencyContact: "Rajesh Sharma (+91 9871122334)"
      },
      sportsActivities: [
        { title: "District Football Tournament", badge: "🏆 Winner", year: "2025", category: "Sports" },
        { title: "Inter-School Science Exhibition", badge: "🥇 1st Rank", year: "2025", category: "Academics" },
        { title: "State Debate Competition", badge: "🏅 Runner Up", year: "2026", category: "Cultural" }
      ]
    },
    {
      id: "STU-2026-002",
      name: "Rahul Gupta",
      rollNo: 16,
      className: "10",
      section: "A",
      admissionNo: "ADM-9943",
      admissionDate: "2022-04-12",
      dob: "2010-05-22",
      gender: "Male",
      address: "45, Green Park, Bilaspur",
      parentName: "Sanjay Gupta",
      parentPhone: "+91 9822233344",
      emergencyContact: "+91 9822233345",
      previousSchool: "City High School",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      documents: [{ name: "Birth Certificate.pdf", date: "2022-04-12", size: "1.1 MB", status: "Verified" }],
      health: { bloodGroup: "O+", allergies: "None", medicalNotes: "Fit for all physical activities" },
      sportsActivities: [{ title: "Annual Athletic Meet 100m Sprint", badge: "🥇 Gold Medal", year: "2025", category: "Sports" }]
    },
    {
      id: "STU-2026-003",
      name: "Aman Singh",
      rollNo: 17,
      className: "10",
      section: "A",
      admissionNo: "ADM-9944",
      admissionDate: "2022-04-15",
      dob: "2010-11-03",
      gender: "Male",
      address: "88, Civil Lines, Bilaspur",
      parentName: "Vikram Singh",
      parentPhone: "+91 9833344455",
      emergencyContact: "+91 9833344456",
      previousSchool: "DAV Public School",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      documents: [{ name: "Birth Certificate.pdf", date: "2022-04-15", size: "1.3 MB", status: "Verified" }],
      health: { bloodGroup: "A+", allergies: "Pollen", medicalNotes: "Mild Asthma - inhaler kept in sickbay" },
      sportsActivities: [{ title: "State Chess Championship", badge: "🏆 Champion", year: "2025", category: "Mind Sports" }]
    },
    {
      id: "STU-2026-004",
      name: "Priya Sharma",
      rollNo: 18,
      className: "10",
      section: "A",
      admissionNo: "ADM-9945",
      admissionDate: "2022-04-18",
      dob: "2010-02-19",
      gender: "Female",
      address: "21, Link Road, Bilaspur",
      parentName: "Sunil Sharma",
      parentPhone: "+91 9844455566",
      emergencyContact: "+91 9844455567",
      previousSchool: "Holy Cross Convent",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      documents: [{ name: "Birth Certificate.pdf", date: "2022-04-18", size: "900 KB", status: "Verified" }],
      health: { bloodGroup: "AB+", allergies: "None", medicalNotes: "No restrictions" },
      sportsActivities: [{ title: "National Level Badminton Singles", badge: "🥈 Silver Medal", year: "2025", category: "Sports" }]
    }
  ],

  teachers: [
    {
      id: "T-101",
      name: "Rahul Sharma",
      email: "rahul.teacher@school.com",
      qualification: "M.Sc. Mathematics, B.Ed",
      subject: "Mathematics",
      classesAssigned: ["10-A", "10-B", "9-A"],
      phone: "+91 9812345678",
      joiningDate: "2019-07-15",
      salary: "₹65,000 / month",
      attendance: "96%",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "T-102",
      name: "Priya Verma",
      email: "priya.teacher@school.com",
      qualification: "M.Sc. Physics, M.Ed",
      subject: "Science",
      classesAssigned: ["10-A", "9-A", "9-B"],
      phone: "+91 9823456789",
      joiningDate: "2020-03-01",
      salary: "₹62,000 / month",
      attendance: "98%",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: "T-103",
      name: "Anil Kapoor",
      email: "anil.teacher@school.com",
      qualification: "M.A. English Literature",
      subject: "English",
      classesAssigned: ["10-A", "10-B", "10-C"],
      phone: "+91 9834567890",
      joiningDate: "2018-01-10",
      salary: "₹68,000 / month",
      attendance: "94%",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    }
  ],

  staff: [
    { id: "STF-01", name: "Ramesh Patel", role: "Accountant", phone: "+91 9911223344", status: "Active" },
    { id: "STF-02", name: "Suman Lata", role: "Librarian", phone: "+91 9922334455", status: "Active" },
    { id: "STF-03", name: "Baldev Singh", role: "Head Security", phone: "+91 9933445566", status: "Active" },
    { id: "STF-04", name: "Suresh Kumar", role: "Bus Driver (Bus 04)", phone: "+91 9944556677", status: "Active" }
  ],

  classes: [
    {
      className: "Class 10",
      sections: [
        { section: "A", classTeacher: "Rahul Sharma", studentCount: 38, roomNo: "Room 101" },
        { section: "B", classTeacher: "Anil Kapoor", studentCount: 40, roomNo: "Room 102" },
        { section: "C", classTeacher: "Priya Verma", studentCount: 36, roomNo: "Room 103" }
      ]
    },
    {
      className: "Class 9",
      sections: [
        { section: "A", classTeacher: "Sunita Roy", studentCount: 42, roomNo: "Room 201" },
        { section: "B", classTeacher: "Vikash Jain", studentCount: 39, roomNo: "Room 202" }
      ]
    }
  ],

  subjects: [
    { code: "SUB-101", name: "Mathematics", class: "Class 10", teacher: "Rahul Sharma", weeklyPeriods: 6 },
    { code: "SUB-102", name: "Science", class: "Class 10", teacher: "Priya Verma", weeklyPeriods: 6 },
    { code: "SUB-103", name: "English", class: "Class 10", teacher: "Anil Kapoor", weeklyPeriods: 5 },
    { code: "SUB-104", name: "Hindi", class: "Class 10", teacher: "Sunita Roy", weeklyPeriods: 4 },
    { code: "SUB-105", name: "Computer Science", class: "Class 10", teacher: "Vikash Jain", weeklyPeriods: 4 },
    { code: "SUB-106", name: "Social Science", class: "Class 10", teacher: "Meena Joshi", weeklyPeriods: 5 }
  ],

  timetable: [
    { time: "09:00 AM - 10:00 AM", monday: "Mathematics", tuesday: "English", wednesday: "Science", thursday: "Computer", friday: "Mathematics" },
    { time: "10:00 AM - 11:00 AM", monday: "Science", tuesday: "Mathematics", wednesday: "Computer", thursday: "Science", friday: "English" },
    { time: "11:00 AM - 11:15 AM", monday: "RECESS BREAK", tuesday: "RECESS BREAK", wednesday: "RECESS BREAK", thursday: "RECESS BREAK", friday: "RECESS BREAK" },
    { time: "11:15 AM - 12:15 PM", monday: "English", tuesday: "Computer", wednesday: "Mathematics", thursday: "Social Sci", friday: "Science" },
    { time: "12:15 PM - 01:15 PM", monday: "Hindi", tuesday: "Social Sci", wednesday: "Hindi", thursday: "Mathematics", friday: "Sports & Gym" }
  ],

  attendanceToday: [
    { studentId: "STU-2026-001", name: "Mohit Sharma", rollNo: 15, status: "Present", remark: "On Time" },
    { studentId: "STU-2026-002", name: "Rahul Gupta", rollNo: 16, status: "Present", remark: "On Time" },
    { studentId: "STU-2026-003", name: "Aman Singh", rollNo: 17, status: "Absent", remark: "Sick Leave" },
    { studentId: "STU-2026-004", name: "Priya Sharma", rollNo: 18, status: "Present", remark: "On Time" }
  ],

  fees: {
    totalExpected: 2500000,
    collected: 2000000,
    pending: 500000,
    feeStructureClass10: {
      tuitionFee: 30000,
      transportFee: 10000,
      activityFee: 2000,
      total: 42000
    },
    studentRecords: [
      {
        studentId: "STU-2026-001",
        studentName: "Mohit Sharma",
        className: "Class 10-A",
        totalFee: 42000,
        paidAmount: 37000,
        pendingAmount: 5000,
        dueDate: "2026-10-10",
        status: "Partial",
        receipts: [
          { receiptNo: "REC-2026-108", date: "2026-04-10", amount: 20000, mode: "Online Razorpay" },
          { receiptNo: "REC-2026-402", date: "2026-07-15", amount: 17000, mode: "UPI" }
        ]
      },
      {
        studentId: "STU-2026-002",
        studentName: "Rahul Gupta",
        className: "Class 10-A",
        totalFee: 42000,
        paidAmount: 42000,
        pendingAmount: 0,
        dueDate: "2026-10-10",
        status: "Paid",
        receipts: [
          { receiptNo: "REC-2026-009", date: "2026-04-05", amount: 42000, mode: "Net Banking" }
        ]
      }
    ]
  },

  exams: [
    {
      id: "EXAM-101",
      name: "Mid Term Examination 2026",
      className: "Class 10",
      subject: "Mathematics",
      date: "2026-09-28",
      time: "09:30 AM - 12:30 PM",
      maxMarks: 100,
      passingMarks: 33,
      evaluator: "Rahul Sharma"
    },
    {
      id: "EXAM-102",
      name: "Mid Term Examination 2026",
      className: "Class 10",
      subject: "Science",
      date: "2026-09-30",
      time: "09:30 AM - 12:30 PM",
      maxMarks: 100,
      passingMarks: 33,
      evaluator: "Priya Verma"
    }
  ],

  results: [
    {
      studentId: "STU-2026-001",
      studentName: "Mohit Sharma",
      rollNo: 15,
      className: "Class 10-A",
      examName: "Mid Term Examination 2026",
      marks: [
        { subject: "Mathematics", obtained: 82, max: 100 },
        { subject: "Science", obtained: 76, max: 100 },
        { subject: "English", obtained: 88, max: 100 },
        { subject: "Hindi", obtained: 80, max: 100 },
        { subject: "Computer Science", obtained: 95, max: 100 }
      ],
      totalObtained: 421,
      totalMax: 500,
      percentage: 84.2,
      grade: "A",
      status: "PASS",
      rank: 2
    }
  ],

  homework: [
    {
      id: "HW-101",
      subject: "Mathematics",
      className: "Class 10-A",
      topic: "Quadratic Equations - Exercise 4.2",
      assignedDate: "2026-09-24",
      dueDate: "2026-09-28",
      teacher: "Rahul Sharma",
      instructions: "Solve Question 1 to 10 in your notebook. Upload PDF copy of completed solutions.",
      submissions: [
        { studentId: "STU-2026-001", name: "Mohit Sharma", date: "2026-09-25", file: "Mohit_Maths_HW.pdf", status: "Submitted", marks: "10/10", feedback: "Excellent clarity in proofs!" }
      ]
    }
  ],

  notices: [
    {
      id: "NTC-01",
      title: "📢 Parent-Teacher Meeting (PTM)",
      date: "2026-09-30",
      time: "10:00 AM - 01:00 PM",
      target: "Parents",
      content: "All parents are cordially invited for the Mid Term PTM to discuss academic progress.",
      postedBy: "School Administration"
    },
    {
      id: "NTC-02",
      title: "🏆 Annual Sports Day Registration",
      date: "2026-10-05",
      time: "09:00 AM",
      target: "All Students",
      content: "Register your names with physical education instructor for athletics, football, and chess competitions.",
      postedBy: "Sports Department"
    }
  ],

  transport: [
    {
      busNo: "Bus 04",
      driverName: "Suresh Kumar",
      driverPhone: "+91 9944556677",
      vehicleNo: "CG-04-AB-1234",
      route: "Bilaspur Station → Model Town → School",
      stops: [
        { stopName: "Stop 1: Bilaspur Junction", pickupTime: "07:30 AM" },
        { stopName: "Stop 2: Model Town Square", pickupTime: "07:45 AM" },
        { stopName: "Stop 3: Civil Lines", pickupTime: "08:00 AM" },
        { stopName: "Stop 4: School Main Gate", pickupTime: "08:15 AM" }
      ],
      assignedStudentsCount: 32
    }
  ],

  inventory: [
    { id: "INV-01", item: "Sports Shoes (Nike/Puma)", category: "Sports", totalQty: 50, issuedQty: 18, availableQty: 32 },
    { id: "INV-02", item: "Official Match Footballs", category: "Sports", totalQty: 20, issuedQty: 5, availableQty: 15 },
    { id: "INV-03", item: "Student Lab Laptops (Dell)", category: "Electronics", totalQty: 30, issuedQty: 12, availableQty: 18 },
    { id: "INV-04", item: "Classroom HD Projector", category: "Electronics", totalQty: 5, issuedQty: 5, availableQty: 0 },
    { id: "INV-05", item: "Library Reference Books", category: "Library", totalQty: 500, issuedQty: 140, availableQty: 360 }
  ],

  leaveRequests: [
    {
      id: "LV-101",
      applicantName: "Mohit Sharma",
      userRole: "Student",
      reason: "High Fever & Viral Infection",
      fromDate: "2026-09-25",
      toDate: "2026-09-27",
      status: "Approved",
      approvedBy: "Rahul Sharma (Class Teacher)"
    },
    {
      id: "LV-102",
      applicantName: "Priya Verma",
      userRole: "Teacher",
      reason: "Attending Science Conference",
      fromDate: "2026-10-02",
      toDate: "2026-10-03",
      status: "Pending",
      approvedBy: "School Admin"
    }
  ]
};
