const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { googleLogin } = require("../controllers/googleAuthController");

// Traditional email/password auth
router.post("/signup", signup);
router.post("/login", login);

// Google OAuth (accepts the ID token returned by @react-oauth/google)
router.post("/google-login", googleLogin);

module.exports = router;
