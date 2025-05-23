const mongoose =require("mongoose")

const DocumentsSchema = new mongoose.Schema({
    folder: { type: String, required: true },
    documentName: { type: String, required: true },
    documentType: { type: String, required: true },
    assignTo: { type: String, required: true },
    dueDate: { type: Date, required: true },
    submissionDate: { type: Date, required: true },
    status: { type: String, required: true },
    comments: { type: String, required: true },
  }, {
    timestamps: true,
  });
  

  
module.exports = mongoose.model('Documents',DocumentsSchema)