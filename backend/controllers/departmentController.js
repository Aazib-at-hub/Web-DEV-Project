const Department = require('../models/Department');

const getDepartments = async (req, res) => {
    const departments = await Department.find({});
    res.json(departments);
};

const createDepartment = async (req, res) => {
    const { name, description } = req.body;
    const department = new Department({ name, description });
    const createdDepartment = await department.save();
    res.status(201).json(createdDepartment);
};

const updateDepartment = async (req, res) => {
    const { name, description } = req.body;
    const department = await Department.findById(req.params.id);

    if (department) {
        department.name = name || department.name;
        department.description = description || department.description;
        const updatedDepartment = await department.save();
        res.json(updatedDepartment);
    } else {
        res.status(404);
        throw new Error('Department not found');
    }
};

const deleteDepartment = async (req, res) => {
    const department = await Department.findById(req.params.id);
    if (department) {
        await Department.deleteOne({ _id: req.params.id });
        res.json({ message: 'Department removed' });
    } else {
        res.status(404);
        throw new Error('Department not found');
    }
};

module.exports = { getDepartments, createDepartment, updateDepartment, deleteDepartment };
