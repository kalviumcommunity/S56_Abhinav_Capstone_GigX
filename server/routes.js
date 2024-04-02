const express = require("express");
const router = express.Router();
const { userModel } = require("./models/userschema");
const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 5);

    const newUser = new userModel({ email, password: hash });

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
