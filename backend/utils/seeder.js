require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Department = require('../models/Department');
const Class = require('../models/Class');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');
const Contact = require('../models/Contact');
const connectDB = require('../config/db');

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Department.deleteMany();
        await Class.deleteMany();
        await Student.deleteMany();
        await Course.deleteMany();
        await Attendance.deleteMany();
        await Contact.deleteMany();

        // 1. Create Users (Using .create to trigger password hashing)
        const teachersData = [
            { name: 'Admin User', email: 'admin@college.edu', password: 'admin123', role: 'admin' },
            { name: 'Dr. Sarah Johnson', email: 'sarah@college.edu', password: 'teacher123', role: 'teacher' },
            { name: 'Prof. James Smith', email: 'james@college.edu', password: 'teacher123', role: 'teacher' },
            { name: 'Dr. Emily Davis', email: 'emily@college.edu', password: 'teacher123', role: 'teacher' },
        ];

        let users = [];
        for (const u of teachersData) {
            const user = await User.create(u);
            users.push(user);
        }

        const adminUser = users[0]._id;
        const teacher1 = users[1]._id;
        const teacher2 = users[2]._id;
        const teacher3 = users[3]._id;

        // 2. Create Departments
        const departments = await Department.insertMany([
            { name: 'Computer Science', description: 'Explore cutting-edge computing, AI, and software engineering.' },
            { name: 'Mathematics', description: 'Build a strong analytical foundation in pure and applied mathematics.' },
            { name: 'Physics', description: 'Discover the fundamental laws of nature through experimental physics.' },
            { name: 'English Literature', description: 'Study of classic and contemporary literature.' },
        ]);

        const csDept = departments[0]._id;
        const mathDept = departments[1]._id;
        const phyDept = departments[2]._id;
        const engDept = departments[3]._id;

        // 3. Create Classes
        const classes = await Class.insertMany([
            { name: 'CS-101: Intro to Programming', departmentId: csDept, teacherId: teacher1 },
            { name: 'CS-201: Data Structures', departmentId: csDept, teacherId: teacher1 },
            { name: 'MATH-101: Calculus I', departmentId: mathDept, teacherId: teacher2 },
            { name: 'MATH-201: Linear Algebra', departmentId: mathDept, teacherId: teacher2 },
            { name: 'PHY-101: Mechanics', departmentId: phyDept, teacherId: teacher3 },
            { name: 'ENG-101: British Literature', departmentId: engDept, teacherId: teacher3 },
        ]);

        // 4. Create Students (10 per class)
        const studentNames = [
            'Alice Morgan', 'Bob Chen', 'Clara Williams', 'David Park', 'Eva Martinez',
            'Frank Lee', 'Grace Kim', 'Henry Brown', 'Iris Patel', 'Jack Thompson',
            'Katie OBrien', 'Liam Nguyen', 'Mia Jackson', 'Noah Garcia', 'Olivia Wilson',
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

        let studentDocs = [];
        classes.forEach((cls, ci) => {
            for (let si = 0; si < 10; si++) {
                const idx = ci * 10 + si;
                studentDocs.push({
                    name: studentNames[idx] || `Student ${idx + 1}`,
                    rollNumber: `${cls.name.split(':')[0].replace('-', '')}-${String(si + 1).padStart(3, '0')}`,
                    email: `${(studentNames[idx] || 'student').split(' ')[0].toLowerCase()}${idx}@college.edu`,
                    classId: cls._id
                });
            }
        });
        const createdStudents = await Student.insertMany(studentDocs);

        // 5. Create Courses
        await Course.insertMany([
            { name: 'Introduction to Computer Science', description: 'Fundamental concepts of computing and programming basics.' },
            { name: 'Advanced Mathematics', description: 'Calculus, differential equations, and mathematical proofs.' },
            { name: 'Classical Mechanics', description: 'Newton laws, energy, and rotational dynamics.' },
            { name: 'World Literature', description: 'Survey of major literary works from diverse cultures.' },
            { name: 'Data Science & Analytics', description: 'Modern data analysis and machine learning basics.' },
            { name: 'Artificial Intelligence', description: 'Core AI concepts including neural networks.' },
        ]);

        // 6. Create some Attendance records
        const today = new Date().toISOString().split('T')[0];
        let attendanceDocs = [];
        
        classes.forEach(cls => {
            const classStudents = createdStudents.filter(s => s.classId.toString() === cls._id.toString());
            attendanceDocs.push({
                classId: cls._id,
                date: today,
                records: classStudents.map((s, idx) => ({
                    studentId: s._id,
                    status: idx % 10 === 0 ? 'absent' : (idx % 7 === 0 ? 'late' : 'present')
                }))
            });
        });
        await Attendance.insertMany(attendanceDocs);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Department.deleteMany();
        await Class.deleteMany();
        await Student.deleteMany();
        await Course.deleteMany();
        await Attendance.deleteMany();
        await Contact.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
