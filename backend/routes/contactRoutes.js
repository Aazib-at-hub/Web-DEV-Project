const express = require('express');
const router = express.Router();
const { getSubmissions, createSubmission } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getSubmissions);
router.post('/', createSubmission);

module.exports = router;
