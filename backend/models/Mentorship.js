const mongoose = require("mongoose");

const mentorshipSchema = new mongoose.Schema(
  {
    juniorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seniorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requestMessage: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Mentorship", mentorshipSchema);
