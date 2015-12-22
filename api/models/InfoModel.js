
var mongoose = require('mongoose');

var InfoSchema = mongoose.Schema({

	title: { type: String },
	website: { type: String },
	image: { type: String }

})

InfoSchema.pre('update', function() {
  	this.dateUpdated = Date.now();
});

module.exports = mongoose.model('Info', InfoSchema)