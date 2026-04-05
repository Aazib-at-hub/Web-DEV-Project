const Student = require('../models/Student');

const getStudents = async (req, res) => {
    const students = await Student.find({}).populate('classId', 'name');
    res.json(students);
};

const getStudentsByClass = async (req, res) => {
    const students = await Student.find({ classId: req.params.classId });
    res.json(students);
};

const createStudent = async (req, res) => {
    const { name, rollNumber, email, classId } = req.body;

    const classStudentsCount = await Student.countDocuments({ classId });
    if (classStudentsCount >= 10) {
        res.status(400);
        throw new Error('Maximum 10 students per class');
    }

    const studentExists = await Student.findOne({ rollNumber });
    if (studentExists) {
        res.status(400);
        throw new Error('Duplicate roll number');
    }

    const student = new Student({ name, rollNumber, email, classId });
    const createdStudent = await student.save();
    res.status(201).json(createdStudent);
};

const updateStudent = async (req, res) => {
    const { name, rollNumber, email, classId } = req.body;
    const student = await Student.findById(req.params.id);

    if (student) {
        if (rollNumber && rollNumber !== student.rollNumber) {
            const studentExists = await Student.findOne({ rollNumber });
            if (studentExists) {
                res.status(400);
                throw new Error('Duplicate roll number');
            }
        }
        student.name = name || student.name;
        student.rollNumber = rollNumber || student.rollNumber;
        student.email = email || student.email;
        student.classId = classId || student.classId;
        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
};

const deleteStudent = async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (student) {
        await Student.deleteOne({ _id: req.params.id });
        res.json({ message: 'Student removed' });
    } else {
        res.status(404);
        throw new Error('Student not found');
    }
};

module.exports = { getStudents, getStudentsByClass, createStudent, updateStudent, deleteStudent };
