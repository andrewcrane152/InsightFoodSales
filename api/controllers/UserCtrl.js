var User = require('../models/User');

module.exports = {

  get: function(req, res, next) {

  },

  me: function(req, res, next) {
    if (!req.user) return res.status(401).send('current user not defined');
    req.user.password = null;
    return res.status(200).json(req.user);
  },

  show: function(req, res, next) {

  },

  create: function(req, res, next) {
    User.create(req.body, function(err, result) {
      if (err) return next(err);
      newUser = result.toObject();
      newUser.password = null;
      res.status(200).json(newUser);
    });
  },


  update: function(req, res, next) {
    User.findByIdAndUpdate(req.params._id, req.body, { new: true }, function(err, result) {
      if (err) return next(err);
      res.status(200).send(result);
    });
  },

  destroy: function(req, res, next) {

  }
};
