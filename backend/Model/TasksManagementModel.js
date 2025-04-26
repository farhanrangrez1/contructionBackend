const mongoose =require("mongoose")

const TasksManagementSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true },
    description: { type: String, required: true },
    assignTo: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: [
        {
            high: { type: String, required: true },
            medium: { type: String, required: true },
            low: { type: String, required: true },
        }
      ],
      category:{ type: Date, required: true },
      status:{ type: String, required: true },
  }, {
    timestamps: true,
  });
  

  
module.exports = mongoose.model('TasksManagement',TasksManagementSchema)