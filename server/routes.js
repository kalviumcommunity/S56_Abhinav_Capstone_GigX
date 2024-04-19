const { validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const { userModel } = require("./models/userschema");
const { contactModel } = require("./models/contactschema");
const { ratingModel } = require("./models/ratingschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  userValidationSchema,
  contactValidationSchema,
} = require("./validator");
require("dotenv").config();
const jwtSecret = process.env.secretKey;

// post req for signup
router.post("/signup", async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details);
    }

    const { name, email, phone, role, company, password, freelancer, skills } =
      req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    const hash = await bcrypt.hash(password, 5);

    const newUser = new userModel({
      name,
      email,
      phone,
      role,
      company,
      password: hash,
      freelancer,
      skills,
    });

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
        expiresIn: "5h",
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

// fetching all data in the user database
router.get("/users", async (req, res) => {
  try {
    const sanitizedLocation = req.query.location
      ? req.query.location.replace(/[0-9]/g, "")
      : "";
    const sanitizedKeyword = req.query.keyword
      ? req.query.keyword.replace(/[0-9]/g, "")
      : "";

    let query = {};
    if (sanitizedLocation && typeof sanitizedLocation === "string") {
      query.location = sanitizedLocation;
    }
    if (sanitizedKeyword && typeof sanitizedKeyword === "string") {
      query.$or = [
        { name: { $regex: sanitizedKeyword, $options: "i" } },
        { skills: { $regex: sanitizedKeyword, $options: "i" } },
      ];
    }

    const users = await userModel.find(query);
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// fetching users by email
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
    const {
      name,
      email,
      phone,
      role,
      company,
      skills,
      location,
      country,
      experience,
    } = req.body;

    const updatedFields = {
      name,
      email,
      phone,
      role,
      company,
      skills,
      location,
      country,
      experience,
    };

    const user = await userModel.findOneAndUpdate(
      { email: userEmail },
      updatedFields,
      { new: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send(user);
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

router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).send("Keyword parameter is required");
    }

    const query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { skills: { $regex: keyword, $options: "i" } },
      ],
    };

    const users = await userModel.find(query);

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// get req for gettign all the data in the collection
router.get("/ratings", async (req, res) => {
  try {
    const ratings = await ratingModel.find();
    res.status(200).send(ratings);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// put req for adding rating
router.put("/ratings", async (req, res) => {
  try {
    const { email, ratedBy, rating } = req.body;
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ error: "Rating value must be between 1 and 5." });
    }
    let existingRating = await ratingModel.findOne({ email });
    if (!existingRating) {
      existingRating = new ratingModel({
        email,
        ratings: [{ ratedBy, rating }],
      });
    } else {
      const alreadyRatedIndex = existingRating.ratings.findIndex(
        (r) => r.ratedBy === ratedBy
      );
      if (alreadyRatedIndex !== -1) {
        existingRating.ratings[alreadyRatedIndex].rating = rating;
      } else {
        existingRating.ratings.push({ ratedBy, rating });
      }
    }

    await existingRating.save();
    res.status(200).send("Rating saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// get req for fetching rating by email

router.get("/ratings/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const ratings = await ratingModel.findOne({ email });

    if (!ratings) {
      return res.status(404).send("Ratings not found");
    }
    const ratedByCount = ratings.ratings.length;
    const ratingSum = ratings.ratings.reduce(
      (sum, rating) => sum + rating.rating,
      0
    );
    const avgRating = ratedByCount > 0 ? ratingSum / ratedByCount : 0;
    res.status(200).json({ ...ratings.toObject(), avgRating });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
