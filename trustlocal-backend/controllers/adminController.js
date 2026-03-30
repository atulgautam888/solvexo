const User = require('../models/User');
const Booking = require('../models/Booking');

// 1. Dashboard Stats Fetch Karo (Revenue calculation ke saath)
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProviders = await User.countDocuments({ role: 'provider' });
    const totalBookings = await Booking.countDocuments();
    
    // Har booking par platform fee ₹50 maan kar revenue calculate kar rahe hain
    const revenue = totalBookings * 50;

    const recentBookings = await Booking.find()
      .populate('customer', 'name')
      .populate('provider', 'name')
      .limit(5)
      .sort({ createdAt: -1 });

    res.json({ 
      totalUsers, 
      totalProviders, 
      totalBookings, 
      revenue, // Dashboard revenue field ke liye
      recentBookings 
    });
  } catch (error) {
    res.status(500).json({ message: "Admin Fetch Error", error: error.message });
  }
};

// 2. Saare Users Fetch Karo
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// 3. Provider ko verify karo
exports.verifyProvider = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { isVerified: true }, 
      { new: true }
    );
    res.json({ message: "Provider Verified! ✅", user });
  } catch (error) {
    res.status(500).json({ message: "Verification Failed", error: error.message });
  }
};

// 4. User ko Delete karo
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete operation failed", error: error.message });
  }
};