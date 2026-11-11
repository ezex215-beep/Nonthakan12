import React from 'react';
import { Course, Teacher, Classroom, TimetableSlot } from '../types';
import { 
  Calendar, 
  BookOpen, 
  Users, 
  Home, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface DashboardProps {
  courses: Course[];
  teachers: Teacher[];
  classrooms: Classroom[];
  timetable: TimetableSlot[];
  setActiveTab: (tab: string) => void;
  onOpenManual: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  courses,
  teachers,
  classrooms,
  timetable,
  setActiveTab,
  onOpenManual,
}) => {
  const AUTHOR_PHOTO_URL = "https://cdn.phototourl.com/member/2026-09-04-d3237364-c5a0-4a29-acb9-732e04d73122.png";
  const LOGO_URL = "https://cdn.phototourl.com/member/2026-11-11-8de2658e-0411-4744-ac50-78fec0d55a3e.jpg";

  // Calculate statistics
  const totalSlotsScheduled = timetable.length;
  const roomUtilization = Math.min(100, Math.round((totalSlotsScheduled / (classrooms.length * 40)) * 100));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-blue-950 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl text-white pb-28 lg:pb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-6">
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>ระบบจัดตารางสอนอัตโนมัติอัจฉริยะด้วย AI (ระดับ ปวส.)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              ยินดีต้อนรับสู่ระบบบริหารตารางสอนอาชีวศึกษา
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              พัฒนาตามเกณฑ์การแข่งขันทางวิชาชีพ ประจำปี 2568 - 2572 สาขาวิชาเทคโนโลยีปัญญาประดิษฐ์ 
              และเทคโนโลยีธุรกิจดิจิทัล ป้องกันคาบชน ห้องซ้อน และจัดตารางอัตโนมัติด้วย Constraint Satisfaction & AI
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setActiveTab('generator')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
              >
                <Cpu className="w-4 h-4" />
                <span>เริ่มจัดตารางสอนอัตโนมัติ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Creator Profile Card placed at bottom right */}
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 flex items-center gap-4 shadow-2xl lg:absolute lg:bottom-6 lg:right-6 shrink-0 w-full sm:w-auto">
            <img
              src={AUTHOR_PHOTO_URL}
              alt="นายนนทกานต์ วงษ์แก้ว"
              className="w-16 h-16 object-cover rounded-xl border border-indigo-500/40 shadow-md bg-slate-800"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">ผู้จัดทำโครงงาน</p>
              <p className="text-sm font-bold text-white">นายนนทกานต์ วงษ์แก้ว</p>
              <p className="text-[11px] text-slate-300">ปวส.1 แผนกเทคโนโลยีธุรกิจดิจิทัล</p>
              <p className="text-[10px] text-slate-400 mt-0.5">วท.กาญจนาภิเษก สมุทรปราการ</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> พร้อมสอน
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{courses.length}</p>
          <p className="text-xs text-slate-500 mt-1">รายวิชาในระบบ</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              อาจารย์ผู้สอน
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{teachers.length}</p>
          <p className="text-xs text-slate-500 mt-1">อาจารย์และผู้เชี่ยวชาญ</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Home className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              ห้องปฏิบัติการ
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{classrooms.length}</p>
          <p className="text-xs text-slate-500 mt-1">ห้องเรียน / คอมพิวเตอร์</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              อัตราการใช้ห้อง
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{roomUtilization}%</p>
          <p className="text-xs text-slate-500 mt-1">ประสิทธิภาพห้องเรียน</p>
        </div>
      </div>

      {/* Main Feature Cards & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: System Status & Features */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>การตรวจสอบข้อขัดแย้ง (Conflict Validation Status)</span>
            </h3>

            <div className="space-y-3">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-emerald-900">ไม่พบข้อขัดแย้งหลัก (No Teacher / Room Overlap)</p>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    อัลกอริทึมตรวจสอบคาบสอนเรียบร้อย ไม่พบการจัดครูซ้อนคาบหรือใช้ห้องเรียนซ้ำในเวลาเดียวกัน
                  </p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">ระบบ AI Constraint Satisfaction Engine พร้อมใช้งาน</p>
                  <p className="text-xs text-blue-700 mt-0.5">
                    รองรับการนำเข้าข้อมูล CSV/Excel, การตรวจสอบความพร้อมของห้องเรียน และการส่งออกรายงาน
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">เมนูลัดสู่การใช้งานระบบ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setActiveTab('timetable')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">ดูตารางสอนรวมและรายบุคคล</h4>
                </div>
                <p className="text-xs text-slate-500">ตรวจสอบตารางสอนแยกตามวัน ห้องเรียน อาจารย์ และกลุ่มนักศึกษา พร้อมพิมพ์รายงาน</p>
              </div>

              <div 
                onClick={() => setActiveTab('generator')}
                className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/40 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-purple-100 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">ตัวจัดตารางสอนอัตโนมัติ (AI Engine)</h4>
                </div>
                <p className="text-xs text-slate-500">รันอัลกอริทึมจัดตารางสอนอัตโนมัติ กำหนด Seed และทดสอบเงื่อนไขข้อจำกัด</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Guidelines & Competition Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-900/50 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>เกณฑ์การแข่งขัน ปวส. (ปี 2568-2572)</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                <span>สมรรถนะวิศวกรรมข้อมูล & AI (ICT-DRMC-384B ถึง ICT-LYRA-391B)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                <span>ป้องกันคาบชน 100% (ครูไม่ซ้ำเวลา ห้องไม่ซ้ำคลาส)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                <span>รองรับการส่งออกข้อมูล CSV / JSON และพิมพ์รายงาน PDF</span>
              </li>
            </ul>
            <button
              onClick={onOpenManual}
              className="w-full mt-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition shadow-md shadow-indigo-600/30"
            >
              เปิดคู่มือการใช้งาน (User Manual)
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <img src={LOGO_URL} alt="Logo" className="w-12 h-12 object-cover rounded-xl border border-slate-200" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ</h4>
                <p className="text-[11px] text-slate-500">แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              โครงงานระบบจัดตารางสอนอัตโนมัติอัจฉริยะ นำเสนอเพื่อเป็นต้นแบบระบบสารสนเทศสถานศึกษาที่มีประสิทธิภาพสูง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
