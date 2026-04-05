const express = require('express');
const router = express.Router();
const { getAttendance, getAttendanceByClass, saveAttendance, getAttendanceHistory } = require('../controllers/attendanceController');
const { protect, teacher, admin } = require('../middleware/authMiddleware');

router.get('/', protect, teacher, getAttendance);
router.get('/class/:classId', protect, teacher, getAttendanceByClass);
router.post('/', protect, teacher, saveAttendance);
router.get('/history', protect, admin, getAttendanceHistory);

module.exports = router;
