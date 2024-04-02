const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    role: String,
    company: String,
    password: String, 
    freelancer: Boolean,
}, { versionKey: false });



const userModel = mongoose.model("user-colls", userSchema);

module.exports = {
    userModel
};
