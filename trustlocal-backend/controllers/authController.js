const User = require('../models/User');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTER LOGIC
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, category, image } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name, email, password: hashedPassword, role,
      category: role === 'provider' ? category : '',
      image: image || ''
    });

    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, category: user.category, image: user.image }
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. LOGIN LOGIC
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

// 3. USER PROFILE UPDATE
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

// 4. GET ALL PROVIDERS
exports.getAllProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' }).select('-password').lean();

    const providersWithRatings = await Promise.all(providers.map(async (provider) => {
      const reviews = await Booking.find({ provider: provider._id, isReviewed: true }).select('rating');
      const totalReviews = reviews.length;
      const avgRating = totalReviews > 0 
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) 
        : "0.0";

      return { ...provider, id: provider._id, avgRating, totalReviews, basePrice: 249 };
    }));

    res.status(200).json(providersWithRatings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching providers", error: error.message });
  }
};

// 5. GET TOP RATED PROVIDERS (New: For Home Page)
exports.getTopRatedProviders = async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' }).select('-password').lean();

    const providersWithRatings = await Promise.all(providers.map(async (provider) => {
      const reviews = await Booking.find({ provider: provider._id, isReviewed: true }).select('rating');
      const totalReviews = reviews.length;
      const avgRating = totalReviews > 0 
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) 
        : 0;

      return {
        ...provider,
        id: provider._id,
        avgRating: avgRating.toFixed(1),
        numericRating: avgRating,
        totalReviews,
        basePrice: 249
      };
    }));

    // Filter for 4.5+ and limit to 4
    const topRated = providersWithRatings
      .filter(p => p.numericRating >= 4.0)
      .sort((a, b) => b.numericRating - a.numericRating)
      .slice(0, 4);

    res.status(200).json(topRated);
  } catch (error) {
    res.status(500).json({ message: "Error fetching top experts", error: error.message });
  }
};

// 6. GET PROVIDER PROFILE
exports.getProviderProfile = async (req, res) => {
  try {
    const provider = await User.findById(req.params.id).select('-password').lean();
    if (!provider || provider.role !== 'provider') return res.status(404).json({ message: "Expert not found" });

    const reviews = await Booking.find({ provider: req.params.id, isReviewed: true })
      .populate('customer', 'name image')
      .select('rating review createdAt');

    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1) 
      : "0.0";

    res.json({ ...provider, avgRating, totalReviews, reviews });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};