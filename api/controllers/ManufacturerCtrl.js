var Manufacturer = require('../models/Manufacturer');

module.exports = {

	get: function(req, res, next) {
		Manufacturer
		.find(req.query)
		.sort({ title: 1 })
		.exec(function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	},

	show: function(req, res, next) {

	},

	create: function(req, res, next) {
		Manufacturer.create(req.body, function(err, result) {
			if (err) return next(err);
			res.status(200).json(result);
		});
	},

	update: function(req, res, next) {
		Manufacturer.findByIdAndUpdate(req.params._id, req.body, function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	},

	destroy: function(req, res, next) {
		Manufacturer.findByIdAndRemove(req.params._id, function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	}

};
