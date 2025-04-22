const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  res.send('Diaries Router');
});



module.exports = router;