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
// Equipment
routerapi.use('/api/equipment',require('./Router/PlantMachineryEquipmentRouter'))
//plantmachinery
routerapi.use('/api/plantmachinery', require('./Router/PlantMachineryRouter'));
// Calendar
routerapi.use('/api/calendar', require('./Router/CalendarRouter'));
// defectlists
routerapi.use('/api/defectlists', require('./Router/DefectListsRouter'));
// checklists
routerapi.use('/api/checklists', require('./Router/ChecklistsRouter'));
module.exports = routerapi