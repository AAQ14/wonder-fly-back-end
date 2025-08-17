//Const👇
const User = require('../models/User')
const SECRET = 'supersecret' 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//POST /auth/register👇
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
     const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 8)

    // create user
    const newUser = new User({ firstName, lastName, email, passwordHash  })
    await newUser.save()

    res.status(201).json({ message: 'User registered successfully' })

}
catch(error){
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


