const express = require("express");
const router = express.Router();
const {
  getUpdates,
  addUpdate,
  editUpdate,
  deleteUpdate,
} = require("../controllers/updateController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUpdates).post(protect, admin, addUpdate);

router.route("/:id").put(protect, admin, editUpdate).delete(protect, admin, deleteUpdate);

module.exports = router;
