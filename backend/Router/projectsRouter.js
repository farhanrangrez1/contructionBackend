const express=require('express');
const { ProjectsCreate, Allprojects, deleteprojects, projectsUpdate, projectsSingle } = require('../Controller/projectsController');

const router = express.Router()

router.post('/',ProjectsCreate)

router.get('/',Allprojects)

router.get('/:id',projectsSingle)

router.delete('/:id',deleteprojects)

router.put('/:id',projectsUpdate)

module.exports = router 
