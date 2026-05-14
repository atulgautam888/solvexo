require("dotenv").config();
const User = require('../models/User');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

// --- NODEMAILER CONFIGURATION ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Aapka Gmail
    pass: process.env.EMAIL_PASS, // Aapka App Password
  },
});

// Helper Function: Send Email
const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({ from: `"TrustLocal Bhopal" <${process.env.EMAIL_USER}>`, to, subject, text });
  } catch (err) {
    console.error("Email Error:", err);
  }
};

// 1. REGISTER LOGIC (With Welcome Email & Duplicate Check)
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, category, image } = req.body;
    
    // Check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "This email is already registered. Please use a different email or Login." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name, email, password: hashedPassword, role,
      category: role === 'provider' ? category : '',
      image: image || ''
    });

    await user.save();

    // REAL-TIME WELCOME EMAIL
    const welcomeMessage = `Hello ${name},\n\nWelcome to TrustLocal Bhopal Hub! Your account as a ${role} has been successfully created.\n\nStart exploring or managing your services now.\n\nBest Regards,\nAbhishek Sahu (Founder)`;
    await sendEmail(email, "Welcome to TrustLocal Bhopal! 🚀", welcomeMessage);

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, category: user.category, image: user.image }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. FORGOT PASSWORD - SEND OTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "No user found with this email." });

    // Generate 6 Digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = Date.now() + 600000; // 10 mins validity
    await user.save();

    const otpMessage = `Your TrustLocal Password Reset OTP is: ${otp}\n\nThis OTP is valid for 10 minutes only. Do not share it with anyone.`;
    await sendEmail(email, "Password Reset OTP - TrustLocal", otpMessage);

    res.status(200).json({ message: "OTP sent to your registered email! 📧" });
  } catch (error) {
    res.status(500).json({ message: "OTP sending failed", error: error.message });
  }
};

// 3. VERIFY OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

    if (!user) return res.status(400).json({ message: "Invalid or Expired OTP!" });

    res.status(200).json({ message: "OTP Verified! Now create your new password." });
  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};

// 4. RESET PASSWORD (Create New Password)
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    // Clear OTP fields
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    await sendEmail(email, "Password Changed Successfully ✅", "Your TrustLocal account password has been updated. If you didn't do this, contact support immediately.");

    res.status(200).json({ message: "Password updated successfully! Log in now. ✨" });
  } catch (error) {
    res.status(500).json({ message: "Password reset failed" });
  }
};

// --- REST OF THE METHODS (LOGIN, UPDATE, STATS) REMAIN SAME ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, category: user.category, image: user.image }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 5. UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (image) user.image = image;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.json({
      message: "Profile updated successfully! ✨",
      user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, role: updatedUser.role, category: updatedUser.category, image: updatedUser.image }
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

// 6. GET PROVIDERS PROFILE & STATS (Keeping your Logic intact)
exports.getAllProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' }).select('-password').lean();
    const providersWithRatings = await Promise.all(providers.map(async (provider) => {
      const reviews = await Booking.find({ provider: provider._id, isReviewed: true }).select('rating');
      const totalReviews = reviews.length;
      const avgRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : "0.0";
      return { ...provider, id: provider._id, avgRating, totalReviews, basePrice: 249 };
    }));
    res.status(200).json(providersWithRatings);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

exports.getTopRatedProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' }).select('-password').lean();
    const providersWithRatings = await Promise.all(providers.map(async (provider) => {
      const reviews = await Booking.find({ provider: provider._id, isReviewed: true }).select('rating');
      const totalReviews = reviews.length;
      const avgRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) : 0;
      return { ...provider, id: provider._id, avgRating: avgRating.toFixed(1), numericRating: avgRating, totalReviews, basePrice: 249 };
    }));
    const topRated = providersWithRatings.filter(p => p.numericRating >= 4.0).sort((a, b) => b.numericRating - a.numericRating).slice(0, 4);
    res.status(200).json(topRated);
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

exports.getProviderProfile = async (req, res) => {
  try {
    const provider = await User.findById(req.params.id).select('-password').lean();
    const reviews = await Booking.find({ provider: req.params.id, isReviewed: true }).populate('customer', 'name image').select('rating review createdAt');
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(rev => { if (breakdown[rev.rating] !== undefined) breakdown[rev.rating]++; });
    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) : "0.0";
    res.json({ ...provider, avgRating, totalReviews, reviews, ratingBreakdown: breakdown });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};

exports.getProviderStats = async (req, res) => {
  try {
    const providerId = req.user.id;
    const reviews = await Booking.find({ provider: providerId, isReviewed: true }).populate('customer', 'name image').select('rating review customer createdAt').sort({ createdAt: -1 });
    const totalBookings = await Booking.countDocuments({ provider: providerId });
    const completedJobs = await Booking.countDocuments({ provider: providerId, status: 'completed' });
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(rev => { if (breakdown[rev.rating] !== undefined) breakdown[rev.rating]++; });
    const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0.0";
    res.json({ avgRating, totalReviews: reviews.length, totalBookings, completedJobs, breakdown, reviewsList: reviews, earnings: completedJobs * 249 });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
};