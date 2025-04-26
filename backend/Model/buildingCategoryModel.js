const mongoose = require('mongoose');

const buildingCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    
  },
  
}, {
  timestamps: true
});


const BuildingCategory = mongoose.model('BuildingCategory', buildingCategorySchema);
module.exports = BuildingCategory;



