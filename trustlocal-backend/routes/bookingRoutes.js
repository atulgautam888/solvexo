const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getUserBookings, 
  getProviderJobs, 
  updateJobStatus, 
  submitReview 
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/authMiddleware');

// Sabhi routes par authentication apply kiya
router.post('/create', authMiddleware, createBooking);
router.get('/my-bookings', authMiddleware, getUserBookings);
router.get('/my-jobs', authMiddleware, getProviderJobs);
router.put('/update-status', authMiddleware, updateJobStatus);
router.post('/review', authMiddleware, submitReview);

module.exports = router;