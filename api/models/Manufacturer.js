var mongoose = require('mongoose');

var Manufacturer = new mongoose.Schema({

	title: { type: String },
	website: { type: String },
	imageURL: { type: String }

});

module.exports = mongoose.model('Manufacturer', Manufacturer);
