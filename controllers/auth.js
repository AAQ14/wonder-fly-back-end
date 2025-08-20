//Imports👇
const User = require('../models/User')
const SECRET = 'supersecret'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {generateTokenAndSetCookie} = require('../utils/generateTokenAndSetCookie')

//POST /auth/register👇
exports.register = async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields are required")
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10)

    //verification token
    const verificationToken =  Math.floor(100000 + Math.random() * 900000).toString()
    console.log(verificationToken)

    // create user
    const newUser = new User({ firstName, lastName, email, passwordHash, verificationToken, verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 })
    await newUser.save()

    //creating token jwt
    generateTokenAndSetCookie(res, newUser._id)

    res.status(201).json({ message: 'User registered successfully' }) //user: {...user._id, password: undefined}

  }
  catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /auth/login👇
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
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
    const token = jwt.sign(payload, SECRET, { expiresIn: '1h' })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}


