const mongoose =require("mongoose")


const SwmsSchema = new mongoose.Schema({
   title:{
        type:String,
        required:true,
    },  
    project:{
        type:String,
        required:true,
    },
    workArea:{
        type:String,
        required:true,
    },
    descripation:{
        type:String,
        required:true,
    },
    hazarsDescription:{
        type:String,
        required:true,
    },
    riskLevel:{
        type:String,
        required:true,
    },
    controlMeasures:{
        type:String,
        required:true,
    },
    ppeRequirements:{
        type:String,
        required:true,
    },
    requiredPermits:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
})

module.exports = mongoose.model('Swms',SwmsSchema)