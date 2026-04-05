const express = require('express');
const router = express.Router();
const { getStudents, getStudentsByClass, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { protect, admin, teacher } = require('../middleware/authMiddleware');

router.get('/', getStudents);
router.get('/class/:classId', protect, teacher, getStudentsByClass);
router.post('/', protect, admin, createStudent);
router.put('/:id', protect, admin, updateStudent);
router.delete('/:id', protect, admin, deleteStudent);

module.exports = router;
