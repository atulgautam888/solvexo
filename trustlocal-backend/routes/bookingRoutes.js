const express = require('express');
const router = express.Router();
const { createBooking, getProviderBookings } = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/create', authMiddleware, createBooking);

router.get('/my-jobs', authMiddleware, getProviderBookings);

module.exports = router;