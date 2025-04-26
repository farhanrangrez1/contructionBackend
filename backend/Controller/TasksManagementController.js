const asyncHandler = require("express-async-handler");
const TasksManagement = require("../Model/TasksManagementModel");

const TasksManagementCreate = asyncHandler(async (req, res) => {
    let {
      taskTitle,
      description,
      assignTo,
      dueDate,
      priority,
      category,
      status
    } = req.body;
  
    let reminders = [];
    try {
      if (req.body.reminders) {
        if (typeof req.body.reminders === "string") {
          reminders = JSON.parse(req.body.reminders);
        } else {
          reminders = req.body.reminders;
        }
      }
    } catch (err) {
      console.error("Failed to parse reminders:", err);
      return res.status(400).json({
        success: false,
        message: "Invalid format for reminders",
      });
    }
  
    try {
      const newCalendar = new TasksManagement({
        taskTitle,
        description,
        assignTo,
        dueDate,
        priority,
        category,
        status
      });
  
      await newCalendar.save();
  
      res.status(201).json({
        success: true,
        message: "Calendar entry created successfully",
        calendar: newCalendar,
      });
    } catch (error) {
      console.error("Error creating calendar entry:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while creating the calendar entry",
        error: error.message,
      });
    }
  });
  
  
  //GET SINGLE AllProjects
  //METHOD:GET
  const AllTasksManagement = async (req, res) => {
      const AllTasksManagement = await TasksManagement.find()
      if (AllTasksManagement === null) {
        res.status(404)
        throw new Error("Categories Not Found")
      }
      res.json(AllTasksManagement)
    }
    
  
  
      //GET SINGLE DeleteProjects
  //METHOD:DELETE
  const deleteTasksManagement= async (req, res) => {
      let deleteTasksManagementID = req.params.id
      if (deleteTasksManagement) {
        const deleteTasksManagement= await TasksManagement.findByIdAndDelete(deleteTasksManagementID, req.body);
        res.status(200).json("Delete Checklists Successfully")
      } else {
        res.status(400).json({ message: "Not Delete project" })
      }
    }
    
  
    //GET SINGLE ProjectsUpdate
  //METHOD:PUT
  const UpdateTasksManagement = async (req, res) => {
    try {
      const allowedFields = [
        'taskTitle',
        'description',
        'assignTo',
        'dueDate',
        'priority',
        'category',
        'status'
      ];
      
      const updateData = {}; 
  
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });
  
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'At least one field must be provided for update' });
      }
  
      const updatedTask = await TasksManagement.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  
  
  
  //METHOD:Single
  //TYPE:PUBLIC
  const SingleTasksManagement=async(req,res)=>{
      try {
          const SingleTasksManagement= await TasksManagement.findById(req.params.id);
          res.status(200).json(SingleTasksManagement)
      } catch (error) {
          res.status(404).json({msg:"Can t Find Diaries"} )
      }
  }
module.exports = {TasksManagementCreate,AllTasksManagement,deleteTasksManagement,UpdateTasksManagement,SingleTasksManagement};