var mongoose = require('mongoose');

var About = new mongoose.Schema({

	aboutUsTitle: { type: String },
  aboutUs: { type: String }

});

module.exports = mongoose.model('About', About);
