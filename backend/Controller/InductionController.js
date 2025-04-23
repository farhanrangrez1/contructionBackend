
const Induction = require("../Model/InductionModel");
const asyncHandler = require("express-async-handler");

const cloudinary = require('../Config/cloudinary');


cloudinary.config({
    cloud_name: 'dkqcqrrbp',
    api_key: '418838712271323',
    api_secret: 'p12EKWICdyHWx8LcihuWYqIruWQ'
  });


  const InductionCreate = async (req, res) => {
    const {
      fullName,
      contactNumber,
      emailAddress,
      whiteCardNumber,
      siteLocation,
      siteSupervisor,
      inductionDate,
      siteAccessHours,
      acknowledgements,
    } = req.body;
  
    try {
      let fileUrl = '';
  
      // Check if an image file is uploaded
      if (req.files && req.files.image) {
        const imageFile = req.files.image;
  
        // Upload the image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
          folder: 'uploads', // Specify the folder in Cloudinary
          resource_type: 'image',
        });
  
        // Check if the upload was successful and retrieve the URL
        if (uploadResult && uploadResult.secure_url) {
          fileUrl = uploadResult.secure_url;
        } else {
          console.error('Cloudinary upload failed: No URL returned.');
        }
      } else {
        console.log('No image file uploaded.');
      }
  
      // Create a new Induction record
      const newInduction = new Induction({
        fullName,
        contactNumber,
        emailAddress,
        whiteCardNumber,
        siteLocation,
        siteSupervisor,
        inductionDate: new Date(inductionDate),
        siteAccessHours,
        acknowledgements,
        image: fileUrl ? [fileUrl] : [], // Store the file URL if uploaded
      });
  
      // Save the new induction record to the database
      await newInduction.save();
  
      // Respond with the created induction data
      res.status(201).json({
        success: true,
        message: 'Induction created successfully',
        induction: newInduction,
      });
    } catch (error) {
      console.error('Error creating induction:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while creating the induction',
        error: error.message,
      });
    }
  };
  



module.exports = {InductionCreate};
