const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, userType: {
        type: String,
        enum: ["user", "manager"],
        default: "user"
    }, bookedFlights: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    }
})

const User = model("User", userSchema)

module.exports = User