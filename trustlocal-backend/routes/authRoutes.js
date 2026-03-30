const express = require('express');
const router = express.Router();

const { register, login, getAllProviders, updateProfile, getProviderProfile, getTopRatedProviders } = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/providers', getAllProviders);
router.put('/update-profile', authMiddleware, updateProfile);
router.get('/provider/:id', getProviderProfile);
router.get('/top-providers', getTopRatedProviders);

module.exports = router;