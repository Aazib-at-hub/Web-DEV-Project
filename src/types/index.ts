export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher';
  token?: string;
}

export interface Department {
  _id: string;
  name: string;
  description: string;
}

export interface Class {
  _id: string;
  name: string;
  departmentId: string;
  teacherId: string;
  departmentName?: string;
  teacherName?: string;
}

export interface Student {
  _id: string;
  name: string;
  rollNumber: string;
  email: string;
  classId: string;
  className?: string;
}

export interface Course {
  _id: string;
  name: string;
  description: string;
}

export interface AttendanceRecord {
  studentId: string;
  studentName?: string;
  rollNumber?: string;
  status: 'present' | 'absent' | 'late';
}

export interface Attendance {
  _id: string;
  classId: string;
  date: string;
  records: AttendanceRecord[];
}

export interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}
