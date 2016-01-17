var mongoose = require('mongoose');

var Mission = new mongoose.Schema({

	missionStatementTitle: { type: String },
	missionStatement: { type: String },

});

module.exports = mongoose.model('Mission', Mission);
