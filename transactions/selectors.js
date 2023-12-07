const WalletModel = require("../wallet/model");
const TransactionModel = require("./model");

const amountSum = async function (walletId, transactionType, status) {
  const statusFilter = Array.isArray(status) ? { $in: status } : status;
  const result = await TransactionModel.aggregate([
    {
      $match: {
        walletId,
        transactionType,
        status: statusFilter,
      },
    },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$amount" }, // Calculate the sum of 'amount'
      },
    },
  ]);

  if (result.length > 0) {
    return result[0].totalAmount;
  } else {
    return 0;
  }
};

const credit = async function (walletId) {
  const balance = await amountSum(walletId, "credit", "success");
  return balance;
};

const debit = async function (walletId) {
  const balance = await amountSum(walletId, "debit", [
    "success",
    "pending",
    "processing",
  ]);
  return balance;
};

const getBalance = async function (walletId) {
  const creditBalance = await credit(walletId);
  const debitBalance = await debit(walletId);
  return creditBalance - debitBalance;
};

const updateRunningBalance = async function (transaction) {
  const creditBalance = await credit(transaction.walletId);
  const debitBalance = await debit(transaction.walletId);
  const balance = creditBalance - debitBalance;
  const update = {
    debit: debitBalance,
    credit: creditBalance,
    currentBalance: balance,
  };
  await WalletModel.findByIdAndUpdate(transaction.walletId, update, {
    new: true,
  });
  transaction.runningBalance = balance;
  return transaction.save();
};

const hasEnoughFunds = async function (walletId, amount) {
  const balance = await getBalance(walletId);
  return balance >= amount;
};
module.exports = {
  debit,
  credit,
  getBalance,
  updateRunningBalance,
  hasEnoughFunds,
};
