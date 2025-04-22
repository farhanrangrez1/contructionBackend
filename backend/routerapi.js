const express = require('express');


const routerapi = express.Router()

// THEN your routers
routerapi.use('/api/projects', require('./Router/Projects/projectsRouter'));

module.exports = routerapi