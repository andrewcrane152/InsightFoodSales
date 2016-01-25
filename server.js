// CONSTANTS
var CONFIG = require('./config');
var SECRET = process.env.SECRET || CONFIG.SECRET;
var MONGO_URI = process.env.MONGO_URI || CONFIG.MONGO_URI;
var PORT = process.env.PORT || CONFIG.PORT || 5000;

// MODULES
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

// CONTROLLERS
var UserCtrl = require('./api/controllers/UserCtrl');
var ManufacturerCtrl = require('./api/controllers/ManufacturerCtrl');
var ContentCtrl = require('./api/controllers/ContentCtrl');

// SERVICES
var passport = require('./api/services/passport');
var s3 = require('./api/services/s3');


// EXPRESS + MIDDLEWARE
var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: 'skfvisnmtj-68385-fjenfkvk-4hfidwjkenfj',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());


var logger = function(req, res, next) {
  console.log(req.file);
  console.log(req.files);
  console.log(req.body);
  next();
};

// ROUTES -- COMMON
app.post('/login', passport.authenticate('local', {
  successRedirect: '/users/me',
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  res.status(204).send();
});

app.get('/users/me', UserCtrl.me);

app.get('/mfgrs', ManufacturerCtrl.get);
app.get('/mfgrs/:_id', ManufacturerCtrl.show);

app.get('/content/:section', ContentCtrl.show);

// ROUTES -- AUTHED USER
var checkAuth = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

app.get('/users', UserCtrl.get);
app.get('/users/:_id', UserCtrl.show);
app.post('/users', UserCtrl.create);
app.put('/users/:_id', UserCtrl.update);
app.delete('/users/:_id', UserCtrl.destroy);

app.put('/content/:section', ContentCtrl.update);

app.post('/mfgrs', ManufacturerCtrl.create);
app.put('/mfgrs/:_id', ManufacturerCtrl.update);
app.delete('/mfgrs/:_id', ManufacturerCtrl.destroy);

app.get('/s3_signed_url', s3.getSignedUrl);


//CONNECTIONS
mongoose.connect(MONGO_URI);
mongoose.connection.once('open', function(){
  app.listen(PORT);
});
