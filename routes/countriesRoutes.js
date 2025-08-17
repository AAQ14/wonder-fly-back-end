//Consts👇
const express=require('express')
const router=express.Router()
const countryController=require('../controllers/countries')

//Routers👇
router.post('/new', countryController.createCountry)
router.get('/',countryController.indexCountry)
router.get('/:id',countryController.showCountry)
router.put('/update/:id',countryController.updateCountry)
router.delete('/delete/:id',countryController.deleteCountry)

//Export👇
module.exports=router