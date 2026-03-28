const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  // Kaunsa customer book kar raha hai
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Kaunsa provider service dega
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
    required: true // Udaharan: "Ceiling fan installation"
  },
  address: {
    type: String,
    required: true // Bhopal ka specific area
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
    type: String, // Hum string rakhenge "2026-03-30" format ke liye
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);