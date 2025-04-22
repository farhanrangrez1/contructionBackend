const mongoose =require("mongoose")



const ProjectsSchema = new mongoose.Schema({
    name:{
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
    Progress:{
        type:String,
        required:true,
    },
},{
timeseriestamps:true,
})

module.exports =mongoose.model('Projects',ProjectsSchema)