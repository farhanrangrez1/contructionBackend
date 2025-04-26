const Annotation = require("../Model/annotationModel");
const asyncHandler = require("express-async-handler");



const createAnnotation = asyncHandler(async (req, res) => {
    const { title, description, author } = req.body;
  
    if (!title || !description || !author) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
  
    const newAnnotation = new Annotation({ title, description, author });
    await newAnnotation.save();
  
    res.status(201).json({
      success: true,
      message: "Annotation created successfully",
      data: newAnnotation
    });
  });






  




module.exports = {createAnnotation};






