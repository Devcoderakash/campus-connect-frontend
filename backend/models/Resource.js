const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: Number, required: true },
    year: { type: Number, required: true, default: 1 },
    unit: { type: String, default: "All" },
    fileUrl: { type: String, required: true },
    fileId: { type: String }, // Google Drive file ID
    mimeType: { type: String },
    fileName: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resourceType: {
      type: String,
      enum: ["Notes", "PYQ", "Study Material", "Assignment", "Syllabus", "Important PDF"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resource", resourceSchema);
