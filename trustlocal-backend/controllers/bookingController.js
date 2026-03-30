const Booking = require('../models/Booking');

// 1. Nayi Booking Create Karna
exports.createBooking = async (req, res) => {
  try {
    const { providerId, serviceCategory, serviceDetails, address, price, scheduledDate } = req.body;
    const newBooking = new Booking({
      customer: req.user.id,
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

// 2. User apni saari bookings dekh sakega
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id })
      .populate('provider', 'name category image')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your bookings", error: error.message });
  }
};

// 3. Provider apni saari jobs dekhega (Ratings Stats ke saath)
exports.getProviderJobs = async (req, res) => {
  try {
    const jobs = await Booking.find({ provider: req.user.id })
      .populate('customer', 'name email image') 
      .sort({ createdAt: -1 });

    // Calculate Rating Stats
    const reviewedJobs = jobs.filter(j => j.isReviewed && j.rating);
    const totalRating = reviewedJobs.reduce((sum, job) => sum + job.rating, 0);
    const averageRating = reviewedJobs.length > 0 
      ? (totalRating / reviewedJobs.length).toFixed(1) 
      : "0.0";

    res.status(200).json({ 
      jobs, 
      stats: {
        averageRating,
        totalReviews: reviewedJobs.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};

// 4. Job Status Update
exports.updateJobStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    res.json({ message: `Job ${status} successfully!`, booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// 5. Review Submit Karna
exports.submitReview = async (req, res) => {
  try {
    const { bookingId, rating, review } = req.body;
    const booking = await Booking.findOne({ _id: bookingId, customer: req.user.id });

    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status !== 'completed') return res.status(400).json({ message: "Only completed jobs can be reviewed" });
    if (booking.isReviewed) return res.status(400).json({ message: "Already reviewed" });

    booking.rating = rating;
    booking.review = review;
    booking.isReviewed = true;
    await booking.save();

    res.status(200).json({ message: "Review submitted! ⭐", booking });
  } catch (error) {
    res.status(500).json({ message: "Review submission failed", error: error.message });
  }
};