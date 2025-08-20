const router = require('express').Router()
const authController = require('../controllers/auth')
const express = require('express')

router.post('/signup', authController.register)
router.post('/login', authController.login)
router.post('/logout', authController.logout)


module.exports = router