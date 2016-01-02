var Product = require('../models/InfoModel.js');

module.exports = {

	create: function(req, res, next) {
		new Product(req.body)
		.save(function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	},

	get: function(req, res, next) {
		Product.find(req.query)
		.exec(function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	},

	update: function(req, res, next) {
		Product.findByIdAndUpdate(req.query.id, req.body, function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	},

	delete: function(req, res, next) {
		Product.findByIdAndRemove(req.query.id, function(err, data) {
			if (err) return next(err);
			res.send(data);
		});
	}

};
