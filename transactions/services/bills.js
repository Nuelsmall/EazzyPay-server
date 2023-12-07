const BillsModel = require("../../models/bills");
const WalletModel = require("../../wallet/model");
const Transaction = require("../model");
const { hasEnoughFunds, updateRunningBalance } = require("../selectors");
const AIRTIME = "AIRTIME";
const ELECTRICITY = "ELECTRICITY";
const DATA = "DATA";
const CABLE = "CABLE";

class BillService {
  constructor() {
    // Check if an instance already exists
    if (!BillService.instance) {
      BillService.instance = this;
      // This is Singleton implementation
    }

    return BillService.instance;
  }

  async processBill(userId, data) {
    const { amount, category } = data;

    const billProcessors = {
      [AIRTIME]: this.airtimeBuilder,
      [DATA]: this.dataBuilder,
      [CABLE]: this.cableBuilder,
      [ELECTRICITY]: this.electricityBuilder,
    };
    if (!Object.keys(billProcessors).includes(category))
      return { bill: null, message: "Category does not exist" };
    const billData = billProcessors[category](userId, data);
    const debitTransaction = await this.debitTransaction(
      amount,
      userId,
      category
    );
    if (debitTransaction) {
      const bill = await BillsModel.create({
        ...billData,
        transactionReference: debitTransaction.reference,
      });
      await updateRunningBalance(debitTransaction);
      return { bill, message: "" };
    }
    return { bill: null, message: "Insufficient Funds" };
  }

  electricityBuilder(userId, data) {
    return {
      userId,
      amount: data.amount,
      product: data.product,
      billNumber: data.meterNumber,
      category: "ELECTRICITY",
    };
  }
  airtimeBuilder(userId, data) {
    return {
      userId,
      amount: data.amount,
      product: data.operator,
      billNumber: data.phoneNumber,
      category: "AIRTIME",
    };
  }
  dataBuilder(userId, data) {
    return {
      userId,
      amount: data.amount,
      product: data.operator,
      billNumber: data.phoneNumber,
      category: "DATA",
    };
  }
  cableBuilder(userId, data) {
    return {
      userId,
      amount: data.amount,
      product: data.product,
      billNumber: data.smartCardNumber,
      category: "CABLE",
      biller: data.biller,
      narration: data.narration,
    };
  }
  // Get the response object

  // Get the response object
  async debitTransaction(amount, userId, action) {
    const wallet = await WalletModel.findOne({ userId });
    const hasEnoughFundsInWallet = await hasEnoughFunds(wallet._id.toString(), amount);
    if (!hasEnoughFundsInWallet) return null;
    const transaction = await Transaction.customCreate({
      walletId: wallet._id,
      amount: amount,
      action: action,
      transactionType: "debit",
      description: `You have successfully purchase ${action}`,
      status: "success",
    });

    return transaction;
  }
}

module.exports = BillService;
