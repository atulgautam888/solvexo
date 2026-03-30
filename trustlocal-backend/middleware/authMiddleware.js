const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Header uthao
  const authHeader = req.headers['authorization'] || req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // 2. Token alag karo
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Verify Error:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};