const mongoose =require("mongoose")


const ITPsSchema = new mongoose.Schema({
    projectName:{
        type:Date,
        required:true,
    },
    InspectionType:{
        type:String,
        required:true,
    },
    Inspector:{
        type:String,
        required:true,
    },
    Date:{
        type:Date,
        required:true,
    },
    InspectionItems:[
    {
        itemDescription:{
            type:String,
            required:true,
        },  
        ststus:{
            type:Boolean,
            required:true,
            default:false
        },
        comments:{
            type:String,
            required:true,
        },
    }
    ],
    attachments:{
        type:String,
        required:true,
    },
    additionalNotes:{
        type:String,
        required:true,
    },

},{
    timestamps:true,
})

module.exports = mongoose.model('ITPs',ITPsSchema)