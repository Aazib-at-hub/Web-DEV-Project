const Attendance = require('../models/Attendance');

const getAttendance = async (req, res) => {
    const { classId, date } = req.query;
    const query = {};
    if (classId) query.classId = classId;
    if (date) query.date = date;

    const attendance = await Attendance.find(query)
        .populate('classId', 'name')
        .populate({
            path: 'records.studentId',
            select: 'name rollNumber'
        });
    res.json(attendance);
};

const getAttendanceByClass = async (req, res) => {
    const attendance = await Attendance.find({ classId: req.params.classId })
        .populate({
            path: 'records.studentId',
            select: 'name rollNumber'
        });
    res.json(attendance);
};

const saveAttendance = async (req, res) => {
    const { classId, date, records } = req.body;

    const existingAttendance = await Attendance.findOne({ classId, date });

    if (existingAttendance) {
        existingAttendance.records = records;
        const updatedAttendance = await existingAttendance.save();
        res.json(updatedAttendance);
    } else {
        const attendance = new Attendance({ classId, date, records });
        const createdAttendance = await attendance.save();
        res.status(201).json(createdAttendance);
    }
};

const getAttendanceHistory = async (req, res) => {
    const attendance = await Attendance.find({})
        .populate('classId', 'name')
        .populate({
            path: 'records.studentId',
            select: 'name rollNumber'
        })
        .sort({ date: -1 });
    res.json(attendance);
};

module.exports = { getAttendance, getAttendanceByClass, saveAttendance, getAttendanceHistory };
