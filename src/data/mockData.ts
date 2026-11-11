import { Course, Teacher, Classroom, TimeSlot, TimetableSlot } from '../types';

export const INITIAL_COURSES: Course[] = [
  { id: 'c1', code: 'ICT-DRMC-384B', name: 'ตรวจสอบคุณภาพข้อมูล (Data Quality Control)', credits: 3, hoursPerWeek: 3, department: 'เทคโนโลยีธุรกิจดิจิทัล', requiredRoomType: 'computer_lab' },
  { id: 'c2', code: 'ICT-XQDI-385B', name: 'ออกแบบความปลอดภัยในการใช้ข้อมูล (Data Security)', credits: 3, hoursPerWeek: 3, department: 'เทคโนโลยีธุรกิจดิจิทัล', requiredRoomType: 'computer_lab' },
  { id: 'c3', code: 'ICT-CWYH-388B', name: 'เลือกข้อมูลที่ไม่มีโครงสร้าง (Unstructured Data)', credits: 3, hoursPerWeek: 4, department: 'เทคโนโลยีธุรกิจดิจิทัล', requiredRoomType: 'computer_lab' },
  { id: 'c4', code: 'ICT-SDKJ-389B', name: 'แปลงข้อมูลที่ไม่มีโครงสร้าง (Data Transformation)', credits: 3, hoursPerWeek: 4, department: 'เทคโนโลยีธุรกิจดิจิทัล', requiredRoomType: 'computer_lab' },
  { id: 'c5', code: 'ICT-LYRA-391B', name: 'สร้างการนำเสนอข้อมูล (Data Presentation & BI)', credits: 3, hoursPerWeek: 3, department: 'เทคโนโลยีธุรกิจดิจิทัล', requiredRoomType: 'computer_lab' },
  { id: 'c6', code: 'AI-GEN-201', name: 'ปัญญาประดิษฐ์เบื้องต้นและการประยุกต์ใช้งาน', credits: 3, hoursPerWeek: 3, department: 'เทคโนโลยีปัญญาประดิษฐ์', requiredRoomType: 'computer_lab' },
  { id: 'c7', code: 'DIGI-BIZ-101', name: 'ระบบสารสนเทศเพื่อธุรกิจดิจิทัล', credits: 3, hoursPerWeek: 3, department: 'เทคโนโลยีธุรกิจดิจิทัล', requiredRoomType: 'lecture' },
  { id: 'c8', code: 'PROG-PY-102', name: 'การเขียนโปรแกรมคอมพิวเตอร์ด้วย Python', credits: 3, hoursPerWeek: 4, department: 'เทคโนโลยีธุรกิจดิจิทัล', requiredRoomType: 'computer_lab' },
];

export const INITIAL_TEACHERS: Teacher[] = [
  { id: 't1', name: 'ดร. นนทกานต์ วงษ์แก้ว', email: 'nontakarn@ktech.ac.th', department: 'เทคโนโลยีธุรกิจดิจิทัล', maxHoursPerDay: 6, unavailableSlots: ['Wed-5', 'Wed-6'] },
  { id: 't2', name: 'อาจารย์ สมชาย ใจดี', email: 'somchai@ktech.ac.th', department: 'เทคโนโลยีธุรกิจดิจิทัล', maxHoursPerDay: 6, unavailableSlots: ['Mon-1'] },
  { id: 't3', name: 'อาจารย์ วิชุดา รักเรียน', email: 'wichuda@ktech.ac.th', department: 'เทคโนโลยีธุรกิจดิจิทัล', maxHoursPerDay: 5, unavailableSlots: ['Fri-7', 'Fri-8'] },
  { id: 't4', name: 'อาจารย์ ภาณุพงศ์ เทคโนโลยี', email: 'phanupong@ktech.ac.th', department: 'เทคโนโลยีปัญญาประดิษฐ์', maxHoursPerDay: 6, unavailableSlots: ['Tue-3'] },
];

export const INITIAL_CLASSROOMS: Classroom[] = [
  { id: 'r1', name: 'ห้องปฏิบัติการ AI & Data 1', capacity: 40, type: 'computer_lab', building: 'อาคารปฏิบัติการดิจิทัล ชั้น 3' },
  { id: 'r2', name: 'ห้องปฏิบัติการคอมพิวเตอร์ 2', capacity: 45, type: 'computer_lab', building: 'อาคารปฏิบัติการดิจิทัล ชั้น 3' },
  { id: 'r3', name: 'ห้องเรียนทฤษฎี 301', capacity: 50, type: 'lecture', building: 'อาคารอำนวยการ ชั้น 3' },
  { id: 'r4', name: 'ห้องประชุมอัจฉริยะ', capacity: 80, type: 'workshop', building: 'อาคารวิทยบริการ' },
];

export const TIME_SLOTS: TimeSlot[] = [
  // Day 1: จันทร์
  { day: 'จันทร์', period: 1, startTime: '08:30', endTime: '09:20' },
  { day: 'จันทร์', period: 2, startTime: '09:20', endTime: '10:10' },
  { day: 'จันทร์', period: 3, startTime: '10:20', endTime: '11:10' },
  { day: 'จันทร์', period: 4, startTime: '11:10', endTime: '12:00' },
  { day: 'จันทร์', period: 5, startTime: '13:00', endTime: '13:50' },
  { day: 'จันทร์', period: 6, startTime: '13:50', endTime: '14:40' },
  { day: 'จันทร์', period: 7, startTime: '14:50', endTime: '15:40' },
  { day: 'จันทร์', period: 8, startTime: '15:40', endTime: '16:30' },

  // Day 2: อังคาร
  { day: 'อังคาร', period: 1, startTime: '08:30', endTime: '09:20' },
  { day: 'อังคาร', period: 2, startTime: '09:20', endTime: '10:10' },
  { day: 'อังคาร', period: 3, startTime: '10:20', endTime: '11:10' },
  { day: 'อังคาร', period: 4, startTime: '11:10', endTime: '12:00' },
  { day: 'อังคาร', period: 5, startTime: '13:00', endTime: '13:50' },
  { day: 'อังคาร', period: 6, startTime: '13:50', endTime: '14:40' },
  { day: 'อังคาร', period: 7, startTime: '14:50', endTime: '15:40' },
  { day: 'อังคาร', period: 8, startTime: '15:40', endTime: '16:30' },

  // Day 3: พุธ
  { day: 'พุธ', period: 1, startTime: '08:30', endTime: '09:20' },
  { day: 'พุธ', period: 2, startTime: '09:20', endTime: '10:10' },
  { day: 'พุธ', period: 3, startTime: '10:20', endTime: '11:10' },
  { day: 'พุธ', period: 4, startTime: '11:10', endTime: '12:00' },
  { day: 'พุธ', period: 5, startTime: '13:00', endTime: '13:50' },
  { day: 'พุธ', period: 6, startTime: '13:50', endTime: '14:40' },
  { day: 'พุธ', period: 7, startTime: '14:50', endTime: '15:40' },
  { day: 'พุธ', period: 8, startTime: '15:40', endTime: '16:30' },

  // Day 4: พฤหัสบดี
  { day: 'พฤหัสบดี', period: 1, startTime: '08:30', endTime: '09:20' },
  { day: 'พฤหัสบดี', period: 2, startTime: '09:20', endTime: '10:10' },
  { day: 'พฤหัสบดี', period: 3, startTime: '10:20', endTime: '11:10' },
  { day: 'พฤหัสบดี', period: 4, startTime: '11:10', endTime: '12:00' },
  { day: 'พฤหัสบดี', period: 5, startTime: '13:00', endTime: '13:50' },
  { day: 'พฤหัสบดี', period: 6, startTime: '13:50', endTime: '14:40' },
  { day: 'พฤหัสบดี', period: 7, startTime: '14:50', endTime: '15:40' },
  { day: 'พฤหัสบดี', period: 8, startTime: '15:40', endTime: '16:30' },

  // Day 5: ศุกร์
  { day: 'ศุกร์', period: 1, startTime: '08:30', endTime: '09:20' },
  { day: 'ศุกร์', period: 2, startTime: '09:20', endTime: '10:10' },
  { day: 'ศุกร์', period: 3, startTime: '10:20', endTime: '11:10' },
  { day: 'ศุกร์', period: 4, startTime: '11:10', endTime: '12:00' },
  { day: 'ศุกร์', period: 5, startTime: '13:00', endTime: '13:50' },
  { day: 'ศุกร์', period: 6, startTime: '13:50', endTime: '14:40' },
  { day: 'ศุกร์', period: 7, startTime: '14:50', endTime: '15:40' },
  { day: 'ศุกร์', period: 8, startTime: '15:40', endTime: '16:30' },
];

export const INITIAL_TIMETABLE: TimetableSlot[] = [
  { id: 'ts1', courseId: 'c1', teacherId: 't1', classroomId: 'r1', classGroup: 'ปวส.1/1 ดิจิทัล', day: 'จันทร์', period: 1 },
  { id: 'ts2', courseId: 'c1', teacherId: 't1', classroomId: 'r1', classGroup: 'ปวส.1/1 ดิจิทัล', day: 'จันทร์', period: 2 },
  { id: 'ts3', courseId: 'c1', teacherId: 't1', classroomId: 'r1', classGroup: 'ปวส.1/1 ดิจิทัล', day: 'จันทร์', period: 3 },
  { id: 'ts4', courseId: 'c2', teacherId: 't2', classroomId: 'r2', classGroup: 'ปวส.1/1 ดิจิทัล', day: 'อังคาร', period: 1 },
  { id: 'ts5', courseId: 'c2', teacherId: 't2', classroomId: 'r2', classGroup: 'ปวส.1/1 ดิจิทัล', day: 'อังคาร', period: 2 },
  { id: 'ts6', courseId: 'c2', teacherId: 't2', classroomId: 'r2', classGroup: 'ปวส.1/1 ดิจิทัล', day: 'อังคาร', period: 3 },
  { id: 'ts7', courseId: 'c6', teacherId: 't4', classroomId: 'r1', classGroup: 'ปวส.1/2 AI', day: 'พุธ', period: 1 },
  { id: 'ts8', courseId: 'c6', teacherId: 't4', classroomId: 'r1', classGroup: 'ปวส.1/2 AI', day: 'พุธ', period: 2 },
  { id: 'ts9', courseId: 'c6', teacherId: 't4', classroomId: 'r1', classGroup: 'ปวส.1/2 AI', day: 'พุธ', period: 3 },
  { id: 'ts10', courseId: 'c7', teacherId: 't3', classroomId: 'r3', classGroup: 'ปวส.1/1 ดิจิทัล', day: 'พฤหัสบดี', period: 1 },
  { id: 'ts11', courseId: 'c7', teacherId: 't3', classroomId: 'r3', classGroup: 'ปวส.1/1 ดิจิทัล', day: 'พฤหัสบดี', period: 2 },
  { id: 'ts12', courseId: 'c7', teacherId: 't3', classroomId: 'r3', classGroup: 'ปวส.1/1 ดิจิทัล', day: 'พฤหัสบดี', period: 3 },
  { id: 'ts13', courseId: 'c8', teacherId: 't1', classroomId: 'r2', classGroup: 'ปวส.1/2 AI', day: 'ศุกร์', period: 1 },
  { id: 'ts14', courseId: 'c8', teacherId: 't1', classroomId: 'r2', classGroup: 'ปวส.1/2 AI', day: 'ศุกร์', period: 2 },
  { id: 'ts15', courseId: 'c8', teacherId: 't1', classroomId: 'r2', classGroup: 'ปวส.1/2 AI', day: 'ศุกร์', period: 3 },
];
