// Router/user.js
const express = require('express');
const userController = require('../Controller/user.controller');


const router = express.Router();

// Public routes


// TEMPORARY: Authentication middleware disabled to allow initial user creation
// router.use(authController.protect);

// Admin only routes
router.route('/')
  .get(
    // TEMPORARY: Admin restriction disabled for initial setup
    // authController.restrictTo('admin'), 
    userController.getAllUsers
  )
  .post(
    // TEMPORARY: Admin restriction disabled for initial setup
    // authController.restrictTo('admin'),
    userController.uploadUserPhoto,
    userController.createUser
  );

router.route('/:id')
  .get(
    // TEMPORARY: Admin restriction disabled for initial setup
    // authController.restrictTo('admin'),
    userController.getUser
  )
  .patch(
    // TEMPORARY: Admin restriction disabled for initial setup
    // authController.restrictTo('admin'),
    userController.uploadUserPhoto,
    userController.updateUser
  )
  .delete(
    // TEMPORARY: Admin restriction disabled for initial setup
    // authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = router;