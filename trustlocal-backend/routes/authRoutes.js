const express = require('express');
const router = express.Router();

const { register, login, getAllProviders, updateProfile, getProviderProfile, getTopRatedProviders, getProviderStats, sendOTP, verifyOTP, resetPassword } = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);
router.get('/providers', getAllProviders);
router.put('/update-profile', authMiddleware, updateProfile);
router.get('/provider/:id', getProviderProfile);
router.get('/top-providers', getTopRatedProviders);
router.get('/provider-stats', authMiddleware, getProviderStats);

module.exports = router;