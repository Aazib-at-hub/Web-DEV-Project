const express = require('express');
const router = express.Router();
const { getClasses, getClassesByTeacher, createClass, updateClass, deleteClass } = require('../controllers/classController');
const { protect, admin, teacher } = require('../middleware/authMiddleware');

router.get('/', getClasses);
router.get('/teacher/:teacherId', protect, teacher, getClassesByTeacher);
router.post('/', protect, admin, createClass);
router.put('/:id', protect, admin, updateClass);
router.delete('/:id', protect, admin, deleteClass);

module.exports = router;
