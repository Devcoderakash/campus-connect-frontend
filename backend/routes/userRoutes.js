const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  searchUsers,
  getSeniors,
  getProfileStats,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/profile/stats", protect, getProfileStats);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);
router.get("/search", protect, searchUsers);
router.get("/seniors", protect, getSeniors);

module.exports = router;
