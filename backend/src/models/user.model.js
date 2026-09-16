const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        //Unique true , and if the username already taken error message username already exists
        unique: [true,"username already taken"],
        required: true,
    },

    email:{
        type: String,
        unique: [true,"account already exists with this email address"],
        required: true,
    },

    password:{
        type: String,
        required: true
    }
})

//Telling our database under which label to store our data
const userModel = mongoose.model("user", userSchema)

module.exports = userModel