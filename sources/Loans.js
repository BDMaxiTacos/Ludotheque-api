const Loan = require('../class/Loan');
const { LoanSchema } = require('../schema/LoanSchema');
const Mongoose = require('mongoose');

async function findAll() {
  return new Promise((resolve) => {
    LoanSchema.find({}).then(async (response) => {
      const loans = [];
      for (const loan of response) {
        const loanObj = new Loan();
        await loanObj.fromJSON(loan, true);

        loans.push(loanObj);
      }

      resolve({
        error: false,
        loans,
      });
    });
  });
}

async function find(ObjectId = null) {
  return new Promise((resolve) => {
    LoanSchema.findById(ObjectId).then(async (response) => {
      if (response) {
        const loan = new Loan();
        await loan.fromJSON(response);

        resolve({
          error: false,
          loan,
        });
      } else {
        resolve({
          error: true,
          loan: null,
        });
      }
    });
  });
}

async function findByUser(ObjectId = null) {
  return new Promise((resolve) => {
    LoanSchema.find({ user: Mongoose.Types.ObjectId(ObjectId) }).then(async (response) => {
      const loans = [];
      for (const loan of response) {
        const loanObj = new Loan();
        await loanObj.fromJSON(loan, false);

        loans.push(loanObj);
      }

      resolve({
        error: false,
        loans,
      });
    });
  });
}

async function flush() {
  return new Promise((resolve) => {
    LoanSchema.deleteMany({}).then((response) => {
      // console.log(response);
      resolve({
        error: false,
        result: response,
      });
    });
  });
}

module.exports = {
  findAll,
  find,
  findByUser,
  flush,
};
