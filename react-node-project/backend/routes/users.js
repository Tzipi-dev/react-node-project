const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController'); 
const authController = require('../controllers/authController'); 
const User = require('../models/User');
const { getAllUsers, deleteUser, updateUser, getUserById } = require('../controllers/user');

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

router.post('/', register, authController.registerUser);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);
router.get('/:id', getUserById);

module.exports = router;
