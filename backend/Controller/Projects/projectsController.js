const Projects = require('../../Model/Projects/projectsModel');
const asyncHandler = require("express-async-handler");

const ProjectsCreate = asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body);

    const { name, assignedTo, startDate, endDate, status, priority, description } = req.body;

    if (!name || !assignedTo || !startDate || !endDate || !status || !priority || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = await Projects.create({
        name,
        assignedTo,
        startDate,
        endDate,
        status,
        priority,
        description
    });

    res.status(201).json( newProject );
});

module.exports = { ProjectsCreate };
