import React, { useState } from 'react';
import { User, Notification } from '../types';
import { 
  Calendar, 
  LayoutDashboard, 
  Cpu, 
  Database, 
  BarChart3, 
  BookOpen, 
  LogOut, 
  Menu, 
  X,
  Info
} from 'lucide-react';
import { CreatorModal } from './CreatorModal';
import { NotificationCenter } from './NotificationCenter';

interface NavbarProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  onOpenManual: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAllNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onLogout,
  onOpenManual,
  notifications,
  onMarkAsRead,
  onClearAllNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [creatorModalOpen, setCreatorModalOpen] = useState(false);

  const LOGO_URL = "https://cdn.phototourl.com/member/2026-11-11-8de2658e-0411-4744-ac50-78fec0d55a3e.jpg";

  const navItems = [
    { id: 'dashboard', label: 'หน้าหลัก', icon: LayoutDashboard },
    { id: 'timetable', label: 'ตารางสอน', icon: Calendar },
    { id: 'generator', label: 'จัดตารางด้วย AI', icon: Cpu },
    { id: 'data', label: 'จัดการข้อมูล', icon: Database },
    { id: 'analytics', label: 'สถิติและรายงาน', icon: BarChart3 },
  ];

  return (
    <>
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
              <img
                src={LOGO_URL}
                alt="Logo"
                className="w-10 h-10 object-cover rounded-xl border border-indigo-500/30 bg-white shadow-md"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <h1 className="text-sm sm:text-base font-bold text-white tracking-wide leading-tight">
                  ระบบจัดตารางสอนอัตโนมัติ
                </h1>
                <p className="text-[11px] text-indigo-400 font-medium">
                  วิทยาลัยเทคนิคกาญจนาภิเษก สมุทรปราการ
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Notification Center */}
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={onMarkAsRead}
                onClearAll={onClearAllNotifications}
              />

              <button
                onClick={onOpenManual}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium border border-slate-700 transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>คู่มือ</span>
              </button>

              <button
                onClick={() => setCreatorModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 rounded-xl text-xs font-medium border border-indigo-500/30 transition"
                title="ข้อมูลผู้จัดทำ"
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">ผู้จัดทำ</span>
              </button>

              <div className="h-6 w-px bg-slate-800 mx-1"></div>

              {/* User profile & logout */}
              <div className="flex items-center gap-3 pl-1">
                <div className="text-right">
                  <p className="text-xs font-semibold text-white truncate max-w-[120px]">{user.name}</p>
                  <p className="text-[10px] text-indigo-400 capitalize">{user.role}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <NotificationCenter
                notifications={notifications}
                onMarkAsRead={onMarkAsRead}
                onClearAll={onClearAllNotifications}
              />
              <button
                onClick={() => setCreatorModalOpen(true)}
                className="p-2 text-indigo-400 bg-indigo-950/60 rounded-xl border border-indigo-500/30"
                title="ผู้จัดทำ"
              >
                <Info className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white bg-slate-800 rounded-xl"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{user.name}</p>
                  <p className="text-[10px] text-indigo-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>ออกจากระบบ</span>
              </button>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-2">
              <button
                onClick={() => { onOpenManual(); setMobileMenuOpen(false); }}
                className="w-full py-2.5 px-3 bg-slate-800 text-slate-300 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 border border-slate-700"
              >
                <BookOpen className="w-4 h-4" />
                <span>คู่มือการใช้งาน</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <CreatorModal isOpen={creatorModalOpen} onClose={() => setCreatorModalOpen(false)} />
    </>
  );
};
