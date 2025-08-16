//consts👇
const Country = require('../models/Country')

//create👇
async function createCountry(req,res) {
    try {
        const createdCountry=await Country.create(req.body)
        res.status(201).json(createdCountry)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }  
}

//list👇
async function indexCountry(req,res) {
    try {
        const allCountries=await Country.find()
        res.status(200).json(allCountries)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }
}

//show👇
async function showCountry(req,res) {
    try {
        const country=await Country.findById(req.params.id)
        if(country){
            res.status(200).json(country)
        } else{
                res.sendStatus(404)
            }
        
    } catch (error) {
        console.log(error)
         res.status(500).json({error:error.message})
    }
}

//update👇
async function updateCountry(req,res) {
try {
    const country=await Country.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(country)
} catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
}}

//Delete👇
async function deleteCountry(req,res) {
    try {
        const country=await Country.findByIdAndDelete(
            req.params.id
        )
        if(country){
            res.status(200).json(country)
        }
        else{
            res.sendStatus(404)
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}

//exports👇
module.exports={
    createCountry,
    indexCountry,
    showCountry,
    updateCountry,
    deleteCountry
}