const express = require("express");
const User = require('../users/model');
const bcrypt = require("bcrypt");
const router = express.Router();
const salt = bcrypt.genSaltSync(10);
const JSONResponse = require('../services/response')
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

// Routes for Login
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) return res.status(400).send("Incorrect Credential");
    const passOk = bcrypt.compareSync(password, user.password);
  
    if (passOk) {
       const token =  user.generateAuthToken()
       const response = new JSONResponse({data :{"token":`Bearer ${token}`}}).build()
       res.cookie('token', token).json(response);
    } else {
        const response = new JSONResponse({errorMessage : "Wrong Credential"}).build()
        res.status(400).json(response);
    };
});

module.exports = router; 