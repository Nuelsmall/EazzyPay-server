const WalletModel = require("../../wallet/model");
const Transaction = require("../model");

class DepositService {
  constructor() {
    // Check if an instance already exists
    if (!DepositService.instance) {
      DepositService.instance = this;
      // This Singleton implementation
    }

    return DepositService.instance;
  }
  // Get the response object
  getAccountDetail() {
    return {
      accountName: "Emmanuel John",
      bank: "GTBank",
      accountNumber: "989898923",
    };
  }
  // Get the response object
  async deposit(amount, userId) {
    const wallet = await WalletModel.findOne({ userId });
    const transaction = await Transaction.customCreate({
      walletId: wallet._id,
      amount: amount,
      action: "Deposit",
      transactionType: "credit",
      description: `You have successfully deposited ${amount}`,
      status: 'success',
    });
    return transaction;
  }
}

module.exports = DepositService;
