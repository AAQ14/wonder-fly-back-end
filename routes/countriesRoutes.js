//Consts👇
const express=require('express')
const router=express.Router()
const countryController=require('../controllers/countries')

//Routers👇
router.post('/new', countryController.createCountry)
router.get('/',countryController.indexCountry)
router.get('/:id',countryController.showCountry)
router.put('/:id',countryController.updateCountry)
router.delete('/:id',countryController.deleteCountry)

//Export👇
module.exports=router