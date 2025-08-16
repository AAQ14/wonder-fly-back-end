const Flight = require('../models/Flight')

async function flightIndex(req,res){
    try {
        const allFlights = await Flight.find()
        if(allFlights.length){
            res.status(200).json(allFlights)
        }else{
            res.sendStatus(204)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const addFlight = async(req,res) => {
    try {
        const flightCreated = await Flight.create(req.body)
        res.status(201).json(flightCreated)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

