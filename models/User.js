const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

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
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }, bookedFlights: [{
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    }],lastLogin:{
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyOtp: {type:String, default: ''},
    verifyOtpExpireAt: {type: Number, default: 0}
})
// helper method to compare passwords
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.passwordHash)
}

const User = model.user || model("User", userSchema)

module.exports = User