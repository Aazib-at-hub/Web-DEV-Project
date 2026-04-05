const express = require('express');
const router = express.Router();
const { loginUser, getTeachers } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.get('/teachers', protect, admin, getTeachers);

module.exports = router;
