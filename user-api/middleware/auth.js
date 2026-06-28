const jwt = require('jsonwebtoken');
const config = require('../config');

function auth(req, res, next) {
  // token comes in header: "Authorization: Bearer <token>"
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. No token provided.',
    });
  }

  const token = authHeader.split(' ')[1]; // extract the token part

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // { userId, email, iat, exp }
    next();             // token valid — continue to controller
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired token.',
    });
  }
}

module.exports = auth;