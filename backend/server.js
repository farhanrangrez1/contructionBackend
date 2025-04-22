const express = require('express');
const { DBconnect } = require('./Config/db_config');
const routerapi = require('./routerapi') 
const path = require('path');
const colors=require('colors')
const cors = require('cors')
require("dotenv").config()

const app =express()
const PORT = process.env.PORT || 3000
DBconnect()

app.post('/',(req,res)=>{
    res.send('Hello World')
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Api Router 
app.use(routerapi)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
