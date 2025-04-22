const Projects = require('../../Model/Projects/projectsModel');
const asyncHandler = require("express-async-handler");

const ProjectsCreate = asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body);

    const { name, assignedTo, startDate, endDate, status, priority,Progress, description } = req.body;

    if (!name || !assignedTo || !startDate || !endDate || !status || !priority || !Progress || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = await Projects.create({
        name,
        assignedTo,
        startDate,
        endDate,
        status,
        priority,
        Progress,
        description
    });

    res.status(201).json( newProject );
});




//GET SINGLE AllProjects
//METHOD:GET
const Allprojects = async (req, res) => {
    const Allprojects = await Projects.find()
    if (Allprojects === null) {
      res.status(404)
      throw new Error("Categories Not Found")
    }
    res.json(Allprojects)
  }
  


    //GET SINGLE DeleteProjects
//METHOD:DELETE
const deleteprojects = async (req, res) => {
    let deleteprojectsID = req.params.id
    if (deleteprojects) {
      const deleteprojects = await Projects.findByIdAndDelete(deleteprojectsID, req.body);
      res.status(200).json("Delete Projects Successfully")
    } else {
      res.status(400).json({ message: "Not Delete project" })
    }
  }
  

  //GET SINGLE ProjectsUpdate
//METHOD:PUT
const projectsUpdate = async (req, res) => {
    if (projectsUpdate) {
        const projectsUpdate = await Projects.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(projectsUpdate)
    } else {
        res.status(400).json({ message: "Not Update projects" })
    }

}



//METHOD:Single
//TYPE:PUBLIC
const projectsSingle=async(req,res)=>{
    try {
        const projectsSingle= await Projects.findById(req.params.id);
        res.status(200).json(projectsSingle)
    } catch (error) {
        res.status(404).json({msg:"Can t Find Projects"} )
    }
}


module.exports = { ProjectsCreate,Allprojects,deleteprojects,projectsUpdate,projectsSingle };

