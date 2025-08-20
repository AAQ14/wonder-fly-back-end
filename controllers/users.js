//Const👇
const User = require('../models/User')
const Flight = require('../models/Flight')

//Create👇
async function createUser(req, res) {
    try {
        req.body.userType = "user"
        const createdUser = await User.create(req.body)
        res.status(201).json(createdUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}


//Delete👇
async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (user) {
            res.status(200).json(user)
        } else {
            res.sendStatus(404)
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

//get all users👇
const indexUser = async (req, res) => {
    try {
        const users = await User.find()
        if (users.length) {
            res.status(200).json(users)
        } else {
            res.sendStatus(404)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error : err.message})
    }
}

//get user details👇
const userDetails = async (req,res) =>{
    try {
        const user = await User.findById(req.params.id)
        if(user){
            res.status(200).json(user)
        }else{
            res.sendStatus(404)
        }
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

const updateUser = async (req,res) =>{
try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body)
    if(user){
        res.status(200).json(user)
    }else{
        res.sendStatus(404)
    }
} catch (err) {
    console.log(err)
    res.status(500).json({error: err})
}
}

const bookFlight = async(req,res) => {
    try {
        const user = await User.findById(req.params.id)
        user.bookedFlights.push(req.body)
        user.save()
        console.log(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: err})
    }
} 

//Export👇
module.exports = {
    createUser,
    deleteUser,
    indexUser, 
    userDetails,
    updateUser,
    bookFlight
}