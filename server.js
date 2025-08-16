const express = require('express')
const app = express()
const logger = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')

//middlewares
app.use(logger('dev'))
app.use(express.json())

//connect to db
mongoose.connect(process.env.MONOGODB_URI)
mongoose.connection.on('connect', ()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

//routes

//local host port
port = (process.env.PORT)
app.listen(port || 3000, ()=>{
    console.log('listening on port 3000')
})
