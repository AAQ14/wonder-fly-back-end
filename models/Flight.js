const {model, Schema} = require('mongoose')

const flightSchema = new Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required:true},
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required:true
    },
     Date:{
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true
    }

})

const Flight = model("Flight", flightSchema)

module.exports = Flight