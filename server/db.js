const mongoose=require("mongoose")
require("dotenv").config()
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.mongoURI)
        console.log("Database Connected Successfully")
    }catch(error){
        console.error("Database Connection Failed")
    }
}
let mongooseConnect=()=>{
    return mongoose.connection.readyState===1;
}
module.exports={connectDB,mongooseConnect}