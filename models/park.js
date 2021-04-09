const mongoose = require("mongoose")
const parkSchema = mongoose.Schema({
parkname: String,
parklocation: String,
parkarea: Number
})
module.exports = mongoose.model("park", parkSchema)