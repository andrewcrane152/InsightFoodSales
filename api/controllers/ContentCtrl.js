var Content = require('../models/Content');

module.exports = {

	show: function(req, res, next) {
		Content.findOne({ section: req.params.section })
		.exec(function(err, data) {
			if (err) return next(err);
			res.json(data);
		});
	},

	update: function(req, res, next) {
		contentAttrs = req.body;
		contentAttrs.section = req.params.section;

		Content.findOneAndUpdate(
			{ section: req.params.section },
			contentAttrs,
			{ new: true, upsert: true },
			function(err, data) {
				if (err) return next(err);
				res.json(data);
			}
		);
	}

};
