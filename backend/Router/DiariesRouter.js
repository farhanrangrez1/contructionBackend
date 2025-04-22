const express = require('express');
const { DiariesCreate } = require('../Controller/DiariesController');

const router = express.Router();

router.post('/',DiariesCreate);



module.exports = router;