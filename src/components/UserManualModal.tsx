import React from 'react';
import { X, BookOpen, CheckCircle2, Sparkles, Cpu, Award } from 'lucide-react';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative text-white max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">คู่มือการใช้งานระบบ (User Manual & Technical Guide)</h2>
            <p className="text-xs text-indigo-300">ระบบจัดตารางสอนอัตโนมัติอัจฉริยะ ปวส. ปี 2568 - 2572</p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>1. วัตถุประสงค์และภาพรวมของระบบ</span>
            </h3>
            <p className="text-slate-300">
              ระบบนี้พัฒนาขึ้นเพื่อแก้ไขปัญหาการจัดตารางสอนของสถานศึกษาอาชีวศึกษา โดยใช้เทคโนโลยีปัญญาประดิษฐ์ (AI) 
              และอัลกอริทึม Constraint Satisfaction ในการประมวลผลตารางสอนได้อย่างรวดเร็ว แม่นยำ ป้องกันคาบชน และจัดสรรทรัพยากรห้องเรียนได้อย่างมีประสิทธิภาพ
            </p>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>2. วิธีการใช้งานระบบจัดตารางสอนด้วย AI</span>
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>ไปที่เมนู <strong className="text-white">"จัดการข้อมูล"</strong> เพื่อตรวจสอบหรือเพิ่มรายวิชา อาจารย์ และห้องเรียน</li>
              <li>ไปที่เมนู <strong className="text-white">"จัดตารางด้วย AI"</strong> ตั้งค่า Seed หรืออัลกอริทึม จากนั้นคลิกปุ่มรันระบบ</li>
              <li>ระบบจะทำการประมวลผลและตรวจสอบข้อขัดแย้ง (Conflict Detection) แบบเรียลไทม์</li>
              <li>ไปที่เมนู <strong className="text-white">"ตารางสอน"</strong> เพื่อดูตารางสอนแยกตามภาพรวม อาจารย์ ห้องเรียน และกลุ่มนักศึกษา พร้อมส่งออก CSV และพิมพ์ PDF</li>
            </ul>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 space-y-2">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>3. ข้อมูลผู้จัดทำโครงงาน</span>
            </h3>
            <p className="text-slate-300">
              พัฒนาโดย <strong className="text-white">นายนนทกานต์ วงษ์แก้ว</strong> นักศึกษา ปวส.1 แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล 
              วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ ตามเกณฑ์การแข่งขันทักษะวิชาชีพ ทักษะเทคโนโลยีปัญญาประดิษฐ์
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-600/30"
          >
            เข้าใจและปิดคู่มือ
          </button>
        </div>
      </div>
    </div>
  );
};
