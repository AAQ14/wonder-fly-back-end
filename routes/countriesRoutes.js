const express=require('express')
const router=express.Router()
const countryController=require('../controllers/countries')

router.post('/new', countryController.createCoutry)