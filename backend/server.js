const { config } = require('dotenv');
const express = require('express');
const { DBconnect } = require('./Config/db_config');
const colors=require('colors')
require("dotenv").config()

const app =express()
const PORT = process.env.PORT || 3000
DBconnect()


app.post('/',(req,res)=>{
    res.send('Hello World')
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Projects Router
app.use('/api/projects',require('./Router/Projects/projectsRouter'))


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
