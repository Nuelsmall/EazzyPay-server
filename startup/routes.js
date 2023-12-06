const express = require("express");
const auth = require("../authentications/route");
// const error = require('../middleware/errors');
const passport = require("passport");
const users = require("../users/route");
const wallets = require("../wallet/route");
const transactions = require("../transactions/route");

module.exports = function (app) {
  app.use(express.json());
  app.use(passport.initialize());
  require("../middlewares/auth")(passport);
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/wallets", wallets);
  app.use("/api/transactions", transactions);
};
