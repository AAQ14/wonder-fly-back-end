const router = require('express').Router()
const userController = require('../controllers/users')
const express = require('express')

router.post('/signup', authController.register)
router.post('/login', authController.login)

module.exports = router