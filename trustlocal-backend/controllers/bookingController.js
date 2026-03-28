const Booking = require('../models/Booking');

// 1. Nayi Booking Create Karna (Customer side se)
exports.createBooking = async (req, res) => {
  try {
    const { providerId, serviceCategory, serviceDetails, address, price, scheduledDate } = req.body;

    const newBooking = new Booking({
      customer: req.user.id, // Ye Auth Middleware se aayega
      provider: providerId,
      serviceCategory,
      serviceDetails,
      address,
      price,
      scheduledDate
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking Request Sent! 🚀", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Booking Error", error: error.message });
  }
};

// 2. Provider apni bookings dekhega
exports.getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.user.id }).populate('customer', 'name email');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};