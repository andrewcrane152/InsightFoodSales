var User = require('../models/User');

module.exports = {

  get: function(req, res, next) {
    User
      .find({ visible: true })
      .sort({ email: 1 })
      .exec(function(err, result) {
        if (err) return next(err);
        res.status(200).json(result);
      });
  },

  me: function(req, res, next) {
    if (!req.user) return res.status(401).send('current user not defined');
    res.status(200).json(req.user);
  },

  show: function(req, res, next) {
    User
      .findById(req.params._id)
      .exec(function(err, result) {
        if (err) return next(err);
        res.status(200).json(result);
      });
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
    User.findById(req.params._id, function(err, user) {
      if (err) return next(err);
      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;
      user.save(function(err, result) {
        if (err) return next(err);
        res.status(200).json(result);
      });
    });
  },

  destroy: function(req, res, next) {
    User.findByIdAndRemove(req.params._id, function(err, result) {
      if (err) return next(err);
      res.status(204).send();
    });
  }
};
