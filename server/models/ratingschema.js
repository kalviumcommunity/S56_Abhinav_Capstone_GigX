const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    email:{type:String, required:true},
    ratings:[{
        ratedBy:String,
        rating:Number
    }]
}, { versionKey: false });

const ratingModel = mongoose.model("rating-colls", ratingSchema);

module.exports = {
    ratingModel
};
