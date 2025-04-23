const asyncHandler = require("express-async-handler");
const SWMS=require("../Model/SwmsModel")

const SwmsCreate =asyncHandler(async(req,res) => {
    console.log("Request Body:", req.body);
  
    const { title, workArea, descripation, hazarsDescription, riskLevel, controlMeasures,ppeRequirements, requiredPermits} = req.body;

    if (!title || !workArea || !descripation || !hazarsDescription || !riskLevel || !controlMeasures || !ppeRequirements || !requiredPermits) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newDiaries = await SWMS.create({
        title,
        workArea,
        descripation,
        hazarsDescription,
        riskLevel,
        controlMeasures,
        ppeRequirements,
        requiredPermits,
    });

    res.status(201).json( newDiaries );

    res.send('Diaries Router');
  })

  

  
  //GET SINGLE AllSwms
  //METHOD:GET
  const AllSwms = async (req, res) => {
      const AllSwms = await TimeSheet.find()
      if (AllSwms === null) {
        res.status(404)
        throw new Error("Categories Not Found")
      }
      res.json(AllSwms)
    }
    
  
  
      //GET SINGLE DeleteProjects
  //METHOD:DELETE
  const deleteSwms = async (req, res) => {
      let deleteSwmsID = req.params.id
      if (deleteSwms) {
        const deleteSwms = await TimeSheet.findByIdAndDelete(deleteSwmsID, req.body);
        res.status(200).json("Delete TimeSheet Successfully")
      } else {
        res.status(400).json({ message: "Not Delete TimeSheet" })
      }
    }
    
  
    //GET SINGLE ProjectsUpdate
  //METHOD:PUT
  const UpdateSwms = async (req, res) => {
      if (UpdateSwms) {
          const UpdateSwms = await TimeSheet.findByIdAndUpdate(req.params.id, req.body);
          res.status(200).json(UpdateSwms)
      } else {
          res.status(400).json({ message: "Not Update projects" })
      }
  
  }
  
  
  //METHOD:Single
  //TYPE:PUBLIC
  const SingleSwms=async(req,res)=>{
      try {
          const SingleSwms= await TimeSheet.findById(req.params.id);
          res.status(200).json(SingleSwms)
      } catch (error) {
          res.status(404).json({msg:"Can t Find Projects"} )
      }
  }
  


  module.exports = {SwmsCreate,AllSwms,deleteSwms,UpdateSwms,SingleSwms};