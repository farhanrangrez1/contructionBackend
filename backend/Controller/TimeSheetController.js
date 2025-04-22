const asyncHandler = require("express-async-handler");
const TimeSheet = require("../Model/TimeSheetModel");


const TimeSheetCreate=asyncHandler(async(req,res) => {
    console.log("Request Body:", req.body);
  
    const { date, worker, project, hoursWorked, Overtime, status } = req.body;

    if (!date || !worker || !project || !hoursWorked || !Overtime || !status) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newDiaries = await TimeSheet.create({
        date,
        worker,
        project,
        hoursWorked,
        Overtime,
        status,
    });

    res.status(201).json( newDiaries );

    res.send('Diaries Router');
  })

  

  module.exports = {TimeSheetCreate,AllTimeSheet,deleteTimeSheet,UpdateTimeSheet,SingleTimeSheet};