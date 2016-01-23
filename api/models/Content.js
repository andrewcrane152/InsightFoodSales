var mongoose = require('mongoose');

var Content = new mongoose.Schema({
  section: { type: String, unique: true },
  title: { type: String },
  body: { type: String }
});

module.exports = mongoose.model('Content', Content);
