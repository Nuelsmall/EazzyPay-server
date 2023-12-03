const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");
const User = require("./models/user.jsx");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
// const { readdirSync } = require('fs')
const { addIncome } = require('./controllers/incomeTransaction.jsx');

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000; // Use a default port (e.g., 4000) if PORT is not defined in the environment
const salt = bcrypt.genSaltSync(10);
const secret = 'etccvxkkkskskysygxhxkjxkkx'

// middlewares
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// routes for signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(res.body);
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt)
    });
    res.status(200).json(userDoc);
  } catch (error) {
    console.error("Error in /signup;", error);
  }
});

// Routes for Login
app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    
    if (passOk) {
        // logged in
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json('ok');
        });
    } else {
        res.status(400).json('Wrong Credential');
    };
});

// Other routes
app.post("/add-income", addIncome);

// readdirSync('./routes').map((route) => app.use('./server-main/routes', require('./routes/' + route )))




const server = () => {
  db();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

server();
