const express = require("express");
const router = express.Router();
const {
  requestMentorship,
  getMentorshipRequests,
  getMySentRequests,
  updateMentorshipStatus,
  getSeniors,
  getBookmarks,
  toggleBookmark,
} = require("../controllers/mentorshipController");
const { protect, seniorOrAdmin } = require("../middleware/authMiddleware");

router.route("/request").post(protect, requestMentorship);

router.route("/requests").get(protect, getMentorshipRequests);

router.route("/my-requests").get(protect, getMySentRequests);

router.route("/status/:id").put(protect, seniorOrAdmin, updateMentorshipStatus);

router.route("/seniors").get(protect, getSeniors);

router.route("/bookmarks").get(protect, getBookmarks).post(protect, toggleBookmark);

// Keep existing routes to avoid breaking anything if they were used
router.route("/").post(protect, requestMentorship).get(protect, getMentorshipRequests);

module.exports = router;
