//consts👇
const Country = require('../models/Country')

//create👇
async function createCoutry(req,res) {
    try {
        const createdCoutry=await Country.create(req.body)
        res.status(201).json(createdCoutry)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message})
    }  
}




//exports👇
module.exports={
    createCoutry
}