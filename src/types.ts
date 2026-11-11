export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  hoursPerWeek: number;
  department: string;
  requiredRoomType: 'lecture' | 'computer_lab' | 'workshop';
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  department: string;
  maxHoursPerDay: number;
  unavailableSlots: string[]; // format: "day-period" e.g., "Mon-1"
}

export interface Classroom {
  id: string;
  name: string;
  capacity: number;
  type: 'lecture' | 'computer_lab' | 'workshop';
  building: string;
}

export interface TimeSlot {
  day: 'จันทร์' | 'อังคาร' | 'พุธ' | 'พฤหัสบดี' | 'ศุกร์';
  period: number; // 1 to 8
  startTime: string;
  endTime: string;
}

export interface TimetableSlot {
  id: string;
  courseId: string;
  teacherId: string;
  classroomId: string;
  classGroup: string; // e.g. "ปวส.1/1 ดิจิทัล"
  day: 'จันทร์' | 'อังคาร' | 'พุธ' | 'พฤหัสบดี' | 'ศุกร์';
  period: number;
}

export interface ConflictWarning {
  id: string;
  type: 'teacher_double_booked' | 'room_double_booked' | 'exceed_max_hours';
  message: string;
  details: string;
}

export interface Notification {
  id: string;
  teacherId: string; // or target user id / 'all'
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
