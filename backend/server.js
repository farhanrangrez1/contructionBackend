const { config } = require('dotenv');
const express = require('express');
const { DBconnect } = require('./Config/db_config');
const path = require('path');
const colors=require('colors')

//Routes
const authRoutes = require('./Router/Auth/authRouter')
const userRoutes = require('./Router/User/user')

require("dotenv").config()

const app =express()
const PORT = process.env.PORT || 3000
DBconnect()


app.post('/',(req,res)=>{
    res.send('Hello World')
})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//User Routes


app.use('/api', authRoutes);
app.use('/api/users', userRoutes);

// Projects Router
app.use('/api/projects',require('./Router/Projects/projectsRouter'))


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
