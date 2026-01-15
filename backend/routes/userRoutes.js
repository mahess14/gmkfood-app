const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); // Import controllers

router.post('/register', registerUser); // User Registration
router.post('/login', loginUser); // User Login

module.exports = router;
