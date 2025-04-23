
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
      if (req.files && req.files.image) {
        const imageFile = req.files.image;
        const uploadResult = await cloudinary.uploader.upload(imageFile.tempFilePath, {
          folder: 'uploads', 
          resource_type: 'image',
        });
  
        if (uploadResult && uploadResult.secure_url) {
          fileUrl = uploadResult.secure_url;
        } else {
          console.error('Cloudinary upload failed: No URL returned.');
        }
      } else {
        console.log('No image file uploaded.');
      }
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
        image: fileUrl ? [fileUrl] : [], 
      });
      await newInduction.save();
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
