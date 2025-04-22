const mongoose =require("mongoose")



const ProjectsSchema = new mongoose.Schema({
    projectName:{
        type:String,
        required:true,
    },
    assignedTo:{
        type:String,
        required:true,
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    priority:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
})

module.exports =mongoose.model('Projects',ProjectsSchema)