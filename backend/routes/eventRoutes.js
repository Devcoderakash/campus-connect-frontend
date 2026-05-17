const express = require("express");
const router = express.Router();
const { getEvents } = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getEvents);

module.exports = router;
