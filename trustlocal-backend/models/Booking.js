const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceCategory: {
    type: String,
    required: true,
    enum: ["Electrician", "Plumber", "AC Repair", "Cleaning", "Painter", "Carpenter"]
  },
  serviceDetails: {
    type: String,
    required: true 
  },
  address: {
    type: String,
    required: true 
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledDate: {
    type: String, 
    required: true
  },
  // --- Naye Fields Ratings Ke Liye ---
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  review: {
    type: String,
    default: ""
  },
  isReviewed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);