const express = require('express');
const { ITPcCreate, UpdateITPc, SingleITPc, deleteITPc, AllITPc } = require('../Controller/ITPsController');

const router = express.Router();

router.post('/',ITPcCreate);

router.get('/',AllITPc)

router.get('/:id',SingleITPc)

router.delete('/:id',deleteITPc)

router.put('/:id',UpdateITPc)

module.exports = router;