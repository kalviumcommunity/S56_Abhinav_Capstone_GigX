const express= require('express');
const router=express.Router()
const {userModel} =require("./models/userschema")
// post request to signup
router.post("/signup",async(req,res)=>{
    try{
        const user=new userModel(req.body)
        await user.save()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
})
// get request to get all users
router.get("/users",async(req,res)=>{
    try{
        const users=await userModel.find({})
        res.status(201).send(users)
    }catch(err){
        res.status(400).send(err)
    }
})

// export
module.exports=router