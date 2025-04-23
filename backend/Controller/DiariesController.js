const asyncHandler = require("express-async-handler");
const Diaries = require("../Model/DiariesModel");


const DiariesCreate=asyncHandler(async(req, res) => {
    console.log("Request Body:", req.body);
  
    const { date, projectName, supervisorName, weather, workPerformed, issuesDelays } = req.body;

    if (!date || !projectName || !supervisorName || !weather || !workPerformed || !issuesDelays) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newDiaries = await Diaries.create({
        date,
        projectName,
        supervisorName,
        weather,
        workPerformed,
        issuesDelays,
    });

    res.status(201).json( newDiaries );

    res.send('Diaries Router');
  })

  

  
  //GET SINGLE AllProjects
  //METHOD:GET
  const AllDiaries = async (req, res) => {
      const AllDiaries = await Diaries.find()
      if (AllDiaries === null) {
        res.status(404)
        throw new Error("Categories Not Found")
      }
      res.json(AllDiaries)
    }
    
  
  
      //GET SINGLE DeleteProjects
  //METHOD:DELETE
  const deleteDiaries = async (req, res) => {
      let deleteDiariesID = req.params.id
      if (deleteDiaries) {
        const deleteDiaries = await Diaries.findByIdAndDelete(deleteDiariesID, req.body);
        res.status(200).json("Delete Diaries Successfully")
      } else {
        res.status(400).json({ message: "Not Delete project" })
      }
    }
    
  
    //GET SINGLE ProjectsUpdate
  //METHOD:PUT
  const UpdateDiaries = async (req, res) => {
      if (UpdateDiaries) {
        const { date, projectName, supervisorName, weather, workPerformed, issuesDelays } = req.body;
    
        if (!date || !projectName || !supervisorName || !weather || !workPerformed || !issuesDelays) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
          const UpdateDiaries = await Diaries.findByIdAndUpdate(req.params.id, req.body);
          res.status(200).json(UpdateDiaries)
      } else {
          res.status(400).json({ message: "Not Update Diaries" })
      }
  
  }
  
  
  //METHOD:Single
  //TYPE:PUBLIC
  const SingleDiaries=async(req,res)=>{
      try {
          const SingleDiaries= await Diaries.findById(req.params.id);
          res.status(200).json(SingleDiaries)
      } catch (error) {
          res.status(404).json({msg:"Can t Find Diaries"} )
      }
  }
  


  module.exports = {DiariesCreate,AllDiaries,deleteDiaries,UpdateDiaries,SingleDiaries};