const mongoose =require("mongoose")


const IncidentReportsSchema = new mongoose.Schema({
    IncidentType:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    severityLevel:{
        type:String,
        required:true,
    },
    witnesses:{
        type:String,
        required:true,
    },
    immediateActionsTaken:{
        type:String,
        required:true,
    }, 
    uploadEvidence:{
        type:String,
        required:true,
    },
    
},{
    timestamps:true,
})

module.exports = mongoose.model('IncidentReports',IncidentReportsSchema)