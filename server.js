const express = require('express')
const app = express()
const logger = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')

const countriesRoutes= require('./routes/countriesRoutes')
const flightRoutes = require('./routes/flightRoutes')
const userRoutes = require("./routes/userRoutes")
const authRoutes = require('./routes/authRoutes')


//middlewares
app.use(logger('dev'))
app.use(express.json())

//connect to db
mongoose.connect(process.env.MONOGODB_URI)
mongoose.connection.on('connect', ()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

//routes
app.use(cors({origin: 'http://localhost:5173'}))
app.use('/flights', flightRoutes )
app.use('/countries',countriesRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)


//local host port
port = (process.env.PORT)
app.listen(port || 3000, ()=>{
    console.log('listening on port 3000')
})
