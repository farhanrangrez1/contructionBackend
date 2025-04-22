const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Diaries Router');
});



module.exports = router;