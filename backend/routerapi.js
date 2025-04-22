const express = require('express');


const routerapi = express.Router()

// THEN your routers
// Projects
routerapi.use('/api/projects', require('./Router/projectsRouter'));
// Diaries
routerapi.use('/api/diaries', require('./Router/DiariesRouter'));
// TimeSheet 
routerapi.use('/api/timesheet', require('./Router/TimeSheetRouter'));
module.exports = routerapi