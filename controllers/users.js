//Const👇
const User = require('../models/User')

//Create👇
async function createUser(req, res) {
    try {
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
    catch {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}



//Export👇
module.exports = {
    createUser,
    deleteUser
}