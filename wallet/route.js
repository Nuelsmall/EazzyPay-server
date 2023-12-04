const express = require("express");
const User = require('../users/model');
const bcrypt = require("bcrypt");
const router = express.Router();

// routes for signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(res.body);
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    //TODO: Create a wallet for user
    res.status(200).json(userDoc);
  } catch (error) {
    console.error("Error in /signup;", error);
  }
});
