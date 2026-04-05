const Student = require('../models/Student');
const Class = require('../models/Class');
const Department = require('../models/Department');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');

const getDashboardStats = async (req, res) => {
    const totalStudents = await Student.countDocuments({});
    const totalClasses = await Class.countDocuments({});
    const totalDepartments = await Department.countDocuments({});
    const totalCourses = await Course.countDocuments({});
    const totalAttendanceDays = await Attendance.countDocuments({});

    const allAttendance = await Attendance.find({});
    let presentCount = 0;
    let totalRecords = 0;

    allAttendance.forEach((att) => {
        att.records.forEach((rec) => {
            if (rec.status === 'present') {
                presentCount++;
            }
            totalRecords++;
        });
    });

    const attendancePercentage = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

    res.json({
        totalStudents,
        totalClasses,
        totalDepartments,
        totalCourses,
        totalAttendance: totalAttendanceDays,
        attendancePercentage
    });
};

module.exports = { getDashboardStats };
