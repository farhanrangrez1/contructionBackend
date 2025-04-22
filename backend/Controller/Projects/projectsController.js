
const Projects = require('../../Model/Projects/projectsModel');

const ProjectsCreate = async(req, res) => {
const { projectName, assignedTo, startDate, endDate,status,priority,description } = req.body;

    if (!projectName || !assignedTo || !startDate || !endDate || !status || !priority || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = await Projects.create({  
        projectName,
        assignedTo,
        startDate,
        endDate,
        status,
        priority,
        description
    });
    res.status(201).json({ message: 'Project Created Successfully', project: newProject });
    res.send('Project Created Successfully');
    
}


module.exports = {ProjectsCreate}