const express = require("express");
const router = express.Router();
const {
  getChatHistory,
  getConversations,
  saveMessage,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.route("/conversations").get(protect, getConversations);
router.route("/:userId").get(protect, getChatHistory);
router.route("/").post(protect, saveMessage);

module.exports = router;
