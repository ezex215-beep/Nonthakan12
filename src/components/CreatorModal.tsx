import React from 'react';
import { X, Award, GraduationCap, School, User as UserIcon } from 'lucide-react';

interface CreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatorModal: React.FC<CreatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const AUTHOR_PHOTO_URL = "https://cdn.phototourl.com/member/2026-09-04-d3237364-c5a0-4a29-acb9-732e04d73122.png";
  const LOGO_URL = "https://cdn.phototourl.com/member/2026-11-11-8de2658e-0411-4744-ac50-78fec0d55a3e.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-white overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs mb-4">
            <Award className="w-4 h-4" />
            <span>ผู้จัดทำโครงงาน / ผลงานการแข่งขัน</span>
          </div>

          {/* Author photo placed ABOVE creator name */}
          <div className="mb-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <img
                src={AUTHOR_PHOTO_URL}
                alt="นายนนทกานต์ วงษ์แก้ว"
                className="relative w-32 h-32 object-cover rounded-2xl border-2 border-indigo-500/50 shadow-lg bg-slate-800"
                onError={(e) => {
                  // Fallback UI if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-1">
            นายนนทกานต์ วงษ์แก้ว
          </h2>
          <p className="text-sm font-medium text-indigo-300 mb-4">
            นักศึกษา ปวส.1 แผนกวิชาเทคโนโลยีธุรกิจดิจิทัล
          </p>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 text-left space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <School className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">สถานศึกษา</p>
                <p className="text-sm font-semibold text-white">วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-slate-400">ประเภทวิชา / ทักษะ</p>
                <p className="text-sm font-semibold text-white">ทักษะเทคโนโลยีปัญญาประดิษฐ์ (AI Timetable Scheduling)</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 pt-2">
            <img src={LOGO_URL} alt="Logo" className="w-10 h-10 rounded-lg object-cover border border-slate-700" />
            <div className="text-left">
              <p className="text-xs font-medium text-slate-300">ระบบจัดตารางสอนอัตโนมัติอัจฉริยะ</p>
              <p className="text-[10px] text-slate-400">อาชีวศึกษา ปีการศึกษา 2568 - 2572</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition shadow-lg shadow-indigo-600/30"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
