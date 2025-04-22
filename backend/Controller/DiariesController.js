const asyncHandler = require("express-async-handler");
const Projects = require("../Models/DiariesModel");


const DiariesCreate=asyncHandler(async(req, res) => {
    console.log("Request Body:", req.body);
  
    const { date, projectName, supervisorName, weather, workPerformed, issuesDelays } = req.body;

    if (!date || !projectName || !supervisorName || !weather || !workPerformed || !issuesDelays ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = await Projects.create({
        name,
        assignedTo,
        startDate,
        endDate,
        status,
        priority,
        Progress,
        description
    });

    res.status(201).json( newProject );

    res.send('Diaries Router');
  })

  
  module.exports = {DiariesCreate}