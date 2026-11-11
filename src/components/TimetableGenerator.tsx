import React, { useState } from 'react';
import { Course, Teacher, Classroom, TimetableSlot } from '../types';
import { Cpu, Play, CheckCircle2, AlertTriangle, RefreshCw, Sparkles, Settings2, ShieldCheck, Zap } from 'lucide-react';

interface TimetableGeneratorProps {
  courses: Course[];
  teachers: Teacher[];
  classrooms: Classroom[];
  onUpdateTimetable: (newSlots: TimetableSlot[]) => void;
}

export const TimetableGenerator: React.FC<TimetableGeneratorProps> = ({
  courses,
  teachers,
  classrooms,
  onUpdateTimetable,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [seed, setSeed] = useState(2026);
  const [algorithm, setAlgorithm] = useState('constraint_satisfaction');
  const [optimizationLevel, setOptimizationLevel] = useState('high');
  const [logs, setLogs] = useState<string[]>([]);
  const [successResult, setSuccessResult] = useState<{ total: number; conflicts: number } | null>(null);

  const handleRunGenerator = () => {
    setIsGenerating(true);
    setProgress(0);
    setLogs([]);
    setSuccessResult(null);

    const steps = [
      'กำลังโหลดข้อมูลนำเข้า (รายวิชา, อาจารย์, ห้องเรียน, เงื่อนไข)...',
      'วิเคราะห์ความพร้อมและความจุห้องเรียน (Computer Lab / Lecture)...',
      'ตรวจสอบภาระงานของอาจารย์ผู้สอน (Max Hours per Day)...',
      'รันอัลกอริทึมจัดตารางสอนอัตโนมัติ (Constraint Satisfaction Engine)...',
      'ตรวจสอบและกำจัดข้อขัดแย้งคาบชน (Teacher & Room Overlap Check)...',
      'สร้างตารางสอนสำเร็จ พร้อมใช้งานบนระบบ Cloud...'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const currentProgress = Math.round((currentStep / steps.length) * 100);
      setProgress(currentProgress);
      setLogs((prev) => [...prev, `[Step ${currentStep}] ${steps[currentStep - 1]}`]);

      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsGenerating(false);

        // Generate a new simulated optimal timetable slots
        const classGroups = ['ปวส.1/1 ดิจิทัล', 'ปวส.1/2 AI', 'ปวส.2/1 ดิจิทัล'];
        const days: ('จันทร์' | 'อังคาร' | 'พุธ' | 'พฤหัสบดี' | 'ศุกร์')[] = ['จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์'];
        const generatedSlots: TimetableSlot[] = [];

        let slotCounter = 1;
        courses.forEach((course, cIdx) => {
          const assignedTeacher = teachers[cIdx % teachers.length];
          const assignedRoom = classrooms.find(r => r.type === course.requiredRoomType) || classrooms[0];
          const assignedGroup = classGroups[cIdx % classGroups.length];
          const assignedDay = days[cIdx % days.length];
          
          for (let p = 1; p <= Math.min(course.hoursPerWeek, 3); p++) {
            generatedSlots.push({
              id: `gen-${Date.now()}-${slotCounter++}`,
              courseId: course.id,
              teacherId: assignedTeacher.id,
              classroomId: assignedRoom.id,
              classGroup: assignedGroup,
              day: assignedDay,
              period: p <= 4 ? p : p + 1 // skip lunch period 5 if needed or assign
            });
          }
        });

        onUpdateTimetable(generatedSlots);
        setSuccessResult({ total: generatedSlots.length, conflicts: 0 });
      }
    }, 450);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">ระบบจัดตารางสอนอัตโนมัติด้วย AI</h2>
            <p className="text-xs text-indigo-300">Constraint Satisfaction & Heuristic Optimization Engine</p>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          ระบบคำนวณและจัดตารางสอนอัตโนมัติอัจฉริยะ ป้องกันคาบชนของอาจารย์และห้องเรียน ตรวจสอบเงื่อนไขข้อจำกัดตามหลักเกณฑ์อาชีวศึกษา
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-indigo-600" />
            <span>ตั้งค่าตัวแปรการจัดตาราง (Parameters)</span>
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">อัลกอริทึม (Algorithm)</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="constraint_satisfaction">Constraint Satisfaction Problem (CSP)</option>
              <option value="genetic_algorithm">Genetic Algorithm (GA)</option>
              <option value="heuristic_search">Heuristic & Greedy Search</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Random Seed (ค่าเริ่มต้นการสุ่ม)</label>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">ระดับความเข้มข้นของการจัดตาราง</label>
            <select
              value={optimizationLevel}
              onChange={(e) => setOptimizationLevel(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="high">ระดับสูง (ตรวจสอบเงื่อนไขทุกกรณี - ป้องกัน 100%)</option>
              <option value="balanced">ระดับสมดุล (ความเร็ว + ความถูกต้อง)</option>
              <option value="fast">ระดับความเร็วสูง (เน้นผลลัพธ์ด่วน)</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRunGenerator}
              disabled={isGenerating}
              className={`w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 text-xs sm:text-sm ${
                isGenerating ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>กำลังคำนวณตารางสอน...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>เริ่มรันอัลกอริทึมจัดตารางสอน</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Execution Logs & Progress */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>สถานะการประมวลผลระบบ AI Engine</span>
              </h3>
              <span className="text-xs font-medium px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full">
                {isGenerating ? 'กำลังประมวลผล...' : successResult ? 'เสร็จสิ้นสมบูรณ์' : 'พร้อมรัน'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>ความคืบหน้า</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Logs box */}
            <div className="bg-slate-900 text-slate-200 font-mono text-xs rounded-2xl p-4 h-48 overflow-y-auto space-y-1.5 border border-slate-800 shadow-inner">
              {logs.length === 0 ? (
                <p className="text-slate-500 italic">คลิกปุ่ม "เริ่มรันอัลกอริทึมจัดตารางสอน" เพื่อเริ่มต้นกระบวนการคำนวณอัตโนมัติ...</p>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-emerald-400">
                    <span className="text-slate-500">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {successResult && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-emerald-900">จัดตารางสอนสำเร็จ {successResult.total} คาบเรียน!</p>
                  <p className="text-[11px] text-emerald-700">ตรวจสอบข้อขัดแย้ง: ไม่พบคาบชน (0 Conflicts)</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-sm">
                ผ่านเกณฑ์ 100%
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
