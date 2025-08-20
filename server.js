const express = require('express')
const app = express()
const logger = require('morgan')
const dotenv = require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const countriesRoutes= require('./routes/countriesRoutes')
const flightRoutes = require('./routes/flightRoutes')
const userRoutes = require("./routes/userRoutes")
const authRoutes = require('./routes/authRoutes')

const {transporter} = require("./config/nodemailer")

// let mailOptions = {
//   from: "amnaa.qader114@gmail.com"
// ,
//   to: 'hopealasfoor@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'IT WORKS'
// };

// function sendEmail(){
//    transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }

//    })}
//    sendEmail()

//connect to db
mongoose.connect(process.env.MONOGODB_URI)
mongoose.connection.on('connect', ()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

//middlewares
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true})) //will send the cookies in the response



//routes
app.use(cors({origin: 'http://localhost:5173'}))
app.use('/flights', flightRoutes )
app.use('/countries',countriesRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)


//local host port
port = (process.env.PORT) || 3000
app.listen(port, ()=>{
    console.log('listening on port: ', port)
})
