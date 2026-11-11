import React, { useState } from 'react';
import { Course, Teacher, Classroom, TimetableSlot } from '../types';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Download, 
  Printer, 
  User as UserIcon, 
  Home, 
  FileText,
  CheckCircle2
} from 'lucide-react';

interface TimetableDisplayProps {
  courses: Course[];
  teachers: Teacher[];
  classrooms: Classroom[];
  timetable: TimetableSlot[];
}

export const TimetableDisplay: React.FC<TimetableDisplayProps> = ({
  courses,
  teachers,
  classrooms,
  timetable,
}) => {
  const [viewMode, setViewMode] = useState<'master' | 'teacher' | 'room' | 'class'>('master');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [exportSuccess, setExportSuccess] = useState<string>('');

  const days: ('จันทร์' | 'อังคาร' | 'พุธ' | 'พฤหัสบดี' | 'ศุกร์')[] = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์'];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];
  const timeLabels: Record<number, string> = {
    1: '08:30 - 09:20',
    2: '09:20 - 10:10',
    3: '10:20 - 11:10',
    4: '11:10 - 12:00',
    5: '13:00 - 13:50',
    6: '13:50 - 14:40',
    7: '14:50 - 15:40',
    8: '15:40 - 16:30',
  };

  // Filter timetable based on viewMode and selectedFilter
  const filteredTimetable = timetable.filter((slot) => {
    if (viewMode === 'teacher' && selectedFilter !== 'all' && slot.teacherId !== selectedFilter) return false;
    if (viewMode === 'room' && selectedFilter !== 'all' && slot.classroomId !== selectedFilter) return false;
    if (viewMode === 'class' && selectedFilter !== 'all' && slot.classGroup !== selectedFilter) return false;

    if (searchQuery) {
      const course = courses.find(c => c.id === slot.courseId);
      const teacher = teachers.find(t => t.id === slot.teacherId);
      const room = classrooms.find(r => r.id === slot.classroomId);
      const query = searchQuery.toLowerCase();
      const matchCourse = course?.name.toLowerCase().includes(query) || course?.code.toLowerCase().includes(query);
      const matchTeacher = teacher?.name.toLowerCase().includes(query);
      const matchRoom = room?.name.toLowerCase().includes(query);
      const matchGroup = slot.classGroup.toLowerCase().includes(query);
      if (!matchCourse && !matchTeacher && !matchRoom && !matchGroup) return false;
    }

    return true;
  });

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Day,Period,Course Code,Course Name,Teacher,Room,Class Group\n";
    filteredTimetable.forEach((slot) => {
      const course = courses.find(c => c.id === slot.courseId);
      const teacher = teachers.find(t => t.id === slot.teacherId);
      const room = classrooms.find(r => r.id === slot.classroomId);
      csvContent += `${slot.day},${slot.period},${course?.code || ''},"${course?.name || ''}","${teacher?.name || ''}","${room?.name || ''}","${slot.classGroup}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "timetable_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportSuccess('ส่งออกไฟล์ CSV สำเร็จ!');
    setTimeout(() => setExportSuccess(''), 3000);
  };

  const handleExportPDF = () => {
    setExportSuccess('กำลังเตรียมเอกสาร PDF สำหรับพิมพ์/บันทึก...');
    setTimeout(() => {
      setExportSuccess('');
      window.print();
    }, 600);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & View Selectors */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-indigo-600" />
            <span>ตารางสอนประจำภาคเรียน (Timetable View)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            แสดงผลตารางสอนสะอาดตา รองรับการใช้งานบนมือถือและแท็บเล็ต พร้อมส่งออกเป็น PDF
          </p>
        </div>

        {/* View Mode Buttons */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full lg:w-auto">
          <button
            onClick={() => { setViewMode('master'); setSelectedFilter('all'); }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${viewMode === 'master' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
          >
            ภาพรวม (Master)
          </button>
          <button
            onClick={() => { setViewMode('teacher'); setSelectedFilter(teachers[0]?.id || 'all'); }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${viewMode === 'teacher' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
          >
            รายอาจารย์
          </button>
          <button
            onClick={() => { setViewMode('room'); setSelectedFilter(classrooms[0]?.id || 'all'); }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${viewMode === 'room' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
          >
            รายห้องเรียน
          </button>
          <button
            onClick={() => { setViewMode('class'); setSelectedFilter('ปวส.1/1 ดิจิทัล'); }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${viewMode === 'class' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
          >
            รายกลุ่มเรียน
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportSuccess}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="ค้นหาชื่อวิชา รหัสวิชา อาจารย์ ห้อง..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {viewMode === 'teacher' && (
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            >
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          )}

          {viewMode === 'room' && (
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            >
              {classrooms.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          )}

          {viewMode === 'class' && (
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            >
              <option value="ปวส.1/1 ดิจิทัล">ปวส.1/1 ดิจิทัล</option>
              <option value="ปวส.1/2 AI">ปวส.1/2 AI</option>
              <option value="ปวส.2/1 ดิจิทัล">ปวส.2/1 ดิจิทัล</option>
            </select>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Export to PDF / พิมพ์</span>
          </button>
        </div>
      </div>

      {/* Timetable Grid View */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left min-w-[900px]">
            <thead>
              <tr className="bg-slate-900 text-white text-xs">
                <th className="p-3.5 border-b border-slate-800 w-28 text-center font-semibold">วัน / คาบ</th>
                {periods.map(p => (
                  <th key={p} className="p-3.5 border-b border-slate-800 text-center font-semibold">
                    <div>คาบที่ {p}</div>
                    <div className="text-[10px] text-indigo-300 font-normal">{timeLabels[p]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {days.map((day) => (
                <tr key={day} className="hover:bg-slate-50/60 transition">
                  <td className="p-3.5 font-bold text-slate-800 bg-slate-50 border-r border-slate-200 text-center">
                    {day}
                  </td>
                  {periods.map((period) => {
                    const slot = filteredTimetable.find(s => s.day === day && s.period === period);
                    const course = slot ? courses.find(c => c.id === slot.courseId) : null;
                    const teacher = slot ? teachers.find(t => t.id === slot.teacherId) : null;
                    const room = slot ? classrooms.find(r => r.id === slot.classroomId) : null;

                    return (
                      <td key={period} className="p-2 border-r border-slate-100 align-top h-28 w-44">
                        {slot && course ? (
                          <div className="bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200 rounded-2xl p-2.5 h-full flex flex-col justify-between transition shadow-sm">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-bold text-indigo-700 bg-indigo-200/60 px-1.5 py-0.5 rounded-md">
                                  {course.code}
                                </span>
                                <span className="text-[10px] text-slate-600 font-medium">{slot.classGroup}</span>
                              </div>
                              <p className="font-bold text-slate-900 text-[11px] leading-snug line-clamp-2">
                                {course.name}
                              </p>
                            </div>
                            <div className="pt-2 border-t border-indigo-200/50 space-y-0.5">
                              <p className="text-[10px] text-slate-600 flex items-center gap-1 truncate">
                                <UserIcon className="w-3 h-3 text-indigo-500 shrink-0" />
                                <span className="truncate">{teacher?.name}</span>
                              </p>
                              <p className="text-[10px] text-slate-600 flex items-center gap-1 truncate">
                                <Home className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span className="truncate">{room?.name}</span>
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-[10px]">
                            คาบว่าง
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
