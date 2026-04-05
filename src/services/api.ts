// API Service Layer - Integrated with real Express backend
import { User, Department, Class, Student, Course, Attendance, ContactSubmission } from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
    const stored = localStorage.getItem('cms_user');
    const user = stored ? JSON.parse(stored) : null;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (user?.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
    }
    return headers;
};

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Something went wrong' }));
        throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
};

// ---- Auth ----
export const authApi = {
    login: async (email: string, password: string): Promise<User> => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        return handleResponse(response);
    },
};

// ---- Departments ----
export const departmentApi = {
    getAll: async (): Promise<Department[]> => {
        const response = await fetch(`${BASE_URL}/departments`, { headers: getHeaders() });
        return handleResponse(response);
    },
    create: async (data: Omit<Department, '_id'>): Promise<Department> => {
        const response = await fetch(`${BASE_URL}/departments`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    update: async (id: string, data: Partial<Department>): Promise<Department> => {
        const response = await fetch(`${BASE_URL}/departments/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/departments/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
};

// ---- Classes ----
export const classApi = {
    getAll: async (): Promise<Class[]> => {
        const response = await fetch(`${BASE_URL}/classes`, { headers: getHeaders() });
        const data = await handleResponse(response);
        return data.map((c: any) => ({
            ...c,
            departmentName: c.departmentId?.name,
            teacherName: c.teacherId?.name,
        }));
    },
    getByDepartment: async (deptId: string): Promise<Class[]> => {
        const classes = await classApi.getAll();
        return classes.filter(c => (c as any).departmentId?._id === deptId || c.departmentId === deptId);
    },
    getByTeacher: async (teacherId: string): Promise<Class[]> => {
        const response = await fetch(`${BASE_URL}/classes/teacher/${teacherId}`, { headers: getHeaders() });
        const data = await handleResponse(response);
        return data.map((c: any) => ({
            ...c,
            departmentName: c.departmentId?.name,
        }));
    },
    create: async (data: Omit<Class, '_id'>): Promise<Class> => {
        const response = await fetch(`${BASE_URL}/classes`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    update: async (id: string, data: Partial<Class>): Promise<Class> => {
        const response = await fetch(`${BASE_URL}/classes/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/classes/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
};

// ---- Students ----
export const studentApi = {
    getAll: async (): Promise<Student[]> => {
        const response = await fetch(`${BASE_URL}/students`, { headers: getHeaders() });
        const data = await handleResponse(response);
        return data.map((s: any) => ({
            ...s,
            className: s.classId?.name,
        }));
    },
    getByClass: async (classId: string): Promise<Student[]> => {
        const response = await fetch(`${BASE_URL}/students/class/${classId}`, { headers: getHeaders() });
        return handleResponse(response);
    },
    create: async (data: Omit<Student, '_id'>): Promise<Student> => {
        const response = await fetch(`${BASE_URL}/students`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    update: async (id: string, data: Partial<Student>): Promise<Student> => {
        const response = await fetch(`${BASE_URL}/students/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/students/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
};

// ---- Courses ----
export const courseApi = {
    getAll: async (): Promise<Course[]> => {
        const response = await fetch(`${BASE_URL}/courses`, { headers: getHeaders() });
        return handleResponse(response);
    },
    create: async (data: Omit<Course, '_id'>): Promise<Course> => {
        const response = await fetch(`${BASE_URL}/courses`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    update: async (id: string, data: Partial<Course>): Promise<Course> => {
        const response = await fetch(`${BASE_URL}/courses/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
    delete: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/courses/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },
};

// ---- Attendance ----
export const attendanceApi = {
    getByClass: async (classId: string): Promise<Attendance[]> => {
        const response = await fetch(`${BASE_URL}/attendance?classId=${classId}`, { headers: getHeaders() });
        const data = await handleResponse(response);
        return data.map((a: any) => ({
            ...a,
            records: a.records.map((r: any) => ({
                ...r,
                studentId: r.studentId?._id || r.studentId,
                studentName: r.studentId?.name,
                rollNumber: r.studentId?.rollNumber,
            })),
        }));
    },
    getAll: async (): Promise<Attendance[]> => {
        const response = await fetch(`${BASE_URL}/attendance`, { headers: getHeaders() });
        const data = await handleResponse(response);
        return data.map((a: any) => ({
            ...a,
            records: a.records.map((r: any) => ({
                ...r,
                studentId: r.studentId?._id || r.studentId,
                studentName: r.studentId?.name,
                rollNumber: r.studentId?.rollNumber,
            })),
        }));
    },
    save: async (data: Omit<Attendance, '_id'>): Promise<Attendance> => {
        const response = await fetch(`${BASE_URL}/attendance`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
};

// ---- Contact ----
export const contactApi = {
    getAll: async (): Promise<ContactSubmission[]> => {
        const response = await fetch(`${BASE_URL}/contact`, { headers: getHeaders() });
        return handleResponse(response);
    },
    submit: async (data: Omit<ContactSubmission, '_id' | 'createdAt'>): Promise<ContactSubmission> => {
        const response = await fetch(`${BASE_URL}/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },
};

// ---- Stats ----
export const statsApi = {
    getDashboardStats: async () => {
        const response = await fetch(`${BASE_URL}/stats/dashboard`, { headers: getHeaders() });
        return handleResponse(response);
    },
};

// Helper to get teachers list (for Admin Class form)
export const getTeachers = async (): Promise<User[]> => {
    // This is a bit of a hack since we don't have a specific GET /users endpoint in the requirements yet
    // But we can filter from all classes or similar, or better, add a route for it.
    // For now, let's assume we might need a GET /api/users/teachers route
    const response = await fetch(`${BASE_URL}/auth/teachers`, { headers: getHeaders() });
    try {
        return await handleResponse(response);
    } catch (e) {
        return [];
    }
};
