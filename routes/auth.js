const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MYBOI";
const fetchUser = require("../middleware/fetchUser");

//For Signup
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password of length 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }

    try {
      // Check if the user with the same email already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ success,error: "Email already exists" });
      }
      // Password Hashing using bcrypt
      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);

      // Create a new user if the email is unique
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: { id: user.id },
      };
      //jwt authtoken for each user
      const authtoken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//For Sign-in
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        success=false
        return res.status(400).json({ error: "Email does not exists" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false
        return res.status(400).json({ success, error: "password do not match" });
      }
      const data = {
        user: { id: user.id },
      };
      
      const authtoken = jwt.sign(data, JWT_SECRET);
      success= true;
      res.json({ success,authtoken });

    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

//For Logged-in user details
router.post(
    "/getuser", fetchUser ,async (req, res) => {
      try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
      }
     
        catch (error) {
            console.error("Error creating user:", error);
            res.status(500).send("Internal Server Error");
          }
    }
);

module.exports = router;
