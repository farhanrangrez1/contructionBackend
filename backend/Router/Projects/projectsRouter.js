const express=require('express');
const { ProjectsCreate } = require('../../Controller/Projects/projectsController');

const router = express.Router()

router.post('/',ProjectsCreate)


module.exports = router 
