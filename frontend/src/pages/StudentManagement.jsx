import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  Search, 
  Plus, 
  FileText, 
  ShieldCheck, 
  Trophy, 
  HeartPulse, 
  Eye, 
  X, 
  Phone, 
  Calendar,
  Lock
} from 'lucide-react';

export const StudentManagement = () => {
  const { authFetch } = useAuth();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const [newForm, setNewForm] = useState({
    name: '',
    className: '10',
    section: 'A',
    gender: 'Male',
    parentName: '',
    parentPhone: '',
    dob: '2010-01-01',
    address: 'Bilaspur'
  });

  useEffect(() => {
    authFetch('/api/students')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStudents(data.students);
        }
      });
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();
    authFetch('/api/students', {
      method: 'POST',
      body: JSON.stringify(newForm)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStudents(prev => [...prev, data.student]);
          setShowAddModal(false);
          setNewForm({ name: '', className: '10', section: 'A', gender: 'Male', parentName: '', parentPhone: '', dob: '2010-01-01', address: 'Bilaspur' });
        }
      });
  };

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    s.admissionNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="h-6 w-6 text-indigo-400" /> Student Management
          </h1>
          <p className="text-xs text-slate-400">Complete student profiles, secure document vault, medical & sports records.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition"
        >
          <Plus className="h-4 w-4" /> Add New Student
        </button>
      </div>

      <div className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, ID, roll no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">Total Enrolled:</span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold">{students.length} Students</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s) => (
          <div key={s.id} className="glass-card glass-card-hover rounded-2xl p-5 space-y-4 relative">
            <div className="flex items-center gap-3">
              <img
                src={s.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"}
                alt={s.name}
                className="h-12 w-12 rounded-xl object-cover ring-2 ring-indigo-500/30"
              />
              <div>
                <h3 className="font-bold text-sm text-white">{s.name}</h3>
                <p className="text-[11px] text-indigo-400 font-medium">ID: {s.id}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300 font-semibold">
                    Class {s.className}-{s.section}
                  </span>
                  <span className="text-[10px] text-slate-400">Roll #{s.rollNo}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 text-xs space-y-1.5 text-slate-300">
              <p className="flex items-center gap-2 text-[11px] text-slate-400">
                <Calendar className="h-3.5 w-3.5 text-indigo-400" /> Adm Date: {s.admissionDate}
              </p>
              <p className="flex items-center gap-2 text-[11px] text-slate-400">
                <Phone className="h-3.5 w-3.5 text-emerald-400" /> Parent: {s.parentPhone || s.parentName}
              </p>
            </div>

            <button
              onClick={() => { setSelectedStudent(s); setActiveTab('profile'); }}
              className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 hover:border-transparent text-indigo-300 hover:text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <Eye className="h-3.5 w-3.5" /> View Complete Profile
            </button>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-lg p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add New Student Profile</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Student Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Roy"
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Class Grade</label>
                  <input
                    type="text"
                    value={newForm.className}
                    onChange={(e) => setNewForm({ ...newForm, className: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Section</label>
                  <input
                    type="text"
                    value={newForm.section}
                    onChange={(e) => setNewForm({ ...newForm, section: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Parent / Guardian Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. K. Roy"
                  value={newForm.parentName}
                  onChange={(e) => setNewForm({ ...newForm, parentName: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Parent Contact Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 9800011122"
                  value={newForm.parentPhone}
                  onChange={(e) => setNewForm({ ...newForm, parentPhone: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition shadow-lg mt-2"
              >
                Save & Enrol Student
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-6">
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-500"
                />
                <div>
                  <h3 className="font-bold text-white text-base">{selectedStudent.name}</h3>
                  <p className="text-xs text-indigo-400">ID: {selectedStudent.id} • Class {selectedStudent.className}-{selectedStudent.section}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex border-b border-slate-800 bg-slate-950/50 px-6">
              {[
                { id: 'profile', label: 'Student Bio', icon: Users },
                { id: 'docs', label: 'Secure Documents', icon: Lock },
                { id: 'health', label: 'Health Record', icon: HeartPulse },
                { id: 'sports', label: 'Sports & Activities', icon: Trophy }
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition ${
                      active 
                        ? 'border-indigo-500 text-indigo-400 bg-indigo-950/20' 
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" /> {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto">
              {activeTab === 'profile' && (
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="glass-card rounded-xl p-4 space-y-2">
                    <h4 className="font-bold text-indigo-400 mb-2 uppercase text-[10px] tracking-wider">Academic Details</h4>
                    <p><span className="text-slate-400">Admission No:</span> <span className="font-semibold text-white">{selectedStudent.admissionNo}</span></p>
                    <p><span className="text-slate-400">Admission Date:</span> {selectedStudent.admissionDate}</p>
                    <p><span className="text-slate-400">Roll Number:</span> #{selectedStudent.rollNo}</p>
                    <p><span className="text-slate-400">Previous School:</span> {selectedStudent.previousSchool}</p>
                  </div>
                  <div className="glass-card rounded-xl p-4 space-y-2">
                    <h4 className="font-bold text-indigo-400 mb-2 uppercase text-[10px] tracking-wider">Personal & Parent Info</h4>
                    <p><span className="text-slate-400">Date of Birth:</span> {selectedStudent.dob}</p>
                    <p><span className="text-slate-400">Gender:</span> {selectedStudent.gender}</p>
                    <p><span className="text-slate-400">Parent/Guardian:</span> {selectedStudent.parentName}</p>
                    <p><span className="text-slate-400">Parent Phone:</span> {selectedStudent.parentPhone}</p>
                    <p><span className="text-slate-400">Emergency Phone:</span> {selectedStudent.emergencyContact}</p>
                    <p><span className="text-slate-400">Address:</span> {selectedStudent.address}</p>
                  </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-500/20 p-3 rounded-xl text-xs text-indigo-300">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-emerald-400" />
                      <span>Document Storage: 256-Bit Encrypted Cloud Storage</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {(selectedStudent.documents || []).map((doc, idx) => (
                      <div key={idx} className="glass-card rounded-xl p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-indigo-400" />
                          <div>
                            <p className="font-semibold text-white">{doc.name}</p>
                            <p className="text-[10px] text-slate-400">Uploaded {doc.date} • {doc.size}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'health' && (
                <div className="glass-card rounded-2xl p-5 text-xs space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <HeartPulse className="h-5 w-5" /> Basic Medical Card
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div><span className="text-slate-400">Blood Group:</span> <span className="font-bold text-white bg-rose-500/20 px-2 py-0.5 rounded text-rose-300">{selectedStudent.health?.bloodGroup}</span></div>
                    <div><span className="text-slate-400">Allergies:</span> <span className="font-semibold text-amber-300">{selectedStudent.health?.allergies}</span></div>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Medical Notes & Precautions:</span>
                    <p className="p-3 rounded-xl bg-slate-800 text-slate-200">{selectedStudent.health?.medicalNotes}</p>
                  </div>
                </div>
              )}

              {activeTab === 'sports' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                    <Trophy className="h-4 w-4" /> Student Sports & Activity Achievements
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(selectedStudent.sportsActivities || []).map((item, idx) => (
                      <div key={idx} className="glass-card rounded-xl p-3 border border-amber-500/20 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-amber-300 font-bold uppercase">{item.category}</span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-xs">
                            {item.badge}
                          </span>
                        </div>
                        <p className="font-semibold text-white text-xs">{item.title}</p>
                        <span className="text-[10px] text-slate-400">Year {item.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
