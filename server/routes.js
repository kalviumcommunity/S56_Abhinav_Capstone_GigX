const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { userModel } = require("./models/userschema");
const { contactModel } = require("./models/contactschema");
const { ratingModel } = require("./models/ratingschema");
const { projectModel } = require("./models/projectschema");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  userValidationSchema,
  contactValidationSchema,
  projectValidationSchema,
} = require("./validator");
const upload = require("./utils/multer");
const cloudinary = require("./utils/cloudinary");
const hashPassword = require("./utils/passwordHash");
require("dotenv").config();
const jwtSecret = process.env.secretKey;


// rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.use(limiter);

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many signup attempts from this IP, please try again after an hour",
});

const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Too many login attempts from this IP, please try again after an hour",
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 5, 
  message: "Too many contact form submissions from this IP, please try again after an hour",
});

const projectLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many project submissions from this IP, please try again after an 15 minutes",
});

// post req for signup
router.post("/signup", signupLimiter, async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details);
    }

    const { name, email, phone, role, company, password, freelancer, skills } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
    }

    const hash = await hashPassword(password);

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

    const token = jwt.sign({ email: newUser.email }, jwtSecret, { expiresIn: "5h" });

    res.status(201).send({ token, email: newUser.email });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// post req for login
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: "5h" });
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
      profilePic,
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
      profilePic,
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
router.post("/contact", contactLimiter, async (req, res) => {
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

router.get("/search",limiter, async (req, res) => {
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

// post req to upload image
router.post("/upload", upload.single("image"), function (req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log("Image cannot be uploaed:", err);
      return res.status(500).json({
        success: false,
        message: "Error uploading image",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

const validateProjectData = (req, res, next) => {
  const { error, value } = projectValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// get request to fetch all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await projectModel.find();
    res.status(200).send(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// post request to post a new project
router.post("/projects", projectLimiter,validateProjectData, async (req, res) => {
  try {
    const {
      user,
      projectName,
      endDate,
      skillsRequired,
      referenceDocument,
      budget,
      description,
    } = req.body;

    const newProject = new projectModel({
      user,
      projectName,
      endDate,
      skillsRequired,
      referenceDocument,
      budget,
      description,
    });

    await newProject.save();

    res.status(201).send("Project posted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// get request to fetch projects by user ID
router.get("/projects/:user", async (req, res) => {
  try {
    const { user } = req.params;
    const projects = await projectModel.find({ user });

    if (projects.length === 0) {
      return res.status(404).send("Projects not found");
    }

    res.status(200).send(projects);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// transporter for sending email
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

router.post("/forgetpassword", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      const random = Math.floor(100000 + Math.random() * 900000);
      const otp = String(random).padStart(6, "0");
      const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); 

      user.otp = otp;
      user.otpExpiration = otpExpiration;
      await user.save();

      const mailoptions = {
        from: {
          name: "GigX",
          address: process.env.EMAIL,
        },
        to: email,
        subject: "OTP for password reset",
        text: `We received a request to reset your password for your GigX account. To proceed with resetting your password, please use the following One-Time Password (OTP):

Your OTP: ${otp}

Please enter this OTP in the designated field on our password reset page. This code is valid for the next 10 minutes.

If you did not request a password reset, please disregard this email. If you have any concerns, feel free to contact our support team.

Best regards,

The GigX Team`,
      };

      transporter.sendMail(mailoptions, (err, data) => {
        if (err) {
          console.error("Error sending email: ", err);
          if (err.responseCode === 535 || err.responseCode === 534) {
            res.status(401).send("Invalid email credentials");
          } else if (err.responseCode === 550) {
            res.status(400).send("Email address not verified");
          } else {
            res.status(500).send("Error sending email");
          }
        } else {
          console.log("Email sent successfully: ", data);
          res.status(200).send("OTP email sent successfully");
        }
      });
    }
  } catch (err) {
    console.error("Internal server error: ", err);
    res.status(500).send("Internal Server Error");
  }
});

// reset password
router.put("/resetpassword", async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      if (user.otp === otp && user.otpExpiration > new Date()) {
        const hash = await hashPassword(password);
        user.password = hash;
        user.otp = "";
        user.otpExpiration = null;
        await user.save();
        res.send("Password reset successfully");
      } else {
        res.send("Invalid OTP or OTP expired");
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
