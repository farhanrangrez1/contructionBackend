const express = require('express');


const aap = express.Router()

// THEN your routers
aap.use('/api/projects', require('./Router/Projects/projectsRouter'));

module.exports = aap