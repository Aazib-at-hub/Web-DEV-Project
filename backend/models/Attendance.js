const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    date: { type: String, required: true }, // Format YYYY-MM-DD
    records: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        status: { type: String, enum: ['present', 'absent', 'late'], required: true },
    }],
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
