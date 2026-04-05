const Contact = require('../models/Contact');

const getSubmissions = async (req, res) => {
    const submissions = await Contact.find({}).sort({ createdAt: -1 });
    res.json(submissions);
};

const createSubmission = async (req, res) => {
    const { name, email, message } = req.body;
    const submission = new Contact({ name, email, message });
    const createdSubmission = await submission.save();
    res.status(201).json(createdSubmission);
};

module.exports = { getSubmissions, createSubmission };
