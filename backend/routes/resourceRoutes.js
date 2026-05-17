const express = require("express");
const router = express.Router();
const {
  getResources,
  uploadResource,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");
const { protect, seniorOrAdmin } = require("../middleware/authMiddleware");
const { upload } = require("../config/multer");

router
  .route("/")
  .get(getResources)
  .post(protect, seniorOrAdmin, upload.single("file"), uploadResource);

router
  .route("/:id")
  .put(protect, upload.single("file"), updateResource)
  .delete(protect, deleteResource);

module.exports = router;
