const mongoose = require('mongoose');

const LoanSchema = mongoose.Schema({
  loanDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  returnDate: {
    type: Date,
    required: false,
  },
  limitReturnDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    default: null,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'games',
    required: true,
    default: null,
  },
  comments: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = {
  LoanSchema: mongoose.model('loans', LoanSchema),
};
