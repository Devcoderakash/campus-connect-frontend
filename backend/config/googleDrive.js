const { google } = require("googleapis");
const path = require("path");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DRIVE_CLIENT_ID,
  process.env.GOOGLE_DRIVE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground", // Default redirect URI for generating tokens
);

// Set the credentials
if (process.env.GOOGLE_DRIVE_REFRESH_TOKEN) {
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_DRIVE_REFRESH_TOKEN });
} else {
  console.warn("⚠️ GOOGLE_DRIVE_REFRESH_TOKEN is missing in .env");
  console.warn("Please generate one and add it to .env. See setup instructions.");
}

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

module.exports = drive;
