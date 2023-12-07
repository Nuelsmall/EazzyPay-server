const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const  UtilService = require('../services/util');
// Action could be deposit, withdrawal, airtime
const TransactionSchema = new Schema(
  {
    action: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      trim: true,
      maxLength: 20,
      default: 0.0,
    },
    runningBalance: {
      type: Number,
      trim: true,
      maxLength: 20,
      default: 0.0,
    },
    walletId: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 250,
    },
    transactionType: {
      type: String,
      required: true,
      enum: ["credit", "debit"],
    },
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "processing", "success","failed"],
    },
    reference: {
      type: String,
      required: true,
      unique : true
    },
  },
  { timestamps: true }
);
// Add a custom static method to the schema
TransactionSchema.statics.customCreate = async function (data) {
  const uniqueReference = UtilService.generateReference()
  data.reference = uniqueReference
  return this.create(data);
};
// TransactionSchema.methods.updateRunningBalance = async function () {
//    const wallet = WalletModel.findOne({_id:this.walletId})
//    const credit = 
//  }
const TransactionModel = model("Transaction", TransactionSchema);

module.exports = TransactionModel;
