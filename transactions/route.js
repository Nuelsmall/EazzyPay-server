const express = require("express");
const Transaction = require("./model");
const router = express.Router();
const JSONResponse = require("../services/response");
const passport = require("passport");
const DepositService = require("./services/deposit");
const { updateRunningBalance } = require("./selectors");

// routes for signup
router.post(
  "/deposit",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { amount } = req.body;
      let transaction = await new DepositService().deposit(amount, req.user._id);
      transaction = await updateRunningBalance(transaction);
      const response = new JSONResponse({
        data: transaction,
      }).build();
      //TODO: Create a wallet for user
      res.status(200).json(response);
    } catch (error) {
      console.error("Error in /signup;", error);
    }
  }
);

module.exports = router;
