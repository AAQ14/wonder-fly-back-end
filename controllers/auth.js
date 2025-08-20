//Imports👇
const User = require('../models/User')
const SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {transporter} = require('../config/nodemailer')

//POST /auth/register👇
exports.register = async (req, res) => {

  try {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10)

    // create user
    const newUser = new User({ firstName, lastName, email, password: passwordHash })
    await newUser.save()

    //generate token
    const payload = {
      id: newUser._id,
      email: newUser.email,
      newUserType: newUser.userType,
      fullName: `${newUser.firstName} ${newUser.lastName}`
    }
    const token = jwt.sign(payload, SECRET, { expiresIn: '7d' })

    // //send this token to the user via cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    //sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'welcome to wonderfly',
      text: `welcome to our website, ur account has been created with email: ${email} `
    } 

    await transporter.sendMail(mailOptions)
     res.status(201).json({ message: 'User registered successfully' }) 

  }
  catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message })
  }
}


// POST /auth/login👇
exports.login = async (req, res) => {

  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.json({ sucess: false, message: 'Email and password are required' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const payload = {
      id: user._id,
      email: user.email,
      userType: user.userType,
      fullName: `${user.firstName} ${user.lastName}`
    }
    const token = jwt.sign(payload, SECRET, { expiresIn: '7d' })

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

     res.json({ success: true, token })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })

    return res.json({ success: true, message: 'Logged out' })
  } catch (err) {
    return res.json({ sucess: false, message: err.message })
  }
}