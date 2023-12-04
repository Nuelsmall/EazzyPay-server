require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000; // Use a default port (e.g., 4000) if PORT is not defined in the environment
app.use(cors({credentials:true, origin:'http://localhost:3000'})); //Cor middlewares
require('./startup/routes')(app); // connects routes
const {db} = require('./startup/db'); // db configuration
// const { addIncome } = require('./controllers/incomeTransaction.js');

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Other routes
// app.post("/add-income", addIncome);





const server = () => {
  db()
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

server();
