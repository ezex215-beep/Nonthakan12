import React, { useState } from 'react';
import { Course, Teacher, Classroom } from '../types';
import { Database, Plus, Trash2, Edit2, Upload, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

interface DataManagerProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  teachers: Teacher[];
  setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
  classrooms: Classroom[];
  setClassrooms: React.Dispatch<React.SetStateAction<Classroom[]>>;
}

export const DataManager: React.FC<DataManagerProps> = ({
  courses,
  setCourses,
  teachers,
  setTeachers,
  classrooms,
  setClassrooms,
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'teachers' | 'classrooms'>('courses');
  const [successMsg, setSuccessMsg] = useState('');

  // Course form state
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseHours, setNewCourseHours] = useState(3);
  const [newCourseType, setNewCourseType] = useState<'lecture' | 'computer_lab' | 'workshop'>('computer_lab');

  // Teacher form state
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherEmail, setNewTeacherEmail] = useState('');

  // Classroom form state
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomCapacity, setNewRoomCapacity] = useState(40);
  const [newRoomType, setNewRoomType] = useState<'lecture' | 'computer_lab' | 'workshop'>('computer_lab');

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode || !newCourseName) return;
    const course: Course = {
      id: `c-${Date.now()}`,
      code: newCourseCode,
      name: newCourseName,
      credits: 3,
      hoursPerWeek: newCourseHours,
      department: 'เทคโนโลยีธุรกิจดิจิทัล',
      requiredRoomType: newCourseType,
    };
    setCourses([...courses, course]);
    setNewCourseCode('');
    setNewCourseName('');
    setSuccessMsg('เพิ่มรายวิชาสำเร็จ');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName) return;
    const teacher: Teacher = {
      id: `t-${Date.now()}`,
      name: newTeacherName,
      email: newTeacherEmail || 'teacher@ktech.ac.th',
      department: 'เทคโนโลยีธุรกิจดิจิทัล',
      maxHoursPerDay: 6,
      unavailableSlots: [],
    };
    setTeachers([...teachers, teacher]);
    setNewTeacherName('');
    setNewTeacherEmail('');
    setSuccessMsg('เพิ่มอาจารย์สำเร็จ');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName) return;
    const room: Classroom = {
      id: `r-${Date.now()}`,
      name: newRoomName,
      capacity: newRoomCapacity,
      type: newRoomType,
      building: 'อาคารปฏิบัติการดิจิทัล',
    };
    setClassrooms([...classrooms, room]);
    setNewRoomName('');
    setSuccessMsg('เพิ่มห้องเรียนสำเร็จ');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Subtabs */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-600" />
            <span>ระบบจัดการข้อมูลพื้นฐาน (Data Management & Input)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            จัดการข้อมูลรายวิชา อาจารย์ผู้สอน และห้องเรียน รองรับการนำเข้าไฟล์ CSV/Excel
          </p>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === 'courses' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
          >
            รายวิชา ({courses.length})
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === 'teachers' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
          >
            อาจารย์ ({teachers.length})
          </button>
          <button
            onClick={() => setActiveTab('classrooms')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${activeTab === 'classrooms' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
          >
            ห้องเรียน ({classrooms.length})
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Course Form */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>เพิ่มรายวิชาใหม่</span>
            </h3>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">รหัสวิชา</label>
                <input
                  type="text"
                  required
                  value={newCourseCode}
                  onChange={(e) => setNewCourseCode(e.target.value)}
                  placeholder="เช่น ICT-384B"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ชื่อรายวิชา</label>
                <input
                  type="text"
                  required
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="เช่น ตรวจสอบคุณภาพข้อมูล"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">จำนวนคาบ/สัปดาห์</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={newCourseHours}
                  onChange={(e) => setNewCourseHours(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ประเภทห้องที่ต้องการ</label>
                <select
                  value={newCourseType}
                  onChange={(e) => setNewCourseType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                >
                  <option value="computer_lab">ห้องปฏิบัติการคอมพิวเตอร์</option>
                  <option value="lecture">ห้องเรียนทฤษฎี</option>
                  <option value="workshop">ห้องปฏิบัติการเฉพาะทาง</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition"
              >
                บันทึกรายวิชา
              </button>
            </form>
          </div>

          {/* Courses Table */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
            <h3 className="font-bold text-slate-900 text-sm mb-4">รายการรายวิชาทั้งหมด ({courses.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="p-3">รหัสวิชา</th>
                    <th className="p-3">ชื่อวิชา</th>
                    <th className="p-3">คาบ/สัปดาห์</th>
                    <th className="p-3">ห้องที่ต้องการ</th>
                    <th className="p-3 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-indigo-600">{course.code}</td>
                      <td className="p-3 font-medium text-slate-900">{course.name}</td>
                      <td className="p-3">{course.hoursPerWeek} คาบ</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-slate-100 rounded-lg text-[10px]">
                          {course.requiredRoomType}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setCourses(courses.filter(c => c.id !== course.id))}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Teachers Tab */}
      {activeTab === 'teachers' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>เพิ่มอาจารย์ผู้สอนใหม่</span>
            </h3>
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ชื่อ-นามสกุลอาจารย์</label>
                <input
                  type="text"
                  required
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  placeholder="เช่น ดร. นนทกานต์ วงษ์แก้ว"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">อีเมล</label>
                <input
                  type="email"
                  value={newTeacherEmail}
                  onChange={(e) => setNewTeacherEmail(e.target.value)}
                  placeholder="nontakarn@ktech.ac.th"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition"
              >
                บันทึกอาจารย์
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
            <h3 className="font-bold text-slate-900 text-sm mb-4">รายการอาจารย์ทั้งหมด ({teachers.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="p-3">ชื่อ-นามสกุล</th>
                    <th className="p-3">อีเมล</th>
                    <th className="p-3">แผนกวิชา</th>
                    <th className="p-3 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teachers.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-900">{t.name}</td>
                      <td className="p-3 text-slate-600">{t.email}</td>
                      <td className="p-3 text-slate-600">{t.department}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setTeachers(teachers.filter(teacher => teacher.id !== t.id))}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Classrooms Tab */}
      {activeTab === 'classrooms' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" />
              <span>เพิ่มห้องเรียนใหม่</span>
            </h3>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ชื่อห้องเรียน</label>
                <input
                  type="text"
                  required
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  placeholder="เช่น ห้องปฏิบัติการ AI 3"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ความจุ (คน)</label>
                <input
                  type="number"
                  value={newRoomCapacity}
                  onChange={(e) => setNewRoomCapacity(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">ประเภทห้อง</label>
                <select
                  value={newRoomType}
                  onChange={(e) => setNewRoomType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                >
                  <option value="computer_lab">ห้องปฏิบัติการคอมพิวเตอร์</option>
                  <option value="lecture">ห้องเรียนทฤษฎี</option>
                  <option value="workshop">ห้องประชุม / Workshop</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition"
              >
                บันทึกห้องเรียน
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm overflow-hidden">
            <h3 className="font-bold text-slate-900 text-sm mb-4">รายการห้องเรียนทั้งหมด ({classrooms.length})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <th className="p-3">ชื่อห้อง</th>
                    <th className="p-3">ความจุ</th>
                    <th className="p-3">ประเภท</th>
                    <th className="p-3 text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {classrooms.map((room) => (
                    <tr key={room.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-slate-900">{room.name}</td>
                      <td className="p-3">{room.capacity} ที่นั่ง</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-slate-100 rounded-lg text-[10px]">
                          {room.type}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => setClassrooms(classrooms.filter(r => r.id !== room.id))}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
