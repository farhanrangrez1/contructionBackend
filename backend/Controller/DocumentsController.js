const asyncHandler = require("express-async-handler");
const Documents = require("../Model/DocumentsModel");

const DocumentsCreate = asyncHandler(async (req, res) => {
  const {
    folder,
    documentName,
    documentType,
    assignTo,
    dueDate,
    submissionDate,
    status,
    comments
  } = req.body;

  if (
    !folder ||
    !documentName ||
    !documentType ||
    !assignTo ||
    !dueDate ||
    !submissionDate ||
    !status || 
    !comments
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newSwms = await Documents.create({
    folder,
    documentName,
    documentType,
    assignTo,
    dueDate,
    submissionDate,
    status,
    comments
  });

  res.status(201).json(newSwms);
});
  

  
  //GET SINGLE AllProjects
  //METHOD:GET
  const AllDocuments = async (req, res) => {
      const AllDocuments = await Documents.find()
      if (AllDocuments === null) {
        res.status(404)
        throw new Error("Categories Not Found")
      }
      res.json(AllDocuments)
    }
    
  
  
      //GET SINGLE DeleteProjects
  //METHOD:DELETE
  const deleteDocuments = async (req, res) => {
      let deleteDocumentsID = req.params.id
      if (deleteDocuments) {
        const deleteDocuments = await Documents.findByIdAndDelete(deleteDocumentsID, req.body);
        res.status(200).json("Delete Checklists Successfully")
      } else {
        res.status(400).json({ message: "Not Delete project" })
      }
    }
    
  
    //GET SINGLE ProjectsUpdate
  //METHOD:PUT
  const UpdateDocuments = async (req, res) => {
    try {
      const allowedFields = [
        'folder',
        'documentName',
        'documentType',
        'assignTo',
        'dueDate',
        'submissionDate',
        'status',
        'comments'
      ];
      
      const updateData = {}; // <-- Corrected: small 'u' and correct variable
  
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });
  
      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: 'At least one field must be provided for update' });
      }
  
      const updatedDiary = await Documents.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
  
      if (!updatedDiary) {
        return res.status(404).json({ message: 'Diary not found' });
      }
  
      res.status(200).json(updatedDiary);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  
  
  //METHOD:Single
  //TYPE:PUBLIC
  const SingleDocuments=async(req,res)=>{
      try {
          const SingleDocuments= await Documents.findById(req.params.id);
          res.status(200).json(SingleDocuments)
      } catch (error) {
          res.status(404).json({msg:"Can t Find Diaries"} )
      }
  }
module.exports = {DocumentsCreate,AllDocuments,deleteDocuments,UpdateDocuments,SingleDocuments};