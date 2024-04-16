const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    email:{type:String, unique:true},
    ratings:[{
        ratedBy:String,
        rating:Number
    }]
}, { versionKey: false });

const ratingModel = mongoose.model("rating-colls", ratingSchema);

module.exports = {
    ratingModel
};
