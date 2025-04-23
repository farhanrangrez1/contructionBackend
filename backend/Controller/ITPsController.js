const asyncHandler = require('express-async-handler');
const ITPs = require('../Model/ITPsModel'); 

const ITPcCreate = asyncHandler(async (req, res) => {
  const {
    projectName,
    InspectionType,
    Inspector,
    Date,
    InspectionItems,
    attachments,
    additionalNotes,
  } = req.body;

  if (
    !projectName?.trim() ||
    !InspectionType?.trim() ||
    !Inspector?.trim() ||
    !Date ||
    !Array.isArray(InspectionItems) || InspectionItems.length === 0 ||
    !Array.isArray(attachments) || attachments.length === 0 ||
    !additionalNotes?.trim()
  ) {
    return res.status(400).json({ message: 'All fields are required and must be valid' });
  }

  const newITP = await ITPs.create({
    projectName,
    InspectionType,
    Inspector,
    Date,
    InspectionItems,
    attachments,
    additionalNotes,
  });

  res.status(201).json(newITP);
});



  
  //GET SINGLE AllITPs
  //METHOD:GET
  const AllITPc = async (req, res) => {
      const AllITPc = await ITPs.find()
      if (AllITPc === null) {
        res.status(404)
        throw new Error("Categories Not Found")
      }
      res.json(AllITPc)
    }
    
  
  
   //GET SINGLE DeletePITPs
  //METHOD:DELETE
  const deleteITPc= async (req, res) => {
      let deleteITPcID = req.params.id
      if (deleteITPc) {
        const deleteITPc = await ITPs.findByIdAndDelete(deleteITPcID, req.body);
        res.status(200).json("Delete ITPs Successfully")
      } else {
        res.status(400).json({ message: "Not Delete ITPs" })
      }
    }
    
  
    //GET SINGLE ITPsUpdate
  //METHOD:PUT
  const UpdateITPc = async (req, res) => {
    try {
      const allowedFields = [
        'projectName',
        'InspectionType',
        'Inspector',
        'Date',
        'InspectionItems',
        'attachments',
        'additionalNotes',
      ];
  
      const updateData = {};
  
      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });
  
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'At least one field must be provided for update' });
      }
  
      const updatedITP = await ITPs.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
  
      if (!updatedITP) {
        return res.status(404).json({ message: 'ITP record not found' });
      }
  
      res.status(200).json(updatedITP);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  
  
  //METHOD:Single
  //TYPE:PUBLIC
  const SingleITPc=async(req,res)=>{
      try {
          const SingleITPc= await ITPs.findById(req.params.id);
          res.status(200).json(SingleITPc)
      } catch (error) {
          res.status(404).json({msg:"Can t Find Projects"} )
      }
  }
  


  module.exports = {ITPcCreate,AllITPc,deleteITPc,UpdateITPc,SingleITPc};