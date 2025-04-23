// models/Induction.js

const mongoose = require('mongoose');

const inductionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  whiteCardNumber: { type: String, required: true },
  siteLocation: { type: String, required: true },
  siteSupervisor: { type: String, required: true },
  inductionDate: { type: Date, required: true },
  siteAccessHours: { type: String, required: true },
  acknowledgements: {
    siteSafetyPlan: { type: Boolean },
    complyOperatingHours: { type: Boolean },
    emergencyProcedures: { type: Boolean }
  },
  image: []
});

module.exports = mongoose.model('Induction', inductionSchema);
