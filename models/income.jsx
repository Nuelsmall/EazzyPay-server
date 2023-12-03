const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const IncomeSchema = new Schema ({
   title: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 50
   },
   amount: {
    type: Number,
    required: true,
    trim: true,
    maxLenght: 20
   },
   type: {
    type: String,
    default: "Income"
   },
   date: {
    type: Date,
    required: true,
    trim: true,
   }, 
   category: {
    type: String,
    required: true,
    trim: true,
   },
   description: {
    type: String,
    required: true,
    trim: true,
    maxLenght: 20
   },
}, {timestamps: true});

const IncomeModel = model('Income', IncomeSchema);

module.exports = IncomeModel;