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
// Swms
routerapi.use('/api/swms', require('./Router/SwmsRouter'));

routerapi.use('/api/induction', require('./Router/inductionRouter'));

routerapi.use('/api/incident', require('./Router/incidentRouter'));

routerapi.use('/api/siteEntry', require('./Router/siteEntryRouter'));

routerapi.use('/api/siteReview', require('./Router/siteReviewRouter'));


module.exports = routerapi