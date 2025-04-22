const mongoose =require("mongoose")


const DiariesSchema = new mongoose.Schema({
    Date:{
        type:Date,
        required:true,
    },
    ProjectName:{
        type:String,
        required:true,
    },
    SupervisorName:{
        type:String,
        required:true,
    },
    Weather:{
        type:String,
        required:true,
    },
    WorkPerformed:{
        type:String,
        required:true,
    },
    IssuesDelays:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
})

module.exports = mongoose.model('Diaries',DiariesSchema)