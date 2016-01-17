var Mission = require('../models/Mission');

module.exports = {

	get: function(req, res, next) {
		Mission.find(req.query)
		.exec(function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	},

	show: function(req, res, next) {

	},

	create: function(req, res, next) {
		Mission.create(req.body, function(err, result) {
			if (err) return next(err);
			res.status(200).json(result);
		});
	},

	update: function(req, res, next) {
		Mission.findByIdAndUpdate(req.query._id, req.body, function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	},

	destroy: function(req, res, next) {
		Mission.findByIdAndRemove(req.query._id, function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	}

};