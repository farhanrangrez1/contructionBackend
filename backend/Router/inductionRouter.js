const express = require('express');
const { InductionCreate } = require('../Controller/InductionController');

const router = express.Router();

router.post('/',InductionCreate);

// router.get('/',AllDiaries)

// router.get('/:id',SingleDiaries)

// router.delete('/:id',deleteDiaries)

// router.put('/:id',UpdateDiaries)

module.exports = router;