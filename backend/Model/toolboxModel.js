// models/ToolboxTalk.js

const mongoose = require("mongoose");

const toolboxTalkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date },
  time: { type: String }, // e.g., "10:30 AM"
  presenter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  participants: [{ type: String }], // You can change to ObjectId if needed
  description: { type: String },
  status: { type: String, default: "Scheduled" },
  image: [], // Cloudinary URL
}, { timestamps: true });

const ToolboxTalk = mongoose.model("ToolboxTalk", toolboxTalkSchema);

module.exports = ToolboxTalk;
