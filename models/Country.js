const {model,Schema } = require('mongoose')

const countrySchema = new Schema({
    country: {
        type: String,
        required: true,
        enum: ["Bahrain", "China", "Jordan", "Italy", "Mexico", "Peru", "India", "Rio de Janeiro"]
    },
    timeZone :{
        type: String
    }, placesToVisit: [{
        type: String
    }]
})

const Country = model("Country", countrySchema)

module.exports = Country