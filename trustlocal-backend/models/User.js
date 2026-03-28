const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'provider', 'admin'], 
    default: 'user' 
  },
  category: { 
    type: String, 
    default: '' // Sirf providers ke liye (Electrician, Plumber, etc.)
  },
  isVerified: { type: Boolean, default: false }, // Admin approve karega tab true hoga
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);