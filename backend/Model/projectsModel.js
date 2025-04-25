const mongoose = require("mongoose");

const User = require("../Model/user.model");

const ProjectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Progress: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // ✅ corrected this
});

module.exports = mongoose.model('Projects', ProjectsSchema);
