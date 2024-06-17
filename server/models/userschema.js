const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: Number,
    role: String,
    company: String,
    password: String,
    freelancer: Boolean,
    skills: [String],
    location: String,
    country: String,
    experience: String,
    profilePic: String,
    otp: String,
    otpExpiration: Date,
}, { versionKey: false });

const userModel = mongoose.model("user-colls", userSchema);

module.exports = {
    userModel
};
