const mongoose = require('mongoose');

const EditorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = {
  EditorSchema: mongoose.model('editors', EditorSchema),
};
