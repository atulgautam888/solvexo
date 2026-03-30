const express = require('express');
const router = express.Router();
const { 
  getAdminStats, 
  verifyProvider, 
  getAllUsers, 
  deleteUser 
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin Role Check Middleware
const adminCheck = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Access Denied: You are not an Admin!" });
  }
};

// Routes Mapping
router.get('/stats', authMiddleware, adminCheck, getAdminStats);
router.get('/users', authMiddleware, adminCheck, getAllUsers); // Dashboard isi route ko call kar raha hai
router.put('/verify/:id', authMiddleware, adminCheck, verifyProvider);
router.delete('/users/:id', authMiddleware, adminCheck, deleteUser);

module.exports = router;