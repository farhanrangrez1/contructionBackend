const express = require('express');

const authController = require('../Controller/auth.controller');

const router = express.Router();

router.post('/login', authController.login);

module.exports = router