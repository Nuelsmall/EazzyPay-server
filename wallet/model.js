const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const WalletSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    currentBalance: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
      default: 0.0,
    },
    debit: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
      default: 0.0,
    },
    credit: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
      default: 0.0,
    },
    userId: {
      type: String,
      required: true,
      maxLength: 300,
    },
  },
  { timestamps: true }
);

const WalletModel = model("Wallet", WalletSchema);

module.exports = WalletModel;
