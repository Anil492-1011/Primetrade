const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/authMiddleware');
const { createUser, getProfile, updateProfile } = require('../Controllers/userController');

router.post('/createUser', createUser);
router.get('/profile', authenticate, getProfile);
// Update profile for authenticated user
router.put('/update', authenticate, updateProfile);

module.exports = router;

 