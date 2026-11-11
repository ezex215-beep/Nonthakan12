import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Lock, Mail, User as UserIcon, ShieldAlert, CheckCircle, Sparkles } from 'lucide-react';

interface AuthModalProps {
  onLogin: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('teacher');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const LOGO_URL = "https://cdn.phototourl.com/member/2026-11-11-8de2658e-0411-4744-ac50-78fec0d55a3e.jpg";

  const handleDemoLogin = (demoRole: UserRole) => {
    const demoUsers: Record<UserRole, { name: string; email: string }> = {
      admin: { name: 'ผู้ดูแลระบบ (Admin)', email: 'admin@ktech.ac.th' },
      teacher: { name: 'ดร. นนทกานต์ วงษ์แก้ว (อาจารย์ผู้สอน)', email: 'nontakarn@ktech.ac.th' },
      student: { name: 'นักศึกษา ปวส.1 (ผู้ใช้งาน)', email: 'student@ktech.ac.th' },
    };
    onLogin({
      id: `user-${Date.now()}`,
      name: demoUsers[demoRole].name,
      email: demoUsers[demoRole].email,
      role: demoRole,
      token: 'mock-jwt-token-12345'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
      return;
    }

    if (!isLogin) {
      if (!name) {
        setError('กรุณากรอกชื่อ-นามสกุล');
        return;
      }
      if (password.length < 8) {
        setError('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษรขึ้นไป');
        return;
      }
    } else {
      if (password.length < 8) {
        setError('รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษรขึ้นไป (ตามข้อกำหนดความปลอดภัย)');
        return;
      }
    }

    // Success login/register
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: isLogin ? (email.includes('admin') ? 'ผู้ดูแลระบบ (Admin)' : email.includes('student') ? 'นักศึกษา ปวส.1' : name || 'อาจารย์ผู้ใช้งาน') : name,
      email,
      role: email.includes('admin') ? 'admin' : email.includes('student') ? 'student' : role,
      token: 'mock-jwt-token-' + Math.random().toString(36).substring(7)
    };

    setSuccess(isLogin ? 'เข้าสู่ระบบสำเร็จ กำลังเข้าสู่หน้าหลัก...' : 'สมัครสมาชิกสำเร็จ! กำลังเข้าสู่ระบบ...');
    setTimeout(() => {
      onLogin(newUser);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-6">
          <div className="inline-block p-1 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-2xl shadow-lg mb-4">
            <img 
              src={LOGO_URL} 
              alt="Logo" 
              className="w-20 h-20 object-cover rounded-xl bg-white"
              onError={(e) => {
                // Fallback icon if image fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            ระบบจัดตารางสอนอัตโนมัติ
          </h1>
          <p className="text-xs text-indigo-300 mt-1 font-medium">
            วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
          </p>
          <div className="inline-flex items-center gap-1 mt-3 px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Timetable Scheduling System (ปวส.)</span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 bg-slate-800/80 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
            className={`py-2 text-sm font-medium rounded-lg transition-all ${isLogin ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            เข้าสู่ระบบ
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
            className={`py-2 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          >
            สมัครสมาชิก
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">ชื่อ - นามสกุล</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="เช่น นายนนทกานต์ วงษ์แก้ว"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">อีเมลผู้ใช้งาน</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@ktech.ac.th"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              รหัสผ่าน {!isLogin && <span className="text-indigo-400 font-normal">(อย่างน้อย 8 ตัวอักษร)</span>}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            {!isLogin && (
              <p className={`text-[11px] mt-1 ${password.length >= 8 ? 'text-emerald-400' : 'text-slate-400'}`}>
                {password.length >= 8 ? '✓ ผ่านเงื่อนไขความยาว 8 ตัวอักษร' : `กรุณากรอกอีก ${8 - password.length} ตัวอักษร (ขั้นต่ำ 8 ตัว)`}
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">บทบาทผู้ใช้งาน</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="teacher">อาจารย์ผู้สอน / ผู้จัดตาราง</option>
                <option value="student">นักศึกษา</option>
                <option value="admin">ผู้ดูแลระบบ (Admin)</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all text-sm mt-2"
          >
            {isLogin ? 'เข้าสู่ระบบ' : 'ลงทะเบียนสมัครสมาชิก'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-400 mb-3">เข้าสู่ระบบด่วนด้วยบัญชีทดลอง (Demo Mode):</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('admin')}
              className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs rounded-lg border border-slate-700 transition"
            >
              Admin
            </button>
            <button
              onClick={() => handleDemoLogin('teacher')}
              className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-blue-300 text-xs rounded-lg border border-slate-700 transition"
            >
              อาจารย์
            </button>
            <button
              onClick={() => handleDemoLogin('student')}
              className="py-1.5 px-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 text-xs rounded-lg border border-slate-700 transition"
            >
              นักศึกษา
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] text-slate-500">
          พัฒนาโดย นายนนทกานต์ วงษ์แก้ว ปวส.1 วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
        </div>
      </div>
    </div>
  );
};
