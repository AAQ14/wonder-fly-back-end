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
     date:{
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    class:{
      type: String,
        enum: ["Economy", "Permium Economy", "Business","First Class"],
        default: "user"  
    }

})

const Flight = model("Flight", flightSchema)

module.exports = Flight