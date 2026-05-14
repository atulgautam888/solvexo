const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'provider', 'admin'], 
    default: 'user' 
  },
  category: { 
    type: String, 
    default: '' // Sirf providers ke liye use hoga (e.g., Electrician)
  },
  image: { 
    type: String, 
    default: '' 
  },
  
  // --- NAYA: OTP & VERIFICATION LOGIC ---
  isVerified: { 
    type: Boolean, 
    default: false 
  }, 
  otp: {
    type: String,
    default: null
  },
  otpExpires: {
    type: Date,
    default: null
  },
  // --------------------------------------

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Middleware: Email verify hone par password hash ya user details sync ke liye extension point
// Abhishek, yahan aap future mein geo-spatial queries ke liye location field bhi add kar sakte hain.

module.exports = mongoose.model('User', UserSchema);