const Flight = require('../models/Flight')

async function flightIndex(req,res){
    try {
        const allFlights = await Flight.find().populate("to from")
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

const flightDetails = async(req,res) => {
    try {
        const flight = await Flight.findById(req.params.id)
        if(flight){
            res.status(200).json(flight)
        }else{
            res.sendStatus(404)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const deleteFlight = async(req,res) =>{
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id)
        if(flight){
            res.status(200).json(flight)
        }else{
            res.sendStatus(404)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

const updateFlight = async(req,res) =>{
    try {
        const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(flight){
            res.status(200).json(flight)
        }else{
            res.sendStatus(404)
        }
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = {
    flightIndex,
    addFlight,
    flightDetails,
    deleteFlight,
    updateFlight
}