const express = require("express");
const User = require('../users/model');
const router = express.Router();
const JSONResponse = require('../services/response')
const passport = require('passport');

// routes for getting user
router.get("/",passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.user
    //TODO: Create a wallet for user
    const response = new JSONResponse({data :{"username":`${user.username}`}}).build()
    res.json(response);
});

module.exports = router; 