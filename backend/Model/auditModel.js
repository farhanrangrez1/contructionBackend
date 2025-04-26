const mongoose = require('mongoose');

// Equipment Schema for the assessment
const equipmentSchema = new mongoose.Schema({
  equipment: { type: String, required: true },
  status: { type: String, required: true }, // Example: "OK", "Not OK"
  lastTestingDate: { type: Date, required: true },
  nextTestingDue: { type: Date, required: true },
  comments: { type: String, required: false },
});

// Main Schema for Security Audit Report
const securityAuditReportSchema = new mongoose.Schema(
  {
    auditDate: { type: Date, required: true }, // Date of the audit
    auditedBy: { type: String, required: true }, // Who conducted the audit
    safetyManager: { type: String, required: true }, // Safety manager's name
    location: { type: String, required: true }, // Construction site location
    image: [], // URL for uploaded document (e.g., PDF, image)
    equipmentAssessment: [equipmentSchema], // Array of equipment assessments
    safetyManagerSignature: { type: String, required: false }, // Signature URL or text (could be a string if it's an electronic signature)
    status: { type: String }, // Status of the report
    generalNotes: { type: String, required: false }, // General notes about the audit
    criticalObservations: { type: String, required: false }, // Critical safety issues
    followUpActions: { type: String, required: false }, // Actions needed after the audit
  },
  { timestamps: true } // Timestamps for created and updated times
);

module.exports = mongoose.model('SecurityAuditReport', securityAuditReportSchema);
