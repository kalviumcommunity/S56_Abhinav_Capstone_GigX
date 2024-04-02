const express = require("express");
const router = express.Router();
const { userModel } = require("./models/userschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
  try {
 const { name, email, phone, role, company, password, freelancer } = req.body;
    const hash = await bcrypt.hash(password, 5);

    const newUser = new userModel({ name, email, phone, role, company, password: hash, freelancer });

    await newUser.save();

    res.status(201).send(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ email: user.email }, "your_secret_key", {
        expiresIn: "1h" 
      });
      console.log("Login successful");
      res.send({ token }); 
      console.log("Login successful");
      res.send("Login successful");
    } else {
      return res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
