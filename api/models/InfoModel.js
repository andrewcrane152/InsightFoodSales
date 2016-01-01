
var mongoose = require('mongoose');

var InfoSchema = mongoose.Schema({

	title: { type: String },
	website: { type: String },
	image: { type: String }

});

module.exports = mongoose.model('Info', InfoSchema)