const {model, Schema} = require('mongoose')

const flightSchema = new Schema({
    from: {
        type:String,
        required: true,
        enum: ["Bahrain", "China", "Jordan", "Italy", "Mexico", "Peru", "India", "Rio de Janerio"]
    },
    to: {
        type:String,
        required: true,
        enum: ["Bahrain", "China", "Jordan", "Italy", "Mexico", "Peru", "India", "Rio de Janerio"]
    }, Date:{
        type: Date,
        required: true
    },price:{
        type: Number,
        required: true
    }

})

const Flight = model("Flight", flightSchema)

module.exports = Flight