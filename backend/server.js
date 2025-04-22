const { config } = require('dotenv');
const cors  =require('cors');
const express = require('express');
const { DBconnect } = require('./Config/db_config');
const colors=require('colors')
require("dotenv").config()
const routerapi = require('./app') 


const app =express()
const PORT = process.env.PORT || 3000
DBconnect()


app.use(cors())

app.post('/',(req,res)=>{
    res.send('Hello World')
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// 
app.use(routerapi)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
