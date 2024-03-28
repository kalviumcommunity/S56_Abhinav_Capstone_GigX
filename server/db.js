const mongoose = require("mongoose");
require("dotenv").config();

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
  poolSize: 10,
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, mongooseOptions);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database Connection Failed",error);
  }
};

let mongooseConnect = () => {
  return mongoose.connection.readyState === 1;
};

module.exports = { connectDB, mongooseConnect };
