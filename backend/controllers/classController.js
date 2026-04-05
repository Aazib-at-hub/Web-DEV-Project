const Class = require('../models/Class');
const Department = require('../models/Department');
const User = require('../models/User');

const getClasses = async (req, res) => {
    const classes = await Class.find({})
        .populate('departmentId', 'name')
        .populate('teacherId', 'name');
    res.json(classes);
};

const getClassesByTeacher = async (req, res) => {
    const teacherId = req.user.role === 'admin' ? req.params.teacherId : req.user._id;
    const classes = await Class.find({ teacherId })
        .populate('departmentId', 'name');
    res.json(classes);
};

const createClass = async (req, res) => {
    const { name, departmentId, teacherId } = req.body;
    const cls = new Class({ name, departmentId, teacherId });
    const createdClass = await cls.save();
    res.status(201).json(createdClass);
};

const updateClass = async (req, res) => {
    const { name, departmentId, teacherId } = req.body;
    const cls = await Class.findById(req.params.id);

    if (cls) {
        cls.name = name || cls.name;
        cls.departmentId = departmentId || cls.departmentId;
        cls.teacherId = teacherId || cls.teacherId;
        const updatedClass = await cls.save();
        res.json(updatedClass);
    } else {
        res.status(404);
        throw new Error('Class not found');
    }
};

const deleteClass = async (req, res) => {
    const cls = await Class.findById(req.params.id);
    if (cls) {
        await Class.deleteOne({ _id: req.params.id });
        res.json({ message: 'Class removed' });
    } else {
        res.status(404);
        throw new Error('Class not found');
    }
};

module.exports = { getClasses, getClassesByTeacher, createClass, updateClass, deleteClass };
