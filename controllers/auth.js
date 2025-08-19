//Imports👇
const User = require('../models/User')
const SECRET = process.env.JWT_SECRET
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { generateTokenAndSetCookie } = require('../utils/generateTokenAndSetCookie')
const { sendVerificationEmail } = require("../mailtrap/emails")

//POST /auth/register👇
exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password) {
    return res.json({ success: false, message: 'Missing Details' })
  }
  try {

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10)

    //verification token
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
    console.log(verificationToken)

    // create user
    const newUser = new User({ firstName, lastName, email, password: passwordHash, verificationToken, verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 })
    await newUser.save()

    //generate token
    const payload = {
      id: newUser._id,
      email: newUser.email,
      newUserType: newUser.userType,
      fullName: `${newUser.firstName} ${newUser.lastName}`
    }
    const token = jwt.sign(payload, SECRET, { expiresIn: '7d' })

    //send this token to the user via cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

   return res.status(201).json({ message: 'User registered successfully' }) //user: {...user._id, password: undefined}

  }
  catch (error) {
   return res.json({ success: false, message: error.message })
  }
}

//verify email
exports.verifyEmail = async (req, res) => {
  const { code } = req.body
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now }
    })

    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid or expired verification code" })
    }

    user.isVerified = true

    //remove the verification token and expire date from the data base
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined

    await user.save()

    // await sendWelcomeEmail(user.email, user.name)
  } catch (err) {

  }
}

// POST /auth/login👇
exports.login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.json({ sucess: false, message: 'Email and password are required' })
  }
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isValid = await user.validatePassword(password)
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

    res.json({ token })
    return res.json({success: true})
  } catch (err) {
    return res.status(500).json({ message: 'Server error' })
  }
}




