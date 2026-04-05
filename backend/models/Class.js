const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
    name: { type: String, required: true },
    departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Class', classSchema);
