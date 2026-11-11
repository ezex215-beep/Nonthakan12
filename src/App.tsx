import React, { useState } from 'react';
import { User, Course, Teacher, Classroom, TimetableSlot, Notification } from './types';
import { INITIAL_COURSES, INITIAL_TEACHERS, INITIAL_CLASSROOMS, INITIAL_TIMETABLE } from './data/mockData';
import { AuthModal } from './components/AuthModal';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { TimetableDisplay } from './components/TimetableDisplay';
import { TimetableGenerator } from './components/TimetableGenerator';
import { DataManager } from './components/DataManager';
import { AnalyticsView } from './components/AnalyticsView';
import { UserManualModal } from './components/UserManualModal';

export default function App() {
  // Authentication state
  const [user, setUser] = useState<User | null>({
    id: 'user-demo-1',
    name: 'นายนนทกานต์ วงษ์แก้ว (ผู้จัดทำ / Admin)',
    email: 'nontakarn@ktech.ac.th',
    role: 'admin',
    token: 'mock-token'
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Application Data States
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [teachers, setTeachers] = useState<Teacher[]>(INITIAL_TEACHERS);
  const [classrooms, setClassrooms] = useState<Classroom[]>(INITIAL_CLASSROOMS);
  const [timetable, setTimetable] = useState<TimetableSlot[]>(INITIAL_TIMETABLE);

  // Notifications State
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      teacherId: 't1',
      title: 'แจ้งเตือนตารางสอน',
      message: 'ผู้ดูแลระบบได้ทำการอัปเดตตารางสอนประจำภาคเรียนเรียบร้อยแล้ว',
      timestamp: 'วันนี้ 10:30 น.',
      read: false
    },
    {
      id: 'notif-2',
      teacherId: 't1',
      title: 'ปรับเปลี่ยนคาบเรียน',
      message: 'วิชา ICT-DRMC-384B ถูกจัดตารางใหม่ในวันจันทร์ คาบที่ 1-3',
      timestamp: 'เมื่อวานนี้',
      read: true
    }
  ]);

  // Modals
  const [manualOpen, setManualOpen] = useState(false);

  const handleUpdateTimetable = (newSlots: TimetableSlot[]) => {
    setTimetable(newSlots);

    // Automatically generate notification for teachers
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      teacherId: 'all',
      title: 'ประกาศ: ตารางสอนถูกปรับเปลี่ยน',
      message: 'ผู้ดูแลระบบได้ทำการสร้างหรือปรับปรุงตารางสอนอัตโนมัติใหม่ กรุณาตรวจสอบตารางสอนของคุณ',
      timestamp: 'เมื่อสักครู่นี้',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  if (!user) {
    return <AuthModal onLogin={(u) => setUser(u)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => setUser(null)}
        onOpenManual={() => setManualOpen(true)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onClearAllNotifications={handleClearAllNotifications}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            courses={courses}
            teachers={teachers}
            classrooms={classrooms}
            timetable={timetable}
            setActiveTab={setActiveTab}
            onOpenManual={() => setManualOpen(true)}
          />
        )}

        {activeTab === 'timetable' && (
          <TimetableDisplay
            courses={courses}
            teachers={teachers}
            classrooms={classrooms}
            timetable={timetable}
          />
        )}

        {activeTab === 'generator' && (
          <TimetableGenerator
            courses={courses}
            teachers={teachers}
            classrooms={classrooms}
            onUpdateTimetable={handleUpdateTimetable}
          />
        )}

        {activeTab === 'data' && (
          <DataManager
            courses={courses}
            setCourses={setCourses}
            teachers={teachers}
            setTeachers={setTeachers}
            classrooms={classrooms}
            setClassrooms={setClassrooms}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView
            courses={courses}
            teachers={teachers}
            classrooms={classrooms}
            timetable={timetable}
          />
        )}
      </main>

      {/* Footer with creator badge */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 text-center text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-medium text-slate-300">
            ระบบจัดตารางสอนอัตโนมัติอัจฉริยะ (AI Automated Timetable Scheduling System)
          </p>
          <p>
            พัฒนาโดย <span className="text-indigo-400 font-semibold">นายนนทกานต์ วงษ์แก้ว</span> ปวส.1 แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
          </p>
          <p className="text-[10px] text-slate-500">
            อาชีวศึกษา ปีการศึกษา 2568 - 2572 | รองรับการแสดงผลบนมือถือและทุกอุปกรณ์
          </p>
        </div>
      </footer>

      {/* Modals */}
      <UserManualModal isOpen={manualOpen} onClose={() => setManualOpen(false)} />
    </div>
  );
}
