const mongoose = require('mongoose');

const SubscriptionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

module.exports = {
  SubscriptionSchema: mongoose.model('subscriptions', SubscriptionSchema),
};
