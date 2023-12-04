const mongoose = require('mongoose');
const { Schema, model } = mongoose;
// Action could be deposit, withdrawal, airtime
const TransactionSchema = new Schema ({
   action: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50
   },
   amount: {
    type: Number,
    trim: true,
    maxLength: 20,
    default:0.00
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
    maxLength: 250
   },
   transactionType: {
    type: String,
    required : true,
    enum: ["credit","debit"]
   },
   status: {
    type:String,
    required:true,
    default:"pending",
    enum : ["pending","processing","success"]
   }
}, {timestamps: true});

const TransactionModel = model('Income', TransactionSchema);

module.exports = TransactionModel;