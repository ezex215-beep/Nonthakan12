import React, { useState } from 'react';
import { Notification } from '../types';
import { Bell, Check, Trash2, X, Info } from 'lucide-react';

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onClearAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition"
        title="การแจ้งเตือนตารางสอน"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden text-white animate-fadeIn">
          <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-xs">การแจ้งเตือนตารางสอน</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-indigo-600 text-white text-[10px] rounded-full">
                  {unreadCount} ใหม่
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-[11px] text-slate-400 hover:text-red-400 transition flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>ล้างทั้งหมด</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800 text-xs">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-500">
                <Info className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>ยังไม่มีการแจ้งเตือนตารางสอน</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onMarkAsRead(notif.id)}
                  className={`p-3.5 transition cursor-pointer flex items-start gap-3 hover:bg-slate-800/50 ${
                    !notif.read ? 'bg-indigo-950/30 border-l-2 border-indigo-500' : 'opacity-70'
                  }`}
                >
                  <div className={`p-2 rounded-xl mt-0.5 ${!notif.read ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-white">{notif.title}</p>
                      <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                    </div>
                    <p className="text-slate-300 leading-snug">{notif.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
