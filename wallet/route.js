const express = require("express");
const router = express.Router();
const passport = require("passport");
const Wallet = require("./model");
const Transaction = require("../transactions/model");
const JSONResponse = require("../services/response");

// endpoints
// GET wallet and Transactions
// GET transactions
//
// routes for signup
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // this get wallet detail
    const userId = req.user._id;
    const { _id, name, currentBalance,debit,credit } = await Wallet.findOne({
      userId: userId,
    });
    const transactions = await Transaction.find({ walletId: _id });
    //TODO: Create a wallet for user
    data = {
      ...{ _id, name, currentBalance,debit,credit, userId },
      transactions: transactions,
    };
    const response = new JSONResponse({ data: data }).build();
    res.status(200).json(response);
  }
);

module.exports = router;
