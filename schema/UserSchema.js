const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    default: 'Unknown',
  },
  lastname: {
    type: String,
    required: true,
    default: 'Unknown',
  },
  password: {
    type: String,
    required: true,
    default: 'toor',
  },
  address: {
    type: String,
    required: true,
    default: null,
  },
  cityCode: {
    type: String,
    required: true,
    default: null,
  },
  city: {
    type: String,
    required: true,
    default: null,
  },
  phone: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    unique: true,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
  },
  subscriptionDate: {
    type: Date,
    required: true,
  },
  subscriptionType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subscriptions',
    default: null,
  },
  birthday: {
    type: Date,
    required: true,
    default: null,
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
  roles: {
    type: [String],
    required: true,
    default: ['ROLE_USER'],
  },
  comments: {
    type: Array,
    required: true,
    default: [],
  },
  linkTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    default: null,
  },
});

module.exports = {
  UserSchema: mongoose.model('users', UserSchema),
};
