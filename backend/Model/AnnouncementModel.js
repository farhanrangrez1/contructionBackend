const mongoose =require("mongoose")


const ITPsSchema = new mongoose.Schema({
    projectName: { 
      type: String,
      required: true,
    },
  
    image: [String],
  }, {
    timestamps: true,
  });
  
  module.exports = mongoose.model('ITPs', ITPsSchema);
  


