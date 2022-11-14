const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    default: 'INCONNU',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  cabinet: {
    type: String,
    required: true,
  },
  shelf: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
    default: [],
  },
  categories: {
    type: [],
    default: [],
  },
  editor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'editors',
    default: null,
  },
  comments: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = {
  GameSchema: mongoose.model('games', GameSchema),
};
