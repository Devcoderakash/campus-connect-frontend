const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  // If an Authorization header is present, always validate it properly.
  // The dev bypass must NOT apply when a real token (or invalid token) is sent.
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      if (req.user) return next();
      // Token valid but user deleted from DB
      return res.status(401).json({ message: "Not authorized, user not found" });
    } catch (error) {
      // Token present but invalid/expired — do NOT fall through to bypass
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  }

  // ==========================================
  // TEMPORARY ADMIN BYPASS FOR DEVELOPMENT
  // Only applies when NO Authorization header is sent at all.
  // This lets the Admin Panel (no-auth mode) work during dev.
  // Remove this block for production!
  // ==========================================
  const devAdmin = await User.findOne({ role: "Admin" });
  if (devAdmin) {
    req.user = devAdmin;
    return next();
  }
  // ==========================================

  return res.status(401).json({ message: "Not authorized, no token" });
};

const seniorOrAdmin = (req, res, next) => {
  // Any user in year 2+ can receive and manage mentorship requests (year-based hierarchy).
  // Admins are always allowed.
  const year = req.user?.year || 1;
  if (req.user && (req.user.role === "Admin" || year >= 2)) {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized to manage mentorship requests" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as an Admin" });
  }
};

module.exports = { protect, seniorOrAdmin, admin };
