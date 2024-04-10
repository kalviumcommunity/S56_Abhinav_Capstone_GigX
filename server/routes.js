const express = require("express");
const router = express.Router();
const { userModel } = require("./models/userschema");
const { contactModel } = require("./models/contactschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userValidationSchema, contactValidationSchema } = require("./validator");
require('dotenv').config();
const jwtSecret = process.env.secretKey;


// post req for signup
router.post("/signup", async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details);
    }

    const { name, email, phone, role, company, password, freelancer } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    const hash = await bcrypt.hash(password, 5);

    const newUser = new userModel({ name, email, phone, role, company, password: hash, freelancer });

    await newUser.save();

    const token = jwt.sign({ email: newUser.email }, jwtSecret, {
      expiresIn: "5h",
    });

    res.status(201).send({ token, email: newUser.email });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


// post req for login 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ email: user.email }, jwtSecret, {
        expiresIn: "5h" 
      });
      console.log("Login successful");
      
      res.status(200).send({ token, email: user.email }); 
    } else {
      return res.status(401).send("Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



// getting all data in the user database
router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// getting users by email
router.get("/users/:email", async (req, res) => {
  try {
    const userEmail = req.params.email; 
    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// updating user details
router.put("/users/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const { name, email, phone, role, company, skills, location, country, experience } = req.body;

    const updatedFields = { name, email, phone, role, company, skills, location, country, experience };

    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }
    
    const updatedUser = await userModel.findOneAndUpdate({ email: userEmail }, updatedFields);

    if (!updatedUser) {
      return res.status(500).send("Failed to update user data");
    }

    res.status(200).send("User data updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


// deleting user by email

router.delete("/users/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    await userModel.findOneAndDelete({ email: userEmail });

    res.status(200).send("User account deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// post req for contact form
router.post("/contact", async (req, res) => {
  try {
    const { error } = contactValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details);
    }
    
    const { name, email, phone, message } = req.body;
    const newContact = new contactModel({ name, email, phone, message });
  
    await newContact.save();

    res.status(201).send("Form data submitted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
