import { User, Department, Class, Student, Course, Attendance, ContactSubmission } from '@/types';

export const mockUsers: (User & { password: string })[] = [
  { _id: 'u1', name: 'Admin User', email: 'admin@college.edu', password: 'admin123', role: 'admin' },
  { _id: 'u2', name: 'Dr. Sarah Johnson', email: 'sarah@college.edu', password: 'teacher123', role: 'teacher' },
  { _id: 'u3', name: 'Prof. James Smith', email: 'james@college.edu', password: 'teacher123', role: 'teacher' },
  { _id: 'u4', name: 'Dr. Emily Davis', email: 'emily@college.edu', password: 'teacher123', role: 'teacher' },
];

export const mockDepartments: Department[] = [
  { _id: 'd1', name: 'Computer Science', description: 'Explore cutting-edge computing, AI, and software engineering with hands-on projects and research opportunities.' },
  { _id: 'd2', name: 'Mathematics', description: 'Build a strong analytical foundation in pure and applied mathematics, statistics, and computational methods.' },
  { _id: 'd3', name: 'Physics', description: 'Discover the fundamental laws of nature through rigorous theoretical and experimental physics programs.' },
  { _id: 'd4', name: 'English Literature', description: 'Develop critical thinking and communication skills through the study of classic and contemporary literature.' },
];

export const mockClasses: Class[] = [
  { _id: 'c1', name: 'CS-101: Intro to Programming', departmentId: 'd1', teacherId: 'u2' },
  { _id: 'c2', name: 'CS-201: Data Structures', departmentId: 'd1', teacherId: 'u2' },
  { _id: 'c3', name: 'MATH-101: Calculus I', departmentId: 'd2', teacherId: 'u3' },
  { _id: 'c4', name: 'MATH-201: Linear Algebra', departmentId: 'd2', teacherId: 'u3' },
  { _id: 'c5', name: 'PHY-101: Mechanics', departmentId: 'd3', teacherId: 'u4' },
  { _id: 'c6', name: 'ENG-101: British Literature', departmentId: 'd4', teacherId: 'u4' },
];

const studentNames = [
  'Alice Morgan', 'Bob Chen', 'Clara Williams', 'David Park', 'Eva Martinez',
  'Frank Lee', 'Grace Kim', 'Henry Brown', 'Iris Patel', 'Jack Thompson',
  'Katie O\'Brien', 'Liam Nguyen', 'Mia Jackson', 'Noah Garcia', 'Olivia Wilson',
  'Peter Zhang', 'Quinn Anderson', 'Rachel Davis', 'Sam Thomas', 'Tina White',
  'Uma Sharma', 'Victor Cruz', 'Wendy Liu', 'Xavier Hall', 'Yara Singh',
  'Zack Taylor', 'Amy Robinson', 'Ben Foster', 'Chloe Scott', 'Dan Murphy',
  'Emma Ross', 'Finn Cooper', 'Gina Reed', 'Hugo Bell', 'Isla Cook',
  'Jake Rivera', 'Kelly Ward', 'Leo Brooks', 'Maya Torres', 'Nate Bailey',
  'Olive Flores', 'Paul Gomez', 'Ruby Sanders', 'Sean Price', 'Tara Long',
  'Uri Patterson', 'Vera Hughes', 'Will Powell', 'Xena Butler', 'Yuki Barnes',
  'Zara Fisher', 'Adam Grant', 'Bella Stone', 'Carl Dunn', 'Diana Fox',
  'Evan Nash', 'Faye Webb', 'Glen Hart', 'Hope Hale', 'Ivan Pope',
];

export const mockStudents: Student[] = mockClasses.flatMap((cls, ci) =>
  Array.from({ length: 10 }, (_, si) => {
    const idx = ci * 10 + si;
    return {
      _id: `s${idx + 1}`,
      name: studentNames[idx] || `Student ${idx + 1}`,
      rollNumber: `${cls.name.split(':')[0].replace('-', '')}-${String(si + 1).padStart(3, '0')}`,
      email: `${studentNames[idx]?.split(' ')[0]?.toLowerCase() || 'student' + idx}@student.college.edu`,
      classId: cls._id,
    };
  })
);

export const mockCourses: Course[] = [
  { _id: 'co1', name: 'Introduction to Computer Science', description: 'Fundamental concepts of computing, programming basics, and problem-solving techniques.' },
  { _id: 'co2', name: 'Advanced Mathematics', description: 'In-depth study of calculus, differential equations, and mathematical proofs.' },
  { _id: 'co3', name: 'Classical Mechanics', description: 'Newton\'s laws, energy, momentum, and rotational dynamics with lab sessions.' },
  { _id: 'co4', name: 'World Literature', description: 'Survey of major literary works from diverse cultures and time periods.' },
  { _id: 'co5', name: 'Data Science & Analytics', description: 'Modern data analysis techniques, machine learning basics, and statistical modeling.' },
  { _id: 'co6', name: 'Artificial Intelligence', description: 'Core AI concepts including search, logic, neural networks, and natural language processing.' },
];

const today = new Date();
export const mockAttendance: Attendance[] = Array.from({ length: 5 }, (_, dayIdx) => {
  const date = new Date(today);
  date.setDate(date.getDate() - dayIdx);
  const dateStr = date.toISOString().split('T')[0];

  return mockClasses.map(cls => {
    const classStudents = mockStudents.filter(s => s.classId === cls._id);
    return {
      _id: `att-${cls._id}-${dateStr}`,
      classId: cls._id,
      date: dateStr,
      records: classStudents.map(s => ({
        studentId: s._id,
        status: (['present', 'present', 'present', 'absent', 'late'] as const)[Math.floor(Math.random() * 5)],
      })),
    };
  });
}).flat();

export const mockContactSubmissions: ContactSubmission[] = [
  { _id: 'cs1', name: 'John Doe', email: 'john@example.com', message: 'I would like information about admissions for the CS department.', createdAt: '2026-03-28T10:00:00Z' },
  { _id: 'cs2', name: 'Jane Smith', email: 'jane@example.com', message: 'Can you share the course schedule for next semester?', createdAt: '2026-04-01T14:30:00Z' },
];
