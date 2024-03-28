const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    role:String,
    company:String,
    password:String,

},versionKey=false);

const userModel=mongoose.model("user-colls",userSchema);

module.exports = {
    userModel
}