const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const subController = require('../controllers/subscriptionController');
const adminAuth = require('../middleware/adminAuth');
const { loginLimiter } = require('../middleware/rateLimit');

router.post('/auth/validate', loginLimiter, authController.validate);
router.get('/stats', adminAuth, subController.getStats);

module.exports = router;