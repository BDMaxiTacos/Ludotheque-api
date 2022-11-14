const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = {
  CategorySchema: mongoose.model('categories', CategorySchema),
};
