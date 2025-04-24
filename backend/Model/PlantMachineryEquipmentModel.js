const mongoose =require("mongoose")

const PlantMachinerySchema = new mongoose.Schema({
    EquipmentID:{
        type:String,
        required:true,
    },  
    name:{
        type:String,
        required:true,
    },
    Type:{
        type:String,
        required:true,
    },
    Location:{
        type:String,
        required:true,
    },
    purchaseDate:{
        type:Date,
        required:true,
    },
    PurchaseCost:{
        type:String,
        required:true,
    },
    Description:{
        type:String,
        required:true,
    },
    image: [String],
  }, {
    timestamps: true,
  });
  

  
module.exports = mongoose.model('PlantMachinery',PlantMachinerySchema)