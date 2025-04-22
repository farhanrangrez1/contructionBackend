const express = require('express');

const routerapi = express.Router()

const authRoutes = require('./Router/authRouter')
const userRoutes = require('./Router/user')

// THEN your routers
// Projects

// Auth 
routerapi.use('/api', authRoutes);
// User
routerapi.use('/api/users', userRoutes);
// projects
routerapi.use('/api/projects', require('./Router/projectsRouter'));
// Diaries
routerapi.use('/api/diaries', require('./Router/DiariesRouter'));
// TimeSheet 
routerapi.use('/api/timesheet', require('./Router/TimeSheetRouter'));


module.exports = routerapi