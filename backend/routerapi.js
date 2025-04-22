const express = require('express');


const routerapi = express.Router()

// THEN your routers
routerapi.use('/api/projects', require('./Router/projectsRouter'));

routerapi.use('/api/diaries', require('./Router/DiariesRouter'));

module.exports = routerapi