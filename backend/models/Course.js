const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
