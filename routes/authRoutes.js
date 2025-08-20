const router = require('express').Router()
const authController = require('../controllers/auth')
const express = require('express')
const userAuth = require('../middleware/userAuth')

router.post('/signup', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/send-verify-otp', userAuth, authController.sendVerifyOtp)
router.post('/verify-account', userAuth, authController.verifyEmail)



module.exports = router