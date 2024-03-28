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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).send('Invalid email or password');
        }

        res.send('Login successful');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// export
module.exports=router