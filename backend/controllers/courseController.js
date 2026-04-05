const Course = require('../models/Course');

const getCourses = async (req, res) => {
    const courses = await Course.find({});
    res.json(courses);
};

const createCourse = async (req, res) => {
    const { name, description } = req.body;
    const course = new Course({ name, description });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
};

const updateCourse = async (req, res) => {
    const { name, description } = req.body;
    const course = await Course.findById(req.params.id);

    if (course) {
        course.name = name || course.name;
        course.description = description || course.description;
        const updatedCourse = await course.save();
        res.json(updatedCourse);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
};

const deleteCourse = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (course) {
        await Course.deleteOne({ _id: req.params.id });
        res.json({ message: 'Course removed' });
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
};

module.exports = { getCourses, createCourse, updateCourse, deleteCourse };
