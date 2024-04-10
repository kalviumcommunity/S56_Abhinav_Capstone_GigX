const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    message: String,
    timestamp: { type: Date, default: Date.now } 
}, { versionKey: false });

const contactModel = mongoose.model("contact-colls", contactSchema);

module.exports = {
    contactModel
};
