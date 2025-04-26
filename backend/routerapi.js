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
//ITPs
routerapi.use('/api/itps', require('./Router/ITPsRouter'));
// induction
routerapi.use('/api/induction', require('./Router/inductionRouter'));

routerapi.use('/api/incident', require('./Router/incidentRouter'));

routerapi.use('/api/siteEntry', require('./Router/siteEntryRouter'));

routerapi.use('/api/siteReview', require('./Router/siteReviewRouter'));

routerapi.use('/api/data', require('./Router/dataRouter'));

routerapi.use('/api/audit', require('./Router/auditRouter'));

routerapi.use('/api/safety', require('./Router/safetyRouter'));

routerapi.use('/api/chat', require('./Router/chatRouter'));

routerapi.use('/api/announement', require('./Router/announcementRouter'));

routerapi.use('/api/rfi', require('./Router/rfiRouter'));

routerapi.use('/api/rfiDashboard', require('./Router/rfiDashboardRouter'));

routerapi.use('/api/toolbox', require('./Router/toolboxRouter'));

routerapi.use('/api/annotation', require('./Router/annotationRouter'));


module.exports = routerapi