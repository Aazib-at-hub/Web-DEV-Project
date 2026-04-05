// API Service Layer - Replace mock implementations with real API calls to your Express backend
// Just change the BASE_URL and remove the mock logic

import { mockUsers, mockDepartments, mockClasses, mockStudents, mockCourses, mockAttendance, mockContactSubmissions } from '@/data/mockData';
import { User, Department, Class, Student, Course, Attendance, ContactSubmission } from '@/types';

// const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Simulate network delay
const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

// ---- Auth ----
export const authApi = {
  login: async (email: string, password: string): Promise<User> => {
    await delay();
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid email or password');
    const { password: _, ...userData } = user;
    return { ...userData, token: 'mock-jwt-token-' + user._id };
  },
};

// ---- Departments ----
let departments = [...mockDepartments];
export const departmentApi = {
  getAll: async (): Promise<Department[]> => { await delay(); return [...departments]; },
  create: async (data: Omit<Department, '_id'>): Promise<Department> => {
    await delay();
    const dept: Department = { ...data, _id: 'd' + Date.now() };
    departments.push(dept);
    return dept;
  },
  update: async (id: string, data: Partial<Department>): Promise<Department> => {
    await delay();
    const idx = departments.findIndex(d => d._id === id);
    if (idx === -1) throw new Error('Department not found');
    departments[idx] = { ...departments[idx], ...data };
    return departments[idx];
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    departments = departments.filter(d => d._id !== id);
  },
};

// ---- Classes ----
let classes = [...mockClasses];
export const classApi = {
  getAll: async (): Promise<Class[]> => {
    await delay();
    return classes.map(c => ({
      ...c,
      departmentName: departments.find(d => d._id === c.departmentId)?.name,
      teacherName: mockUsers.find(u => u._id === c.teacherId)?.name,
    }));
  },
  getByDepartment: async (deptId: string): Promise<Class[]> => {
    await delay();
    return classes.filter(c => c.departmentId === deptId).map(c => ({
      ...c,
      teacherName: mockUsers.find(u => u._id === c.teacherId)?.name,
    }));
  },
  getByTeacher: async (teacherId: string): Promise<Class[]> => {
    await delay();
    return classes.filter(c => c.teacherId === teacherId).map(c => ({
      ...c,
      departmentName: departments.find(d => d._id === c.departmentId)?.name,
    }));
  },
  create: async (data: Omit<Class, '_id'>): Promise<Class> => {
    await delay();
    const cls: Class = { ...data, _id: 'c' + Date.now() };
    classes.push(cls);
    return cls;
  },
  update: async (id: string, data: Partial<Class>): Promise<Class> => {
    await delay();
    const idx = classes.findIndex(c => c._id === id);
    if (idx === -1) throw new Error('Class not found');
    classes[idx] = { ...classes[idx], ...data };
    return classes[idx];
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    classes = classes.filter(c => c._id !== id);
  },
};

// ---- Students ----
let students = [...mockStudents];
export const studentApi = {
  getAll: async (): Promise<Student[]> => {
    await delay();
    return students.map(s => ({
      ...s,
      className: classes.find(c => c._id === s.classId)?.name,
    }));
  },
  getByClass: async (classId: string): Promise<Student[]> => {
    await delay();
    return students.filter(s => s.classId === classId);
  },
  create: async (data: Omit<Student, '_id'>): Promise<Student> => {
    await delay();
    const classStudents = students.filter(s => s.classId === data.classId);
    if (classStudents.length >= 10) throw new Error('Maximum 10 students per class');
    if (students.some(s => s.rollNumber === data.rollNumber)) throw new Error('Duplicate roll number');
    const student: Student = { ...data, _id: 's' + Date.now() };
    students.push(student);
    return student;
  },
  update: async (id: string, data: Partial<Student>): Promise<Student> => {
    await delay();
    const idx = students.findIndex(s => s._id === id);
    if (idx === -1) throw new Error('Student not found');
    if (data.rollNumber && data.rollNumber !== students[idx].rollNumber) {
      if (students.some(s => s.rollNumber === data.rollNumber)) throw new Error('Duplicate roll number');
    }
    students[idx] = { ...students[idx], ...data };
    return students[idx];
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    students = students.filter(s => s._id !== id);
  },
};

// ---- Courses ----
let courses = [...mockCourses];
export const courseApi = {
  getAll: async (): Promise<Course[]> => { await delay(); return [...courses]; },
  create: async (data: Omit<Course, '_id'>): Promise<Course> => {
    await delay();
    const course: Course = { ...data, _id: 'co' + Date.now() };
    courses.push(course);
    return course;
  },
  update: async (id: string, data: Partial<Course>): Promise<Course> => {
    await delay();
    const idx = courses.findIndex(c => c._id === id);
    if (idx === -1) throw new Error('Course not found');
    courses[idx] = { ...courses[idx], ...data };
    return courses[idx];
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    courses = courses.filter(c => c._id !== id);
  },
};

// ---- Attendance ----
let attendance = [...mockAttendance];
export const attendanceApi = {
  getByClass: async (classId: string): Promise<Attendance[]> => {
    await delay();
    return attendance.filter(a => a.classId === classId).map(a => ({
      ...a,
      records: a.records.map(r => ({
        ...r,
        studentName: students.find(s => s._id === r.studentId)?.name,
        rollNumber: students.find(s => s._id === r.studentId)?.rollNumber,
      })),
    }));
  },
  getAll: async (): Promise<Attendance[]> => {
    await delay();
    return attendance.map(a => ({
      ...a,
      records: a.records.map(r => ({
        ...r,
        studentName: students.find(s => s._id === r.studentId)?.name,
        rollNumber: students.find(s => s._id === r.studentId)?.rollNumber,
      })),
    }));
  },
  save: async (data: Omit<Attendance, '_id'>): Promise<Attendance> => {
    await delay();
    const existing = attendance.findIndex(a => a.classId === data.classId && a.date === data.date);
    const att: Attendance = { ...data, _id: existing >= 0 ? attendance[existing]._id : 'att-' + Date.now() };
    if (existing >= 0) {
      attendance[existing] = att;
    } else {
      attendance.push(att);
    }
    return att;
  },
};

// ---- Contact ----
let contactSubs = [...mockContactSubmissions];
export const contactApi = {
  getAll: async (): Promise<ContactSubmission[]> => { await delay(); return [...contactSubs]; },
  submit: async (data: Omit<ContactSubmission, '_id' | 'createdAt'>): Promise<ContactSubmission> => {
    await delay();
    const sub: ContactSubmission = { ...data, _id: 'cs' + Date.now(), createdAt: new Date().toISOString() };
    contactSubs.push(sub);
    return sub;
  },
};

// ---- Stats ----
export const statsApi = {
  getDashboardStats: async () => {
    await delay();
    const totalStudents = students.length;
    const totalClasses = classes.length;
    const totalDepartments = departments.length;
    const totalCourses = courses.length;
    const totalAttendance = attendance.length;
    const presentCount = attendance.reduce((sum, a) => sum + a.records.filter(r => r.status === 'present').length, 0);
    const totalRecords = attendance.reduce((sum, a) => sum + a.records.length, 0);
    const attendancePercentage = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;
    return { totalStudents, totalClasses, totalDepartments, totalCourses, totalAttendance, attendancePercentage };
  },
};

// Helper to get teachers list
export const getTeachers = () => mockUsers.filter(u => u.role === 'teacher').map(({ password: _, ...u }) => u);
