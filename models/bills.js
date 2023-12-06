const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const BillSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 50,
    },
    category: {
      type: String,
      required: true,
      enum: ["AIRTIME", "DATA", "ELECTRICITY", "CABLE"],
    },
    narration: {
      type: String,
      required: true,
      trim: true,
      default: null,
      maxLength: 20,
    },
    billNumber: {
      // this is phone number for Airtime and Data, Meter number for Electricity and Smart cardNumber for Cable
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    product: {
      type: String,
      required: true,
      enum: ["GoTv Premium", "DsTv compact", "Prepaid", "MTN", "Glo", "Airtel"],
      //  For Airtime, send operator as product
    },
    biller: {
        type: String,
        default:null,
        //  For Electricity
      },
  },
  { timestamps: true }
);

const BillsModel = model("Income", BillSchema);

module.exports = BillsModel;

// [17:55, 05/12/2023] Emma: Airtime Module
// Type: Recharge and Data
// Phonenumber:
// Operator: MTN, Glo, Airtel
// Amount:

// [17:57, 05/12/2023] Emma: Electricity Module
// Biller: IKEDC, EKEDC
// Product: Prepaid, Postpaid, Order ID
// Amount:
// Meter Number:
// Narration:

// [17:59, 05/12/2023] Emma: Cable Tv Module
// Biller: GoTv, Dstv
// Product: GoTv Premium, DsTv compact
// Amount:
// Smart Card number
// Narration:
